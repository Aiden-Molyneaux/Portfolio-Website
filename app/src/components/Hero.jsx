import React, { useEffect, useRef, useState } from 'react';
import { mountHeart, FACETS } from '../lib/focal.js';
import { useWidth } from '../lib/hooks.js';

const arrowR = <svg viewBox="0 0 34 30" aria-hidden="true"><path d="M32 4C22 2 12 8 6 22M6 22l-2-7M6 22l7-3" /></svg>;
const arrowL = <svg viewBox="0 0 34 30" aria-hidden="true"><path d="M2 4c10-2 20 4 26 18M28 22l2-7M28 22l-7-3" /></svg>;

// The focal drawing: the faceted heart with construction lines, a live width dimension, the heart rate and a figure label.
export default function Hero({ rest, week, flat }) {
  const heroRef = useRef(null), focalRef = useRef(null), heart = useRef(null);
  const width = useWidth(heroRef);
  const [bpm, setBpm] = useState(rest);

  useEffect(() => {
    heart.current = mountHeart(focalRef.current, { bpm: rest, label: 'Press the heart', onBpm: setBpm });
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
        <span>resting 60, +1 per 10</span>
        <span>contributions this week ({week})</span>
      </div>
      <div className="hero-fig"><span>Fig. 01</span><span>Heart, faceted</span><span>{FACETS} facets, canvas 2D</span></div>
      <div className="focal" ref={focalRef} />
      <div className="note note-press">{arrowR}press it,<br />it still beats</div>
      <div className="note note-drag">{arrowL}or drag it<br />to turn it</div>
    </div>
  );
}
