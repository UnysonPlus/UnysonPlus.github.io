import React, {useEffect, useRef} from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {useColorMode} from '@docusaurus/theme-common';

// A live Kinetic Scene on a docs page: the Studio's published player (loaded once) plays a scene file from /static.
// With `light`, the light-mode page gets its own version, so the scene sits on the page like moving text, not a video.
const PLAYER = 'https://kinetic-scenes.unysonplus.com/player/0.0.44/scene-player.js';

let loading = null;
function loadPlayer() {
  if (window.UnysonPlusScene) return Promise.resolve(window.UnysonPlusScene);
  if (!loading) {
    loading = new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = PLAYER;
      s.async = true;
      s.dataset.autoMount = 'false';
      s.onload = () => resolve(window.UnysonPlusScene);
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }
  return loading;
}

function Scene({url}) {
  const host = useRef(null);
  useEffect(() => {
    let players = [];
    let gone = false;
    loadPlayer().then((api) => {
      if (gone || !host.current) return;
      return api.autoMount(host.current.parentNode).then((p) => { players = p || []; if (gone) players.forEach((x) => x.destroy && x.destroy()); });
    }).catch(() => {});
    return () => { gone = true; players.forEach((x) => x.destroy && x.destroy()); };
  }, [url]);
  return <div ref={host} data-upw-scene="" data-upw-src={url} />;
}

export default function KineticScene({src, light, caption}) {
  const {colorMode} = useColorMode();
  const dark = useBaseUrl(src);
  const bright = useBaseUrl(light || src);
  const url = colorMode === 'light' && light ? bright : dark;
  return (
    <figure style={{margin: '0.5rem 0 1.5rem'}}>
      <div style={{aspectRatio: '16 / 9'}}>
        <Scene key={url} url={url} />
      </div>
      {caption && <figcaption style={{fontSize: '0.875rem', opacity: 0.75, marginTop: '0.5rem'}}>{caption}</figcaption>}
    </figure>
  );
}
