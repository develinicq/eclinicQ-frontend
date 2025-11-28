import React from 'react';

function Row({ label, value }) {
  return (
    <div className="grid grid-cols-3 gap-4 py-1 text-sm">
      <div className="text-gray-500">{label}</div>
      <div className="col-span-2 text-gray-800">{value}</div>
    </div>
  );
}

function SectionCard({ title, children }) {
  return (
    <div className="border border-gray-200 rounded-md bg-white">
      <div className="px-4 py-2 border-b text-sm font-semibold text-gray-800">{title}</div>
      <div className="px-4 py-2">{children}</div>
    </div>
  );
}

export default function PatientDemographics() {
  return (
    <div className="py-2">
      <div className="text-sm font-semibold text-gray-800 mb-2">Demographics</div>

      <div className="space-y-4">
        <SectionCard title="Basic Info">
          <Row label="Name:" value="Rahul Sharma" />
          <Row label="Date Of Birth:" value="02 Feb 1996" />
          <Row label="Age:" value="29 Years" />
          <Row label="Gender:" value="Male" />
          <Row label="Blood Group:" value="B+" />
          <Row label="Marital Status:" value="Married" />
        </SectionCard>

        <SectionCard title="Contact Details">
          <div className="text-right -mt-1 -mr-1">
            <button className="text-xs text-blue-600 hover:underline">Edit</button>
          </div>
          <Row label="Primary Phone:" value="+91 98765 43210" />
          <Row label="Secondary Phone:" value="+91 87654 32109" />
          <Row label="Email Address:" value="rahul.sharma@email.com" />
          <Row label="Emergency Contact:" value="+91 98765 43211 (Wife)" />
          <Row label="Primary Language:" value="Hindi" />
          <Row label="Secondary Language:" value="English/Marathi" />
        </SectionCard>

        <SectionCard title="Address Details">
          <div className="text-xs text-blue-600 mb-1">Permanent Address</div>
          <Row label="Address:" value="Jawahar Nagar Gokul Colony" />
          <Row label="City:" value="Akola" />
          <Row label="State:" value="Maharashtra" />
          <Row label="Zip Code:" value="444001" />
        </SectionCard>

        <SectionCard title="Dependant">
          <div className="flex items-center justify-end mb-2">
            <button className="text-sm text-blue-600">+ Add New</button>
          </div>
          <div className="flex items-center gap-3 py-2">
            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold">R</div>
            <div>
              <div className="text-gray-800">Rashmi Sharma <span className="text-xs text-gray-500">Dependant</span></div>
              <div className="text-xs text-gray-500">Wife · +91 91753 67487</div>
            </div>
            <div className="ml-auto"><button className="p-1.5 rounded hover:bg-gray-100">...</button></div>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
