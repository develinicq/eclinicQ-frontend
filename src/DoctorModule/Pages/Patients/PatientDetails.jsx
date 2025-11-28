import React, { useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { Phone, Mail, MapPin, Languages, Plus, MoreHorizontal, CheckCircle, Calendar, User, Droplet } from 'lucide-react';
import AvatarCircle from '../../../components/AvatarCircle';
import Badge from '../../../components/Badge';
import PatientVitals from './PatientVitals';
import PatientAppointments from './PatientAppointments';
import PatientMedicalHistory from './PatientMedicalHistory';
import PatientDocuments from './PatientDocuments';
import PatientDemographics from './PatientDemographics';

export default function PatientDetails() {
  const { id } = useParams();
  // in a real app, load by id from route and fetch details
  const patient = history.state?.usr?.patient || history.state?.patient || {};
  const name = patient.name || 'Rahul Sharma';
  const mrn = patient.patientId || 'P654321';
  const gender = patient.gender || 'M';
  const dob = patient.dob || '12/05/1985 (39y, 7m)';
  const blood = patient.blood || 'B+';

  // leftTab controls the left fixed panel (overview, demographics)
  // rightTab controls the right flexible panel (vitals, appointment, medical, documents)
  const [leftTab, setLeftTab] = useState('overview');
  const [rightTab, setRightTab] = useState('vitals');
  const [stickyNote, setStickyNote] = useState('');
  const activeProblems = patient.activeProblems || [{ title: 'High Blood Pressure', label: 'Slightly High' }, { title: 'Type 2 Diabetes', label: 'Under Controlled' }];
  const dependants = patient.dependants || [{ name: 'Rashmi Sharma', relation: 'Wife', phone: '+91 91753 67487' }];
  return (
    <div className="flex flex-col gap-3">
      {/* Header row */}
      <div className="bg-white px-4 py-3 rounded-md border border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <AvatarCircle name={name} size="l" />
          <div className="flex flex-col">
            <div>
              <span className="font-semibold text-gray-800 text-lg">{name}</span>
            </div>
            <div className="flex items-center text-xs text-gray-500 gap-4 mt-1">
              <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5 text-gray-400" /> 03/14/1990 (33Y)</span>
              <span className="flex items-center gap-1"><User className="h-3.5 w-3.5 text-gray-400" /> {gender === 'M' ? 'Male' : gender === 'F' ? 'Female' : gender}</span>
              <span className="flex items-center gap-1"><Droplet className="h-3.5 w-3.5 text-gray-400" /> {blood}</span>
              <span className="text-xs text-gray-500">MRN: {mrn}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded text-sm hover:bg-gray-50">
            <svg className="h-4 w-4 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3M3 11h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            <span>Schedule</span>
          </button>

          <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded text-sm hover:bg-gray-50">
            <svg className="h-4 w-4 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            <span>Add Vitals</span>
          </button>

          <button className="p-1.5 rounded hover:bg-gray-100"><MoreHorizontal className="h-5 w-5" /></button>
        </div>
      </div>

      {/* Main split panels: left fixed 400px, right flexible — each has its own navigation */}
      <div className="bg-white px-4 rounded-md border border-gray-200">
        <div className="py-4">
          <div className="flex gap-6">
            {/* Left fixed column with its own nav */}
            <div className="w-[400px] flex-shrink-0 border-r border-gray-200 pr-4">
              <div className="flex items-center gap-4 mb-3">
                <button onClick={() => setLeftTab('overview')} className={`h-9 px-2 ${leftTab==='overview' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-800'}`}>Overview</button>
                <button onClick={() => setLeftTab('demographics')} className={`h-9 px-2 ${leftTab==='demographics' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-800'}`}>Demographics</button>
              </div>

              {/* sticky notes input */}
              <div className="mb-3">
                <input value={stickyNote} onChange={(e) => setStickyNote(e.target.value)} placeholder="Add Sticky Notes of Patient's Quick Updates" className="w-full bg-yellow-50 border border-yellow-200 text-yellow-800 px-3 py-2 rounded text-sm focus:outline-none" />
              </div>

              {/* left content area */}
              {leftTab === 'overview' && (
                <div className="space-y-6">
                  <div className="bg-white p-4 rounded border border-gray-200">
                    <div className="font-semibold text-gray-800 mb-2">Contact Info</div>
                    <div className="flex flex-col gap-2 text-sm text-gray-700">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-gray-500" /> +91 91753 67487 <Badge size="s" type="ghost" color="yellow">Primary</Badge></div>
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-gray-500" /> +91 87654 32109 <span className="text-xs text-gray-500">Secondary</span></div>
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      </div>
                      <div className="flex items-center justify-between"><div className="flex items-center gap-2"><Mail className="h-4 w-4 text-gray-500" /> Rahul.Sharma@gmail.com</div><CheckCircle className="h-4 w-4 text-green-500" /></div>
                      <div className="flex items-center justify-between"><div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-gray-500" /> Jawahar Nagar, Akola - 444001</div><CheckCircle className="h-4 w-4 text-green-500" /></div>
                      <div className="flex items-center justify-between"><div className="flex items-center gap-2"><Languages className="h-4 w-4 text-gray-500" /> English/Hindi/Marathi</div><CheckCircle className="h-4 w-4 text-green-500" /></div>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded border border-gray-200">
                    <div className="font-semibold text-gray-800 mb-2">Last Visit</div>
                    <div className="grid grid-cols-3 gap-y-1 text-sm text-gray-700">
                      <div className="text-gray-500">Date:</div>
                      <div className="col-span-2">28 Dec 2023 at 2:30 PM</div>
                      <div className="text-gray-500">Doctor:</div>
                      <div className="col-span-2">Dr. Milind Chauhan</div>
                      <div className="text-gray-500">Type:</div>
                      <div className="col-span-2">Consultation</div>
                      <div className="text-gray-500">Reason:</div>
                      <div className="col-span-2">Hypertension evaluation</div>
                      <div className="text-gray-500">Status:</div>
                      <div className="col-span-2 text-green-600">Completed (05:30 Mins)</div>
                      <div className="col-span-3 text-xs text-blue-600 mt-2"><button className="underline">View Prescription →</button></div>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded border border-gray-200">
                    <div className="font-semibold text-gray-800 mb-2">Last Recorded Vitals & Biometrics</div>
                    <div className="text-xs text-gray-500 mb-1">Recorded on 06/01/2025 by Dr. Milind Chauhan</div>
                    <div className="text-sm text-gray-700 space-y-1">
                      <div className="flex justify-between"><span>Blood Pressure:</span> <span>130/85 <span className="text-red-500">↑</span></span></div>
                      <div className="flex justify-between"><span>Oxygen Saturation:</span> <span>98%</span></div>
                      <div className="flex justify-between"><span>Temperature:</span> <span>103 F <span className="text-red-500">↑</span></span></div>
                      <div className="flex justify-between"><span>Weight:</span> <span>75 Kgs</span></div>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded border border-gray-200">
                    <div className="font-semibold text-gray-800 mb-2">Active Problems</div>
                    <div className="flex flex-col gap-2 mb-2 text-sm text-gray-700">
                      {activeProblems.map((p, idx) => (
                        <div key={idx} className="flex items-center justify-between">
                          <div>{p.title}</div>
                          <div><Badge type="ghost" color={p.label && p.label.toLowerCase().includes('high') ? 'red' : 'gray'}>{p.label}</Badge></div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-semibold text-gray-800">Dependant</div>
                      <div className="text-sm text-blue-600">+ Add New</div>
                    </div>
                    <div className="flex flex-col gap-3 text-sm text-gray-700">
                      {dependants.map((d, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <AvatarCircle name={d.name} size="s" />
                          <div>
                            <div>{d.name} <span className="text-xs text-gray-500">Dependant</span></div>
                            <div className="text-xs text-gray-500">{d.relation} · {d.phone}</div>
                          </div>
                          <button className="ml-auto p-1.5 rounded hover:bg-gray-100"><MoreHorizontal className="h-4 w-4" /></button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {leftTab === 'demographics' && (
                <div className="bg-white p-4 rounded border border-gray-200">
                  <PatientDemographics />
                </div>
              )}
            </div>

            {/* Right flexible column with its own nav */}
            <div className="flex-1">
              <div className="flex items-center gap-6 mb-3">
                <button onClick={() => setRightTab('vitals')} className={`h-9 px-2 ${rightTab==='vitals' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-800'}`}>Vitals & Biometrics</button>
                <button onClick={() => setRightTab('appointment')} className={`h-9 px-2 ${rightTab==='appointment' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-800'}`}>Appointment</button>
                <button onClick={() => setRightTab('medical')} className={`h-9 px-2 ${rightTab==='medical' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-800'}`}>Medical History</button>
                <button onClick={() => setRightTab('documents')} className={`h-9 px-2 ${rightTab==='documents' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-800'}`}>Documents</button>
              </div>

              <div className="bg-white p-4 rounded border border-gray-200 min-h-[240px]">
                {rightTab === 'vitals' && (
                  <div className="py-2"><PatientVitals embedded /></div>
                )}
                {rightTab === 'appointment' && (
                  <div className="py-2"><PatientAppointments /></div>
                )}
                {rightTab === 'medical' && (
                  <div className="py-2"><PatientMedicalHistory /></div>
                )}
                {rightTab === 'documents' && (
                  <div className="py-2"><PatientDocuments /></div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
