import React from 'react';
import AvatarCircle from '../../../components/AvatarCircle';

const COL_W = { token: 64, patient: 300, actions: 208 };

const QueueTable = ({ data = [], activeIndex = 0, onSelectIndex }) => {
  const rows = Array.isArray(data) ? data : [];
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-full min-h-0 flex flex-col">
      <div className="relative overflow-x-auto overflow-y-auto rounded-t-lg flex-1 min-h-0">
        <table className="min-w-full text-sm table-fixed border-separate border-spacing-0">
          <colgroup>
            <col style={{ width: COL_W.token }} />
            <col style={{ width: COL_W.patient }} />
            <col style={{ width: 160 }} />
            <col style={{ width: 220 }} />
            <col style={{ width: 140 }} />
            <col style={{ width: 260 }} />
            <col style={{ width: COL_W.actions }} />
          </colgroup>
          <thead className="bg-white border-b border-gray-200 sticky top-0 z-20">
            <tr>
              <th className="px-3 py-2.5 text-center text-xs font-semibold text-gray-600 sticky left-0 z-30 bg-white border-r border-b border-gray-200" style={{ minWidth: COL_W.token, width: COL_W.token }}>T. No</th>
              <th className="px-3 py-2.5 text-left text-xs font-semibold text-gray-600 sticky z-20 bg-white border-r border-b border-gray-200" style={{ left: COL_W.token, minWidth: COL_W.patient, width: COL_W.patient }}>Patient</th>
              <th className="px-3 py-2.5 text-left text-xs font-semibold text-gray-600 border-r border-b border-gray-200">Booking Type</th>
              <th className="px-3 py-2.5 text-left text-xs font-semibold text-gray-600 border-r border-b border-gray-200">Appt. Type</th>
              <th className="px-3 py-2.5 text-left text-xs font-semibold text-gray-600 border-r border-b border-gray-200">Expt. Time</th>
              <th className="px-3 py-2.5 text-left text-xs font-semibold text-gray-600 border-r border-b border-gray-200">Reason For Visit</th>
              <th className="px-3 py-2.5 text-left text-xs font-semibold text-gray-600 sticky right-0 z-30 bg-white border-l border-b border-gray-200" style={{ minWidth: COL_W.actions, width: COL_W.actions }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-sm text-gray-500">No appointments for this filter.</td>
              </tr>
            )}
            {rows.map((row, idx) => (
              <tr key={row.id || row.token || idx} className={`group hover:bg-gray-50 ${idx===activeIndex? 'bg-blue-50/40':''}`} onClick={()=> onSelectIndex?.(idx)}>
                <td className="px-3 py-3 font-bold text-blue-600 text-lg text-center sticky left-0 z-10 bg-white group-hover:bg-gray-50 transition-colors border-r border-b border-gray-200" style={{ minWidth: COL_W.token, width: COL_W.token }}>
                  {row.token}
                </td>
                <td className="px-3 py-3 sticky z-10 bg-white group-hover:bg-gray-50 transition-colors border-r border-b border-gray-200" style={{ left: COL_W.token, minWidth: COL_W.patient, width: COL_W.patient }}>
                  <div className="flex items-center gap-2">
                    <AvatarCircle name={row.patientName || row.name} size="s" />
                    <div className="leading-tight">
                      <div className="text-sm font-medium text-gray-900">{row.patientName || row.name}</div>
                      <div className="text-xs text-gray-500">{row.gender} | {(row.age || '').split(' (')[0]} {(row.age || '').match(/\((\d+)Y\)/)?.[0] || ''}</div>
                    </div>
                  </div>
                </td>
                <td className="px-3 py-3 text-gray-900 border-r border-b border-gray-200">{row.bookingType || '—'}</td>
                <td className="px-3 py-3 text-gray-900 border-r border-b border-gray-200">{row.appointmentType || row.apptType || '—'}</td>
                <td className="px-3 py-3 text-gray-900 border-r border-b border-gray-200">{row.expectedTime || row.exptTime || '—'}</td>
                <td className="px-3 py-3 text-gray-900 border-r border-b border-gray-200">{row.reasonForVisit || row.reason}</td>
                <td className="px-3 py-3 sticky right-0 z-20 bg-white group-hover:bg-gray-50 transition-colors border-l border-b border-gray-200"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-4 py-2 border-t border-gray-200 text-xs text-gray-600 bg-white rounded-b-lg sticky bottom-0">10 / Page • Go to Page</div>
    </div>
  );
};

export default QueueTable;
