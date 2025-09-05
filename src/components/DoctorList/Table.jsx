import { MoreVertical } from "lucide-react";

const doctors = [
  {
    name: "Dr. Rahul Sharma",
    exp: "M | 3 years of experience",
    id: "D0654321",
    contact: "+91 9876543210",
    email: "rajesh.kumar@example.com",
    location: "Akola, MH",
    specialization: "General Physician",
    designation: "DVM in Veterinary Medicine",
  },
  {
    name: "Dr. Arjun Singh",
    exp: "F | 9 years of experience",
    id: "DO456789",
    contact: "+91 7654321098",
    email: "suresh.patel@mail.com",
    location: "Jaipur, RJ",
    specialization: "General Physician",
    designation: "MSc in Artificial Intelligence",
  },
  // add all doctors here...
];

export default function Table() {
  return (
    <div className="overflow-x-auto bg-white border border-gray-200 rounded-lg shadow-sm mt-4">
      <table className="min-w-full text-sm text-left text-gray-600">
        <thead className="bg-gray-50 text-xs uppercase font-medium text-gray-500">
          <tr>
            <th className="px-4 py-3">Doctors</th>
            <th className="px-4 py-3">Doc ID</th>
            <th className="px-4 py-3">Contact Number</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Location</th>
            <th className="px-4 py-3">Specializations</th>
            <th className="px-4 py-3">Designation</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doc, idx) => (
            <tr
              key={idx}
              className="border-b hover:bg-gray-50 text-sm"
            >
              <td className="px-4 py-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-medium">
                    {doc.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium">{doc.name}</p>
                    <p className="text-xs text-gray-500">{doc.exp}</p>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3">{doc.id}</td>
              <td className="px-4 py-3">{doc.contact}</td>
              <td className="px-4 py-3">{doc.email}</td>
              <td className="px-4 py-3">{doc.location}</td>
              <td className="px-4 py-3">{doc.specialization}</td>
              <td className="px-4 py-3">{doc.designation}</td>
              <td className="px-4 py-3 text-right">
                <button className="p-1 rounded hover:bg-gray-100">
                  <MoreVertical className="h-4 w-4 text-gray-500" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
