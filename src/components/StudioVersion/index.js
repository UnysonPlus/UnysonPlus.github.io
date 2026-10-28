import React, {useEffect, useState} from 'react';

const URL = 'https://kinetic-scenes.unysonplus.com/version.json';

/**
 * <StudioVersion /> — the Kinetic Scenes Studio's live version and release stage ("Beta 0.1.8, player 0.0.48"), read
 * from the version.json the Studio publishes with every build, so no page types the number by hand.
 * `part="stage"` shows only the stage, `part="version"` only the number. Shows `fallback` until it loads (or offline).
 */
export default function StudioVersion({part, fallback = 'Beta'}) {
  const [v, setV] = useState(null);
  useEffect(() => {
    let live = true;
    fetch(URL, {cache: 'no-cache'}).then((r) => (r.ok ? r.json() : null)).then((j) => { if (live && j) setV(j); }).catch(() => {});
    return () => { live = false; };
  }, []);
  if (!v) return <>{fallback}</>;
  if (part === 'stage') return <>{v.stage}</>;
  if (part === 'version') return <>{v.version}</>;
  return <>{v.stage} {v.version} (player {v.player})</>;
}
