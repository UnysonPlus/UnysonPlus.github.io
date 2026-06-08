/**
 * Decap CMS GitHub OAuth proxy — Cloudflare Worker.
 *
 * GitHub Pages is static and cannot hold an OAuth client secret, so this tiny
 * Worker performs the OAuth handshake on Decap's behalf:
 *
 *   /auth      -> redirects the user to GitHub's authorize screen
 *   /callback  -> exchanges the code for a token and hands it back to Decap
 *
 * Required Worker secrets (set with `npx wrangler secret put NAME`):
 *   OAUTH_CLIENT_ID      - the GitHub OAuth App client id
 *   OAUTH_CLIENT_SECRET  - the GitHub OAuth App client secret
 *
 * The GitHub OAuth App's "Authorization callback URL" must be:
 *   https://<your-worker-subdomain>.workers.dev/callback
 */

const GITHUB_AUTHORIZE = 'https://github.com/login/oauth/authorize';
const GITHUB_TOKEN = 'https://github.com/login/oauth/access_token';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Step 1: kick off the GitHub OAuth flow.
    if (url.pathname === '/auth') {
      const redirectUri = `${url.origin}/callback`;
      const authUrl = new URL(GITHUB_AUTHORIZE);
      authUrl.searchParams.set('client_id', env.OAUTH_CLIENT_ID);
      authUrl.searchParams.set('redirect_uri', redirectUri);
      authUrl.searchParams.set('scope', 'repo,user');
      authUrl.searchParams.set('state', crypto.randomUUID());
      return Response.redirect(authUrl.toString(), 302);
    }

    // Step 2: GitHub redirects back here with ?code=...
    if (url.pathname === '/callback') {
      const code = url.searchParams.get('code');
      if (!code) return new Response('Missing code', { status: 400 });

      const tokenRes = await fetch(GITHUB_TOKEN, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          client_id: env.OAUTH_CLIENT_ID,
          client_secret: env.OAUTH_CLIENT_SECRET,
          code,
        }),
      });

      const data = await tokenRes.json();
      const content = data.access_token
        ? { token: data.access_token, provider: 'github' }
        : { error: data.error || 'unknown_error' };
      const status = data.access_token ? 'success' : 'error';

      // The handshake Decap expects: "authorization:github:<status>:<json>"
      const payload = `authorization:github:${status}:${JSON.stringify(content)}`;
      const html = `<!doctype html><html><body><script>
        (function () {
          function receiveMessage(e) {
            window.opener.postMessage(${JSON.stringify(payload)}, e.origin);
            window.removeEventListener('message', receiveMessage, false);
          }
          window.addEventListener('message', receiveMessage, false);
          window.opener.postMessage('authorizing:github', '*');
        })();
      </script></body></html>`;

      return new Response(html, {
        status: 200,
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      });
    }

    return new Response('Decap OAuth proxy. Use /auth to begin.', { status: 200 });
  },
};
