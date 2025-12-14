import React, { useState } from 'react';
import Badge from '../../../components/Badge';
import AvatarCircle from '../../../components/AvatarCircle';
import { Filter, MoreVertical } from 'lucide-react';

const SUB_TABS = ['Problems', 'Conditions', 'Allergies', 'Immunizations', 'Family History', 'Social'];

function SubTabs({ value, onChange }) {
  return (
    <div className="flex items-center gap-2 text-xs">
      {SUB_TABS.map((t) => (
        <button
          key={t}
          onClick={() => onChange(t)}
          className={`px-2.5 py-1 rounded-md border ${value===t ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'}`}
        >
          {t}
        </button>
      ))}
    </div>
  );
}

function statusColor(s) {
  if (s === 'Resolved' || s === 'Completed') return 'green';
  if (s === 'Active') return 'red';
  if (s === 'Current') return 'green';
  if (s === 'Former' || s === 'Former ') return 'gray';
  if (s === 'Pending' || s === 'Inactive' || s === 'In-Active' || s === 'Entered in Error' || s === 'Historical') return 'yellow';
  return 'gray';
}

function severityColor(s) {
  if (s === 'Severe') return 'red';
  if (s === 'High' || s === 'Moderate') return 'yellow';
  if (s === 'Low') return 'gray';
  return 'gray';
}

const problemsRows = [
  { problem: 'Pain after surgery', since: '02/02/2025', severity: 'High', status: 'Active', by: 'Milind Chauhan' },
  { problem: 'Chronic back pain', since: '10/01/2025', severity: 'Low', status: 'Active', by: 'Milind Chauhan' },
  { problem: 'Migraine episodes', since: '08/20/2025', severity: 'Low', status: 'Resolved', by: 'Milind Chauhan' },
  { problem: 'Post-surgery fatigue', since: '05/14/2025', severity: 'Severe', status: 'Active', by: 'Milind Chauhan' },
  { problem: 'Joint stiffness', since: '03/10/2025', severity: 'Low', status: 'Entered in Error', by: 'Milind Chauhan' },
  { problem: 'Anxiety attacks', since: '01/25/2025', severity: 'Low', status: 'Pending', by: 'Sarah Connors' },
  { problem: 'Post-operative nausea', since: '12/15/2024', severity: 'Moderate', status: 'Inactive', by: 'Sarah Connors' },
  { problem: 'Insomnia', since: '11/30/2024', severity: 'Moderate', status: 'Inactive', by: 'Milind Chauhan' },
];

function ProblemsTable() {
  return (
    <div className="mt-2 border border-gray-200 rounded-md">
      <table className="min-w-full table-fixed text-sm text-left text-gray-700">
        <colgroup>
          <col />
          <col className="w-[160px]" />
          <col className="w-[140px]" />
          <col className="w-[180px]" />
          <col className="w-[220px]" />
          <col className="w-[64px]" />
        </colgroup>
  <thead className="bg-gray-50 text-[12px] uppercase font-semibold text-gray-400 border-b">
          <tr className="h-8">
            <th className="pl-3">Problem</th>
            <th>Since</th>
            <th>Severity</th>
            <th>Status</th>
            <th>Created by</th>
            <th className="pr-2 text-right"> </th>
          </tr>
        </thead>
        <tbody>
          {problemsRows.map((r, i) => (
            <tr key={i} className="border-b border-gray-200">
              <td className="pl-3 py-2 text-gray-800">{r.problem}</td>
              <td className="py-2 text-gray-700">{r.since}</td>
              <td className="py-2"><Badge size="s" type="ghost" color={severityColor(r.severity)}>{r.severity}</Badge></td>
              <td className="py-2"><Badge size="s" type="ghost" color={statusColor(r.status)}>{r.status}</Badge></td>
              <td className="py-2">
                <div className="flex items-center gap-2">
                  <AvatarCircle name={r.by} size="s" />
                  <span className="text-gray-800">{r.by}</span>
                </div>
              </td>
              <td className="py-2 pr-2">
                <div className="flex items-center justify-end gap-2 text-gray-600">
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

const conditionsRows = [
  { condition: 'Type 2 Diabetes Mellitus', onset: '02/02/2025', severity: 'Low', type: 'Chronic', status: 'Active', by: 'Milind Chauhan' },
  { condition: 'Common Cold', onset: '12/02/2025', severity: 'Moderate', type: 'Acute', status: 'Active', by: 'Milind Chauhan' },
  { condition: 'Hypertension', onset: '15/03/2025', severity: 'High', type: 'Chronic', status: 'In-Active', by: 'Milind Chauhan' },
  { condition: 'Seasonal Allergies', onset: '01/04/2025', severity: 'Moderate', type: 'Acute', status: 'Resolved', by: 'Milind Chauhan' },
];

function ConditionsTable() {
  return (
    <div className="mt-2 border border-gray-200 rounded-md">
      <table className="min-w-full table-fixed text-sm text-left text-gray-700">
        <colgroup>
          <col />
          <col className="w-[160px]" />
          <col className="w-[140px]" />
          <col className="w-[140px]" />
          <col className="w-[160px]" />
          <col className="w-[220px]" />
          <col className="w-[64px]" />
        </colgroup>
        <thead className="bg-gray-50 text-[12px] uppercase font-medium text-gray-500 border-b">
          <tr className="h-8">
            <th className="pl-3">Condition</th>
            <th>Onset Date</th>
            <th>Severity</th>
            <th>Type</th>
            <th>Status</th>
            <th>Created by</th>
            <th className="pr-2 text-right"> </th>
          </tr>
        </thead>
        <tbody>
          {conditionsRows.map((r, i) => (
            <tr key={i} className="border-b border-gray-200">
              <td className="pl-3 py-2 text-gray-800">{r.condition}</td>
              <td className="py-2 text-gray-700">{r.onset}</td>
              <td className="py-2"><Badge size="s" type="ghost" color={severityColor(r.severity)}>{r.severity}</Badge></td>
              <td className="py-2 text-gray-700">{r.type}</td>
              <td className="py-2"><Badge size="s" type="ghost" color={statusColor(r.status)}>{r.status}</Badge></td>
              <td className="py-2">
                <div className="flex items-center gap-2">
                  <AvatarCircle name={r.by} size="s" />
                  <span className="text-gray-800">{r.by}</span>
                </div>
              </td>
              <td className="py-2 pr-2">
                <div className="flex items-center justify-end gap-2 text-gray-600">
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

const allergiesRows = [
  { allergen: 'Penicillin', reaction: 'Skin rash, difficulty breathing', since: '02/02/2025', severity: 'Mild', type: 'Drug', status: 'Active', by: 'Milind Chauhan' },
  { allergen: 'Peanuts', reaction: 'Nausea', since: '02/02/2025', severity: 'Severe', type: 'Food', status: 'Resolved', by: 'Milind Chauhan' },
  { allergen: 'Shellfish', reaction: 'Hives, swelling of the lips', since: '02/03/2025', severity: 'Moderate', type: 'Food', status: 'Active', by: 'Milind Chauhan' },
  { allergen: 'Gluten', reaction: 'Abdominal pain, bloating', since: '02/04/2025', severity: 'Mild', type: 'Food', status: 'Entered in Error', by: 'Milind Chauhan' },
];

function AllergiesTable() {
  return (
    <div className="mt-2 border border-gray-200 rounded-md">
      <table className="min-w-full table-fixed text-sm text-left text-gray-700">
        <colgroup>
          <col className="w-[220px]" />
          <col className="w-[360px]" />
          <col className="w-[120px]" />
          <col className="w-[120px]" />
          <col className="w-[120px]" />
          <col className="w-[140px]" />
          <col className="w-[160px]" />
          <col className="w-[64px]" />
        </colgroup>
        <thead className="bg-gray-50 text-[12px] uppercase font-medium text-gray-500 border-b">
          <tr className="h-8">
            <th className="pl-3">Allergen</th>
            <th>Reaction</th>
            <th>Since</th>
            <th>Severity</th>
            <th>Type</th>
            <th>Status</th>
            <th>Created by</th>
            <th className="pr-2 text-right"> </th>
          </tr>
        </thead>
        <tbody>
          {allergiesRows.map((r, i) => (
            <tr key={i} className="border-b border-gray-200">
              <td className="pl-3 py-2 text-gray-800">{r.allergen}</td>
              <td className="py-2 text-gray-700 break-words max-w-[360px]">{r.reaction}</td>
              <td className="py-2 text-gray-700">{r.since}</td>
              <td className="py-2"><Badge size="s" type="ghost" color={severityColor(r.severity)}>{r.severity}</Badge></td>
              <td className="py-2 text-gray-700">{r.type}</td>
              <td className="py-2"><Badge size="s" type="ghost" color={statusColor(r.status)}>{r.status}</Badge></td>
              <td className="py-2">
                <div className="flex items-center gap-2">
                  <AvatarCircle name={r.by} size="s" />
                  <span className="text-gray-800">{r.by}</span>
                </div>
              </td>
              <td className="py-2 pr-2">
                <div className="flex items-center justify-end gap-2 text-gray-600">
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

const immunizationsRows = [
  { name: 'COVID-19', date: '02/02/2025', dose: 2, status: 'Completed', doctor: 'Milind Chauhan', note: 'No fever or other adverse effects.' },
  { name: 'Influenza', date: '10/20/2023', dose: 1, status: 'Historical', doctor: 'Dr. Rajesh Sharma', note: 'Annual flu shot administered.' },
  { name: 'Hepatitis B', date: '05/15/2024', dose: 1, status: 'Completed', doctor: 'Nisha Patel', note: 'Completed three-dose series.' },
  { name: 'Tetanus', date: '08/30/2023', dose: 1, status: 'Historical', doctor: 'Dr. Anil Gupta', note: 'Booster received.' },
];

const socialRows = [
  { category: 'Smoking', since: '02/02/2025', freq: 'Daily', status: 'Current', source: 'Patient', note: 'Patient wants to quit. Counseled during last visit.', by: 'Milind Chauhan' },
  { category: 'Substance Use', since: '12/02/2024', freq: 'Weekly', status: 'Former', source: 'Patient', note: 'Occasional recreational cannabis use in college. Stopped recently.', by: 'Milind Chauhan' },
  { category: 'Alcohol Consumption', since: '01/15/2025', freq: 'Monthly', status: 'Current', source: 'Patient', note: 'Patient reports drinking socially on weekends, no plans to quit.', by: 'Milind Chauhan' },
];

function SocialTable() {
  return (
    <div className="mt-2 border border-gray-200 rounded-md">
      <table className="min-w-full table-fixed text-sm text-left text-gray-700">
        <colgroup>
          <col className="w-[220px]" />
          <col className="w-[120px]" />
          <col className="w-[100px]" />
          <col className="w-[120px]" />
          <col style={{ width: '36%' }} />
          <col className="w-[120px]" />
          <col className="w-[160px]" />
        </colgroup>
        <thead className="bg-gray-50 text-[12px] uppercase font-medium text-gray-500 border-b">
          <tr className="h-8">
            <th className="pl-3">Category</th>
            <th>Since</th>
            <th>Freq.</th>
            <th>Status</th>
            <th>Note</th>
            <th>Source</th>
            <th className="pr-2 text-right">Verified by</th>
          </tr>
        </thead>
        <tbody>
          {socialRows.map((r, i) => (
            <tr key={i} className="border-b border-gray-200">
              <td className="pl-3 py-3 text-gray-800">{r.category}</td>
              <td className="py-3 text-gray-700">{r.since}</td>
              <td className="py-3 text-gray-700">{r.freq}</td>
              <td className="py-3"><Badge size="s" type="ghost" color={statusColor(r.status)}>{r.status}</Badge></td>
              <td className="py-3 text-gray-600 max-w-[680px] line-clamp-2 overflow-hidden pr-4">{r.note}</td>
              <td className="py-3 text-gray-700">{r.source}</td>
              <td className="py-3 pr-2 whitespace-nowrap">
                <div className="flex items-center justify-end gap-3 text-gray-600">
                  <AvatarCircle name={r.by} size="s" />
                  <span className="text-gray-800 truncate max-w-[88px]">{r.by}</span>
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

function DoctorCell({ name }) {
  return (
    <div className="flex items-center gap-2">
      <AvatarCircle name={name} size="s" />
      <span className="text-gray-800">{name}</span>
    </div>
  );
}

function ImmunizationsTable() {
  return (
    <div className="mt-2 border border-gray-200 rounded-md">
      <table className="w-full text-sm text-left text-gray-700">
        <colgroup>
          <col style={{ width: '30%' }} />
          <col style={{ width: '14%' }} />
          <col style={{ width: '8%' }} />
          <col style={{ width: '30%' }} />
          <col style={{ width: '20%' }} />
          <col style={{ width: '48px' }} />
        </colgroup>
        <thead className="bg-gray-50 text-[12px] uppercase font-medium text-gray-500 border-b">
          <tr className="h-8">
            <th className="pl-3">Vaccine Name</th>
            <th>Date</th>
            <th>Dose</th>
            <th>Note</th>
            <th>Doctor</th>
            <th className="pr-2 text-right"> </th>
          </tr>
        </thead>
        <tbody>
          {immunizationsRows.map((r, i) => (
            <tr key={i} className="border-b border-gray-200">
              <td className="pl-3 py-3 text-gray-800">{r.name}</td>
              <td className="py-3 text-gray-700">{r.date}</td>
              <td className="py-3 text-gray-700">{r.dose}</td>
              <td className="py-3 text-gray-600 break-words">{r.note}</td>
              <td className="py-3">
                <div className="flex items-center gap-3">
                  <AvatarCircle name={r.doctor} size="s" />
                  <span className="text-gray-800">{r.doctor}</span>
                </div>
              </td>
              <td className="py-3 pr-2 text-right">
                <button className="p-1.5 rounded hover:bg-gray-100" aria-label="More"><MoreVertical className="h-4 w-4 text-gray-600" /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const familyRows = [
  { relation: 'Father', problems: ['Hypertension'], since: '02/02/2025', status: 'Active', note: 'Normal From Last 1 Year' },
  { relation: 'Mother', problems: ['High Cholesterol'], since: '02/02/2025', status: 'Active', note: 'Still This Problems Active' },
];

function FamilyHistoryTable() {
  return (
    <div className="mt-2 border border-gray-200 rounded-md">
      <table className="min-w-full table-fixed text-sm text-left text-gray-700">
        <colgroup>
          <col className="w-[160px]" />
          <col />
          <col className="w-[140px]" />
          <col className="w-[120px]" />
          <col className="w-[260px]" />
          <col className="w-[64px]" />
        </colgroup>
        <thead className="bg-gray-50 text-[12px] uppercase font-medium text-gray-500 border-b">
          <tr className="h-8">
            <th className="pl-3">Relation</th>
            <th>Problems</th>
            <th>Since</th>
            <th>Status</th>
            <th>Note</th>
            <th className="pr-2 text-right"> </th>
          </tr>
        </thead>
        <tbody>
          {familyRows.map((r, i) => (
            <tr key={i} className="border-b border-gray-200">
              <td className="pl-3 py-2 text-gray-800">{r.relation}</td>
              <td className="py-2">
                <div className="flex flex-wrap gap-2">
                  {r.problems.map((p, idx) => (
                    <Badge key={idx} size="s" type="ghost" color="gray">{p}</Badge>
                  ))}
                </div>
              </td>
              <td className="py-2 text-gray-700">{r.since}</td>
              <td className="py-2"><Badge size="s" type="ghost" color={statusColor(r.status)}>{r.status}</Badge></td>
              <td className="py-2 text-gray-700">{r.note}</td>
              <td className="py-2 pr-2">
                <div className="flex items-center justify-end gap-2 text-gray-600">
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

export default function PatientMedicalHistory() {
  const [active, setActive] = useState('Problems');
  const addLabel = active === 'Problems'
    ? 'Add Problem'
    : active === 'Conditions'
    ? 'Add Condition'
    : active === 'Family History'
    ? 'Add History'
    : `Add ${active}`;
  return (
    <div className="py-2">
      <div className="bg-white border rounded-md p-4">
        <div className="flex items-center justify-between mb-4">
          <SubTabs value={active} onChange={setActive} />
          <div className="flex items-center gap-3 text-sm">
            <button className="text-blue-600 hover:underline">+ {addLabel}</button>
            <button className="p-1.5 rounded hover:bg-gray-100" aria-label="Filter"><Filter className="h-4 w-4 text-gray-600" /></button>
          </div>
        </div>

        {active === 'Problems' && <ProblemsTable />}
        {active === 'Conditions' && <ConditionsTable />}
        {active === 'Allergies' && <AllergiesTable />}
        {active === 'Immunizations' && <ImmunizationsTable />}
        {active === 'Family History' && <FamilyHistoryTable />}
        {active === 'Social' && <SocialTable />}

        {active !== 'Problems' && active !== 'Conditions' && active !== 'Allergies' && active !== 'Immunizations' && active !== 'Family History' && active !== 'Social' && (
          <div className="text-sm text-gray-500 border border-dashed border-gray-200 rounded-md p-6">
            {`${active} section coming soon.`}
          </div>
        )}
      </div>
    </div>
  );
}
