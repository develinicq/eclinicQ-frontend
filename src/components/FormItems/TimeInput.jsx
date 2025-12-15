import React, { useMemo, useRef, useState, useEffect } from 'react';

const hours12 = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));
const minutes = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));

const TimeInput = ({ value, onChange, placeholder = "09:00", className = "" }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close popover on outside click or Escape
  useEffect(() => {
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDoc);
    window.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', onDoc); window.removeEventListener('keydown', onKey); };
  }, []);

  // Parse value "HH:MM" into 12h + ampm
  const parsed = useMemo(() => {
    if (!value) return { h12: '09', m: '00', ap: 'AM' };
    const [hh, mm] = String(value).split(':');
    let h = parseInt(hh, 10);
    const ap = h >= 12 ? 'PM' : 'AM';
    const h12 = String(h % 12 || 12).padStart(2, '0');
    return { h12, m: String(mm).padStart(2, '0'), ap };
  }, [value]);

  const displayLabel = `${parsed.h12}:${parsed.m} ${parsed.ap}`;

  // Convert 12h selection back to 24h "HH:MM"
  const to24hm = (h12, m, ap) => {
    let h = parseInt(h12, 10) % 12;
    if (ap === 'PM') h += 12;
    const hh = String(h).padStart(2, '0');
    return `${hh}:${m}`;
  };

  const update = (next) => {
    const v = to24hm(next.h12 || parsed.h12, next.m || parsed.m, next.ap || parsed.ap);
    onChange?.({ target: { value: v } });
  };

  return (
    <div className={`relative ${className}`} ref={ref}>
      <div className="h-8 px-2 py-1 text-xs border border-gray-300 rounded bg-white flex items-center justify-between w-28">
        <span className="text-gray-700">{displayLabel}</span>
        <button type="button" className="p-0 m-0" onClick={() => setOpen((v) => !v)} aria-label="Pick time">
          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </div>
      {open && (
        <div className="absolute z-50 mt-1 w-52 bg-white border border-gray-200 rounded shadow-lg p-2 grid grid-cols-3 gap-2">
          <div>
            <div className="text-[11px] text-gray-500 mb-1">Hr</div>
            <div className="max-h-40 overflow-auto">
              {hours12.map((h) => (
                <button key={h} className={`w-full text-left px-2 py-1 text-xs rounded ${h===parsed.h12? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50'}`} onClick={() => update({ h12: h })}>{h}</button>
              ))}
            </div>
          </div>
          <div>
            <div className="text-[11px] text-gray-500 mb-1">Min</div>
            <div className="max-h-40 overflow-auto">
              {minutes.map((m) => (
                <button key={m} className={`w-full text-left px-2 py-1 text-xs rounded ${m===parsed.m? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50'}`} onClick={() => update({ m })}>{m}</button>
              ))}
            </div>
          </div>
          <div>
            <div className="text-[11px] text-gray-500 mb-1">AM</div>
            <div className="flex flex-col">
              {['AM','PM'].map((ap) => (
                <button key={ap} className={`px-2 py-1 text-xs rounded ${ap===parsed.ap? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50'}`} onClick={() => update({ ap })}>{ap}</button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeInput;
