import React, { useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { Eye, MoreVertical, Plus, ChevronDown, List, BarChart2 } from 'lucide-react';
import Badge from '../../../components/Badge';

const vitals = [
  { name: 'Blood Pressure', unit: 'mmHg', normal: '90/60 - 120/80', status: 'Worse', trend: [
    { value: '130/85 ↑', date: '30/1/25' },
    { value: '145/90 ↑', date: '3/3/25' },
    { value: '118/76', date: '5/11/24' },
  ]},
  { name: 'Oxygen Saturation', unit: '%', normal: '95.7 - 100', status: 'Improved', trend: [
    { value: '98', date: '1/8/25' },
    { value: '95', date: '4/5/25' },
    { value: '97', date: '6/25/24' },
  ]},
  { name: 'Pulse Rate', unit: 'bpm', normal: '60 - 100', status: 'Stabled', trend: [
    { value: '72', date: '1/10/25' },
    { value: '80', date: '4/25/25' },
    { value: '65', date: '6/15/24' },
  ]},
  { name: 'Respiratory Rate', unit: 'breaths/min', normal: '12-18', status: 'Improved', trend: [
    { value: '16 ↓', date: '2/15/25' },
    { value: '18', date: '5/25/25' },
    { value: '15', date: '3/30/24' },
  ]},
  { name: 'Body Temperature', unit: '°F', normal: '97.7 - 99.1', status: 'Stabled', trend: [
    { value: '98.6', date: '1/20/25' },
    { value: '99.1', date: '4/1/25' },
    { value: '98.4', date: '5/18/24' },
  ]},
  { name: 'Blood Glucose Level', unit: 'mg/dL', normal: '70 - 100', status: 'Worse', trend: [
    { value: '110 ↑', date: '1/5/25' },
    { value: '140 ↑', date: '3/22/25' },
    { value: '95', date: '5/12/24' },
  ]},
];

const biometrics = [
  { name: 'Weight', unit: 'Kgs', trend: [
    { value: '70 ↑', date: '1/22/25' }, { value: '75 ↑', date: '4/15/25' }, { value: '68', date: '6/10/24' }, { value: '80 ↑', date: '9/15/24' }, { value: '72', date: '11/20/24' },
  ]},
  { name: 'Height', unit: 'feets', trend: [
    { value: `5'4"`, date: '1/22/25' }, { value: `5'6"`, date: '4/15/25' }, { value: `5'3"`, date: '6/10/24' }, { value: `5'8"`, date: '9/15/24' }, { value: `5'5"`, date: '11/20/24' },
  ]},
  { name: 'BMI', unit: 'kg/m²', trend: [
    { value: '22.5 ↑', date: '2/10/25' }, { value: '24.0 ↑', date: '5/15/25' }, { value: '21.0', date: '3/25/24' }, { value: '23.5 ↑', date: '8/5/24' }, { value: '22.0', date: '10/10/24' },
  ]},
  { name: 'Waist Circumference', unit: 'inches', trend: [
    { value: '32', date: '1/22/25' }, { value: '34 ↑', date: '4/15/25' }, { value: '31', date: '6/10/24' }, { value: '36 ↑', date: '9/15/24' }, { value: '33', date: '11/20/24' },
  ]},
];

function SectionHeader({ title, actionLabel, hideActions = false }) {
  return (
    <div className="flex items-center justify-between">
      <div className="text-sm font-semibold text-gray-800">{title}</div>
      {!hideActions && (
        <div className="flex items-center gap-2 text-sm">
          <button className="text-blue-600 hover:underline flex items-center gap-1">+ {actionLabel}</button>
          <button className="p-1.5 rounded hover:bg-gray-100" aria-label="Columns"><ChevronDown className="h-4 w-4 text-gray-600"/></button>
        </div>
      )}
    </div>
  );
}

function VitalsTable({ history = [], loading = false, error = null }) {
  const fmt = (iso) => {
    try {
      return new Date(iso).toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    } catch (e) { return iso; }
  };

  if (loading) return <div className="p-4 text-sm text-gray-600">Loading vitals...</div>;
  if (error) return <div className="p-4 text-sm text-red-600">Failed to load vitals</div>;

  // If history provided, render it in the existing table design: one row per vital, last 3 values with small dates
  if (history && history.length > 0) {
    // Build series for each vital type from history (latest first)
    const byVital = {
      'Blood Pressure': history.slice().reverse().map(r => {
        const bp = r.data?.blood_pressure;
        if (!bp) return null;
        return { value: `${bp.systolic}/${bp.diastolic}` + ' mmHg', date: fmt(r.recordedAt) };
      }).filter(Boolean).slice(0, 3),
      'Oxygen Saturation': history.slice().reverse().map(r => (
        r.data?.oxygen_saturation != null ? { value: String(r.data.oxygen_saturation), date: fmt(r.recordedAt) } : null
      )).filter(Boolean).slice(0, 3),
      'Pulse Rate': history.slice().reverse().map(r => (
        r.data?.pulse_rate != null ? { value: String(r.data.pulse_rate), date: fmt(r.recordedAt) } : null
      )).filter(Boolean).slice(0, 3),
      'Respiratory Rate': history.slice().reverse().map(r => (
        r.data?.respiratory_rate != null ? { value: String(r.data.respiratory_rate), date: fmt(r.recordedAt) } : null
      )).filter(Boolean).slice(0, 3),
      'Body Temperature': history.slice().reverse().map(r => (
        r.data?.body_temperature != null ? { value: String(r.data.body_temperature), date: fmt(r.recordedAt) } : null
      )).filter(Boolean).slice(0, 3),
      'Blood Glucose Level': history.slice().reverse().map(r => (
        r.data?.blood_glucose_level != null ? { value: String(r.data.blood_glucose_level), date: fmt(r.recordedAt) } : null
      )).filter(Boolean).slice(0, 3),
    };

    const rows = vitals.map(v => ({
      name: v.name,
      unit: v.unit,
      normal: v.normal,
      status: v.status,
      trend: byVital[v.name] && byVital[v.name].length ? byVital[v.name] : [],
    }));

    return (
      <div className="mt-2 border border-gray-200 rounded-md">
        <table className="min-w-full table-fixed text-sm text-left text-gray-700">
          <colgroup>
            <col className="w-[220px]" />
            <col className="w-[420px]" />
            <col className="w-[120px]" />
            <col className="w-[140px]" />
            <col className="w-[64px]" />
          </colgroup>
          <thead className="bg-gray-50 text-[12px] uppercase font-medium text-gray-500 border-b">
            <tr className="h-8">
              <th className="pl-3">Name</th>
              <th className="">Last 3 Recorded Values</th>
              <th className="">Status</th>
              <th className="">Normal Range</th>
              <th className="pr-2 text-right"> </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((v, i) => (
              <tr key={i} className="border-b border-gray-200">
                <td className="pl-3 py-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-800">{v.name}</span>
                    <span className="text-xs text-gray-500">{v.unit}</span>
                  </div>
                </td>
                <td className="py-2">
                  <div className="grid grid-cols-3 gap-6">
                    {(v.trend.length ? v.trend : vitals.find(x=>x.name===v.name)?.trend || []).map((t, idx) => (
                      <div key={idx} className="flex flex-col">
                        <span className={`text-sm ${/↑/.test(t.value) ? 'text-red-600' : /↓/.test(t.value) ? 'text-green-600' : 'text-gray-800'}`}>{t.value}</span>
                        <span className="text-[11px] text-gray-500">{t.date}</span>
                      </div>
                    ))}
                  </div>
                </td>
                <td className="py-2">
                  <Badge size="s" type="ghost" color={v.status === 'Improved' ? 'green' : v.status === 'Worse' ? 'red' : 'gray'}>{v.status}</Badge>
                </td>
                <td className="py-2 text-gray-700">{v.normal}</td>
                <td className="py-2 pr-2">
                  <div className="flex items-center justify-end gap-2 text-gray-600">
                    <button className="p-1.5 rounded hover:bg-gray-100" aria-label="View"><Eye className="h-4 w-4" /></button>
                    <button className="p-1.5 rounded hover:bg-gray-100" aria-label="More"><MoreVertical className="h-4 w-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // If no history, show a simple empty state (no dummy data)
  return <div className="p-4 text-sm text-gray-500">No vitals recorded</div>;
}

function BiometricsTable() {
  return (
    <div className="mt-2 border border-gray-200 rounded-md">
      <table className="min-w-full table-fixed text-sm text-left text-gray-700">
        <colgroup>
          <col className="w-[220px]" />
          <col className="w-[580px]" />
          <col className="w-[64px]" />
        </colgroup>
        <thead className="bg-gray-50 text-[12px] uppercase font-medium text-gray-500 border-b">
          <tr className="h-8">
            <th className="pl-3">Name</th>
            <th className="">Last 5 Recorded Values</th>
            <th className="pr-2 text-right"> </th>
          </tr>
        </thead>
        <tbody>
          {biometrics.map((b, i) => (
            <tr key={i} className="border-b border-gray-200">
              <td className="pl-3 py-2">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-800">{b.name}</span>
                  <span className="text-xs text-gray-500">{b.unit}</span>
                </div>
              </td>
              <td className="py-2">
                <div className="grid grid-cols-5 gap-6">
                  {b.trend.map((t, idx) => (
                    <div key={idx} className="flex flex-col">
                      <span className={`text-sm ${/↑/.test(t.value) ? 'text-red-600' : /↓/.test(t.value) ? 'text-green-600' : 'text-gray-800'}`}>{t.value}</span>
                      <span className="text-[11px] text-gray-500">{t.date}</span>
                    </div>
                  ))}
                </div>
              </td>
              <td className="py-2 pr-2">
                <div className="flex items-center justify-end gap-2 text-gray-600">
                  <button className="p-1.5 rounded hover:bg-gray-100" aria-label="View"><Eye className="h-4 w-4" /></button>
                  <button className="p-1.5 rounded hover:bg-gray-100" aria-label="More"><MoreVertical className="h-4 w-4" /></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function PatientVitals({ embedded = false, onAdd, history = [], loading = false, error = null }) {
  const { id } = useParams();
  const [selected, setSelected] = useState(vitals[0].name);
  const [viewMode, setViewMode] = useState('chart'); // 'chart' or 'table'
  if (embedded) {
    return (
      <>
        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div>
                <div className="text-sm font-semibold text-gray-800">Vitals</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button onClick={onAdd} className="text-blue-600 hover:underline flex items-center gap-1">+ Add Vitals</button>
              <button onClick={() => setViewMode('table')} className={`p-2 rounded ${viewMode==='table' ? 'bg-gray-50 text-gray-800' : 'text-gray-500 hover:bg-gray-50'}`} aria-label="list view"><List className="h-4 w-4"/></button>
              <button onClick={() => setViewMode('chart')} className={`p-2 rounded ${viewMode==='chart' ? 'bg-gray-50 text-gray-800' : 'text-gray-500 hover:bg-gray-50'}`} aria-label="chart view"><BarChart2 className="h-4 w-4"/></button>
            </div>
          </div>

          {/* vitals content: stacked views with max-height + opacity transitions to avoid overlap */}
          <div className="mt-3">
            <div className={`overflow-hidden transition-all duration-300 ${viewMode==='chart' ? 'max-h-[1200px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>
              <div className="flex gap-4">
                <div className="w-[220px] border border-gray-100 rounded bg-white">
                  <div className="text-xs text-gray-500 px-3 py-2">Vitals</div>
                  <div className="divide-y">
                    {vitals.map((v, i) => (
                      <button key={i} onClick={() => setSelected(v.name)} className={`w-full text-left px-3 py-3 flex items-center gap-3 ${selected === v.name ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}>
                        <div className="flex-1">
                          <div className="font-medium text-sm">{v.name}</div>
                          <div className="text-[12px] text-gray-500">{v.unit}</div>
                        </div>
                        <div className="text-xs text-gray-500">{v.trend[0]?.value}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex-1 bg-white border border-gray-100 rounded p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-sm font-semibold text-gray-800">{selected} <span className="text-xs text-gray-500">{vitals.find(v=>v.name===selected)?.unit}</span></div>
                      <div className="text-xs text-gray-500 mt-1">{vitals.find(v=>v.name===selected)?.normal}</div>
                    </div>
                    <div className="text-sm text-gray-500">1 Month <button className="ml-2 p-1 rounded hover:bg-gray-100"><ChevronDown className="h-4 w-4" /></button></div>
                  </div>

                  <div className="flex items-center gap-4 mt-3 text-xs text-gray-600">
                    <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-orange-300 inline-block" /> Systolic</div>
                    <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-blue-300 inline-block" /> Diastolic</div>
                    <div className="px-2 py-1 text-xs text-gray-500 bg-gray-50 rounded ml-2">Normal Range: {vitals.find(v=>v.name===selected)?.normal}</div>
                  </div>

                  <div className="mt-4 h-[220px]">
                    <svg className="w-full h-full" viewBox="0 0 800 220" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
                          <stop offset="0%" stopColor="#fef3c7" stopOpacity="0.9" />
                          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <rect x="0" y="0" width="800" height="220" fill="transparent" />
                      <path d="M20 140 C80 130,140 120,200 130 C260 140,320 125,380 135 C440 145,500 138,560 150 C620 162,680 150,760 130" fill="url(#g1)" stroke="#f6ad55" strokeWidth="2" opacity="0.9" />
                      <path d="M20 90 C80 95,140 85,200 95 C260 98,320 90,380 100 C440 102,500 95,560 110 C620 118,680 110,760 95" fill="none" stroke="#93c5fd" strokeWidth="2" opacity="0.95" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

      <div className={`overflow-hidden transition-all duration-300 ${viewMode==='table' ? 'max-h-[1200px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>
              <div className="bg-white p-0">
        <VitalsTable history={history} loading={loading} error={error} />
              </div>
            </div>
          </div>
        </div>

        <div className="py-3">
          <SectionHeader title="Biometrics" actionLabel="Add Biometrics" />
          <BiometricsTable />
        </div>
      </>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-white px-4 py-3 rounded-md border border-gray-200">
        <div className="flex items-center gap-6 text-sm h-10">
          <NavLink to={`/doc/patients/${encodeURIComponent(id || '')}`} className={({isActive}) => `h-10 ${isActive ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-800'}`}>Overview</NavLink>
          <NavLink to={`/doc/patients/${encodeURIComponent(id || '')}/vitals`} className={({isActive}) => `h-10 ${isActive ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-800'}`}>Vitals & Biometrics</NavLink>
          <span className="text-gray-400">Appointment</span>
          <span className="text-gray-400">Medical History</span>
          <span className="text-gray-400">Documents</span>
          <span className="text-gray-400">Demographics</span>
        </div>
        <div className="py-3">
          <SectionHeader title="Vitals" actionLabel="Add Vitals" />
          <VitalsTable />
        </div>
        <div className="py-3">
          <SectionHeader title="Biometrics" actionLabel="Add Biometrics" />
          <BiometricsTable />
        </div>
      </div>
    </div>
  );
}
