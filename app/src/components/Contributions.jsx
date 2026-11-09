import React, { useLayoutEffect, useMemo, useRef } from 'react';
import { buildCalendar } from '../lib/contrib.js';
import { CONTENT } from '../content.js';

export default function Contributions({ days }) {
  const cal = useMemo(() => buildCalendar(days), [days]);
  const scroller = useRef(null);
  // on a narrow screen the grid scrolls sideways; start at the most recent weeks
  useLayoutEffect(() => { const sc = scroller.current; sc.scrollLeft = sc.scrollWidth; }, [cal]);
  return (
    <div className="contrib">
      <div className="contrib-scroll" ref={scroller}>
        <div className="contrib-inner" style={{ '--weeks': cal.weeks }}>
          <div className="contrib-months" aria-hidden="true">
            {cal.months.map(x => <span key={x.w} className={x.end ? 'end' : undefined} style={{ gridColumn: x.end ? `${x.w + 1} / -1` : x.w + 1 }}>{x.m}</span>)}
          </div>
          <div className="contrib-grid" role="img" aria-label={cal.aria}>
            {cal.cells.map((d, i) => d ? <i key={d.date} className={`l${d.level}`} title={d.label} /> : <i key={'blank' + i} className="blank" />)}
          </div>
        </div>
      </div>
      <div className="contrib-foot">
        <span>{cal.caption} Source: <a href={CONTENT.contact.github} target="_blank" rel="noopener">GitHub</a>.</span>
        <span className="contrib-legend" aria-hidden="true">Less <i className="l0" /><i className="l1" /><i className="l2" /><i className="l3" /><i className="l4" /> More</span>
      </div>
    </div>
  );
}
