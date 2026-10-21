import React, {useEffect, useRef} from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';

// A live Kinetic Scene on a docs page: the Studio's published player (loaded once) plays a scene file from /static.
const PLAYER = 'https://kinetic-scenes.unysonplus.com/player/0.0.42/scene-player.js';

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

export default function KineticScene({src, title, caption}) {
  const host = useRef(null);
  const url = useBaseUrl(src);
  useEffect(() => {
    let players = [];
    let gone = false;
    loadPlayer().then((api) => {
      if (gone || !host.current) return;
      return api.autoMount(host.current.parentNode).then((p) => { players = p || []; if (gone) players.forEach((x) => x.destroy && x.destroy()); });
    }).catch(() => {});
    return () => { gone = true; players.forEach((x) => x.destroy && x.destroy()); };
  }, [url]);
  return (
    <figure style={{margin: '1.5rem 0'}}>
      <div style={{borderRadius: 12, overflow: 'hidden', background: '#0a0d11', aspectRatio: '16 / 9'}}>
        <div ref={host} data-upw-scene="" data-upw-src={url} />
      </div>
      {caption && <figcaption style={{fontSize: '0.875rem', opacity: 0.75, marginTop: '0.5rem'}}>{caption}</figcaption>}
    </figure>
  );
}
