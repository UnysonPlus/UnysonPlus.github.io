// Matomo: the site changes pages without a reload, so count each in-site page change as a
// page view. The first page is counted by the snippet in docusaurus.config.js.
export function onRouteDidUpdate({location, previousLocation}) {
  if (!previousLocation || location.pathname === previousLocation.pathname) return;
  // Wait a tick so the new page's <title> is in place before it is recorded.
  setTimeout(() => {
    const paq = (window._paq = window._paq || []);
    paq.push(['setReferrerUrl', window.location.origin + previousLocation.pathname]);
    paq.push(['setCustomUrl', window.location.href]);
    paq.push(['setDocumentTitle', document.title]);
    paq.push(['trackPageView']);
    paq.push(['enableLinkTracking']);
  }, 0);
}
