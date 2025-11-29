import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function AddVitalsDrawer({ open, onClose, onSave, patient }) {
  const [form, setForm] = useState({
    bpSys: '',
    bpDia: '',
    oxygenSaturation: '',
    pulse: '',
    respiratoryRate: '',
    temperature: '',
    bloodGlucose: '',
    heightFt: '',
    heightIn: '',
    weight: '',
    waist: '',
    bmi: '',
    notes: '',
  });

  const [vitalsOpen, setVitalsOpen] = useState(true);
  const [biometricsOpen, setBiometricsOpen] = useState(true);

  if (!open) return null;

  const handleChange = (e) => setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const hasAnyValue = Object.values(form).some((v) => v !== '' && v !== null && v !== undefined);

  const handleSave = () => {
    if (!hasAnyValue) return;
    if (onSave) onSave(form);
    onClose && onClose();
  };

  return (
    <div className="fixed inset-0 z-50">
      <div onClick={onClose} className="absolute inset-0 bg-black/40 animate-[fadeIn_.18s_ease-out_forwards]" />
      <aside className="absolute top-16 right-5 bottom-5 w-full max-w-[560px] bg-white rounded shadow-lg overflow-auto animate-[slideIn_.28s_ease-out_forwards]" role="dialog" aria-modal="true">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="text-lg font-semibold">Add Vitals & Biometrics</div>
          <button onClick={onClose} className="p-2 rounded hover:bg-gray-100"><X className="h-5 w-5" /></button>
        </div>

        <div className="p-4 space-y-4">
          {/* Vitals section */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="font-semibold text-gray-800">Vitals</div>
              <button onClick={() => setVitalsOpen((s) => !s)} className="text-sm text-gray-500">{vitalsOpen ? '▾' : '▸'}</button>
            </div>

            {vitalsOpen && (
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="col-span-2">
                  <div className="text-[12px] text-gray-600 mb-1">Blood Pressure</div>
                  <div className="flex gap-2 items-center">
                    <input name="bpSys" value={form.bpSys} onChange={handleChange} placeholder="Systolic" className="w-24 border rounded px-2 py-2 text-sm" />
                    <input name="bpDia" value={form.bpDia} onChange={handleChange} placeholder="Diastolic" className="w-24 border rounded px-2 py-2 text-sm" />
                    <div className="text-xs text-gray-500 ml-2">mmHg</div>
                  </div>
                </div>

                <div>
                  <div className="text-[12px] text-gray-600 mb-1">Oxygen Saturation</div>
                  <div className="flex items-center">
                    <input name="oxygenSaturation" value={form.oxygenSaturation} onChange={handleChange} placeholder="Value" className="w-full border rounded px-2 py-2 text-sm" />
                    <div className="text-xs text-gray-500 ml-2">%</div>
                  </div>
                </div>

                <div>
                  <div className="text-[12px] text-gray-600 mb-1">Pulse Rate</div>
                  <div className="flex items-center">
                    <input name="pulse" value={form.pulse} onChange={handleChange} placeholder="Value" className="w-full border rounded px-2 py-2 text-sm" />
                    <div className="text-xs text-gray-500 ml-2">bpm</div>
                  </div>
                </div>

                <div>
                  <div className="text-[12px] text-gray-600 mb-1">Respiratory Rate</div>
                  <div className="flex items-center">
                    <input name="respiratoryRate" value={form.respiratoryRate} onChange={handleChange} placeholder="Value" className="w-full border rounded px-2 py-2 text-sm" />
                    <div className="text-xs text-gray-500 ml-2">rpm</div>
                  </div>
                </div>

                <div>
                  <div className="text-[12px] text-gray-600 mb-1">Body Temperature</div>
                  <div className="flex items-center">
                    <input name="temperature" value={form.temperature} onChange={handleChange} placeholder="Value" className="w-full border rounded px-2 py-2 text-sm" />
                    <div className="text-xs text-gray-500 ml-2">°F</div>
                  </div>
                </div>

                <div>
                  <div className="text-[12px] text-gray-600 mb-1">Blood Glucose Level</div>
                  <div className="flex items-center">
                    <input name="bloodGlucose" value={form.bloodGlucose} onChange={handleChange} placeholder="Value" className="w-full border rounded px-2 py-2 text-sm" />
                    <div className="text-xs text-gray-500 ml-2">mg/dl</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Biometrics section */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="font-semibold text-gray-800">Biometrics</div>
              <button onClick={() => setBiometricsOpen((s) => !s)} className="text-sm text-gray-500">{biometricsOpen ? '▾' : '▸'}</button>
            </div>

            {biometricsOpen && (
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <div className="text-[12px] text-gray-600 mb-1">Height</div>
                  <div className="flex items-center gap-2">
                    <input name="heightFt" value={form.heightFt} onChange={handleChange} placeholder="ft" className="w-20 border rounded px-2 py-2 text-sm" />
                    <input name="heightIn" value={form.heightIn} onChange={handleChange} placeholder="in" className="w-20 border rounded px-2 py-2 text-sm" />
                    <div className="text-xs text-gray-500 ml-2">ft in</div>
                  </div>
                </div>

                <div>
                  <div className="text-[12px] text-gray-600 mb-1">Weight</div>
                  <div className="flex items-center">
                    <input name="weight" value={form.weight} onChange={handleChange} placeholder="Value" className="w-full border rounded px-2 py-2 text-sm" />
                    <div className="text-xs text-gray-500 ml-2">kg</div>
                  </div>
                </div>

                <div>
                  <div className="text-[12px] text-gray-600 mb-1">Waist Circumference</div>
                  <div className="flex items-center">
                    <input name="waist" value={form.waist} onChange={handleChange} placeholder="Value" className="w-full border rounded px-2 py-2 text-sm" />
                    <div className="text-xs text-gray-500 ml-2">cm</div>
                  </div>
                </div>

                <div>
                  <div className="text-[12px] text-gray-600 mb-1">BMI</div>
                  <div className="flex items-center">
                    <input name="bmi" value={form.bmi} onChange={handleChange} placeholder="Value" className="w-full border rounded px-2 py-2 text-sm" />
                    <div className="text-xs text-gray-500 ml-2"> </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <label className="block text-xs text-gray-600">Notes
            <textarea name="notes" value={form.notes} onChange={handleChange} className="mt-1 block w-full border rounded px-2 py-2 text-sm" rows={4} />
          </label>

          <div className="flex items-center justify-end gap-2">
            <button onClick={onClose} className="px-4 py-2 rounded border text-sm">Cancel</button>
            <button onClick={handleSave} disabled={!hasAnyValue} className={`px-4 py-2 rounded text-sm ${hasAnyValue ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}>Save</button>
          </div>
        </div>
  </aside>

  <style>{`@keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0%); } }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }`}</style>
    </div>
  );
}
