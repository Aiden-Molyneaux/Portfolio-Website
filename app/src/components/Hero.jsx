import React, { useEffect, useRef, useState } from 'react';
import { mountHeart, FACETS } from '../lib/focal.js';
import { useWidth } from '../lib/hooks.js';

// The focal drawing: the faceted heart with construction lines, a live width dimension, the heart rate and a figure label.
export default function Hero({ rest, week, flat, onBpm }) {
  const heroRef = useRef(null), focalRef = useRef(null), heart = useRef(null);
  const width = useWidth(heroRef);
  const [bpm, setBpm] = useState(rest);

  useEffect(() => {
    heart.current = mountHeart(focalRef.current, { bpm: rest, label: 'Press the heart', onBpm: v => { setBpm(v); onBpm?.(v); } });
    return () => heart.current.destroy();
    // mounted once; rest and flat are pushed in below
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { heart.current.setRest(rest); }, [rest]);
  useEffect(() => { heart.current.flatten(flat); }, [flat]);

  return (
    <div className="hero" id="hero" ref={heroRef}>
      <div className="dim dim-w"><span>{width || ''}</span></div>
      <div className="hero-read" aria-live="off">
        <span className="hero-bpm"><b>{flat ? 0 : bpm}</b> bpm</span>
        <span>60 at rest, +1 for every 10</span>
        <span>GitHub contributions this week ({week})</span>
      </div>
      <div className="hero-fig"><span>Fig. 01</span><span>Heart, faceted</span><span>{FACETS} facets, canvas 2D</span></div>
      <div className="focal" ref={focalRef} />
    </div>
  );
}
