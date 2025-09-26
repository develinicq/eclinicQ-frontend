import { MoreVertical, Eye, ChevronsUpDown } from "lucide-react";
import AvatarCircle from "../AvatarCircle";
import Badge from "../Badge";

// Demo data laid out exactly like the UI reference
const doctors = [
  { name: "Dr. Rahul Sharma", exp: "M | 3 years of experience", id: "D0654321", contact: "+91 9876543210", email: "rajesh.kumar@example.com", location: "Akola, MH", specialization: "General Physician", specializationMore: 1, designation: "DVM in Veterinary Medicine" },
  { name: "Dr. Arjun Singh", exp: "F | 9 years of experience", id: "DO456789", contact: "+91 7654321098", email: "suresh.patel@mail.com", location: "Jaipur, RJ", specialization: "General Physician", specializationMore: 1, designation: "MSc in Artificial Intelligence" },
  { name: "Dr. Kavya Nair", exp: "M | 8 years of experience", id: "D0789123", contact: "+91 5432109876", email: "vikram.agarwal@service.com", location: "Chennai, TN", specialization: "General Physician", specializationMore: 1, designation: "MSc in Data Science" },
  { name: "Dr. Rahul Choudhury", exp: "F | 3 years of experience", id: "D0987654", contact: "+91 8765432109", email: "anita.sharma@domain.com", location: "Pune, MH", specialization: "General Physician", specializationMore: 1, designation: "PhD in Chemistry" },
  { name: "Dr. Sneha Joshi", exp: "M | 8 years of experience", id: "D0321987", contact: "+91 6543210987", email: "neha.singh@webmail.com", location: "Bhopal, MP", specialization: "General Physician", specializationMore: 1, designation: "MS in Civil Engineering" },
  { name: "Dr. Vikram Patel", exp: "F | 6 years of experience", id: "DO123456", contact: "+91 6543210987", email: "neha.singh@webmail.com", location: "Bhopal, MP", specialization: "General Physician", specializationMore: 1, designation: "MSc in Environmental Science" },
  { name: "Dr. Riya Verma", exp: "M | 2 years of experience", id: "DO234567", contact: "+91 9876543211", email: "deepak.rao@company.com", location: "Delhi, DL", specialization: "General Physician", specializationMore: 1, designation: "MFA in Creative Writing" },
  { name: "Dr. Karan Sharma", exp: "F | 5 years of experience", id: "DO345678", contact: "+91 8765432110", email: "pooja.patel@gmail.com", location: "Ahmedabad, GJ", specialization: "General Physician", specializationMore: 1, designation: "PhD in Neuroscience" },
  { name: "Dr. Meera Tiwari", exp: "M | 1 year of experience", id: "DO456789", contact: "+91 7654321097", email: "rahul.kumar@business.com", location: "Hyderabad, TG", specialization: "General Physician", specializationMore: 1, designation: "MSc in Biochemistry" },
  { name: "Dr. Deepak Prasad", exp: "F | 6 years of experience", id: "DO111222", contact: "+91 1234567890", email: "sita.verma@xyz.com", location: "Mumbai, MH", specialization: "02/03/2025 | 1:00 PM", specializationMore: 1, designation: "MBA in Healthcare Management" },
  { name: "Dr. Nisha Talwar", exp: "F | 5 years of experience", id: "DO333444", contact: "+91 0987654321", email: "karan.mittal@example.com", location: "Kolkata, WB", specialization: "02/03/2025 | 1:30 PM", specializationMore: 1, designation: "MD Pediatrics" },
  { name: "Dr. Himanshu Gupta", exp: "M | 4 years of experience", id: "DO555666", contact: "+91 1122334455", email: "ravi.sharma@mail.com", location: "Lucknow, UP", specialization: "02/03/2025 | 2:00 PM", specializationMore: 1, designation: "MEng in Software Engineering" },
  { name: "Dr. Suman Rao", exp: "F | 2 years of experience", id: "DO777888", contact: "+91 9988776655", email: "priya.jain@service.com", location: "Noida, UP", specialization: "02/03/2025 | 2:30 PM", specializationMore: 1, designation: "MS Orthopedic" },
  { name: "Dr. Pooja Jain", exp: "M | 5 years of experience", id: "DO999000", contact: "+91 2233445566", email: "manoj.kumar@xyz.com", location: "Ahmedabad, GJ", specialization: "02/03/2025 | 3:00 PM", specializationMore: 1, designation: "MFA in Film Production" },
  { name: "Dr. Sameer Gupta", exp: "F | 8 years of experience", id: "DO888999", contact: "+91 3344556677", email: "sonia.patel@domain.com", location: "Surat, GJ", specialization: "02/03/2025 | 3:30 PM", specializationMore: 1, designation: "MD in Cardiology" },
];

export default function Table() {
  return (
  <div className="bg-white flex flex-col">
      {/* Sticky table header + scrollable body */}
      <div className="overflow-x-auto">
  <div className="max-h-[82vh] overflow-y-auto">
          <table className="min-w-full table-fixed text-sm text-left text-gray-700">
            <colgroup>
              <col className="w-[280px]" />
              <col className="w-[110px]" />
              <col className="w-[150px]" />
              <col className="w-[220px]" />
              <col className="w-[130px]" />
              <col className="w-[210px]" />
              <col className="w-[260px]" />
              <col className="w-[84px]" />
            </colgroup>
            <thead className="sticky  top-0 z-10 bg-white text-[12px] uppercase font-medium text-gray-500 border-b">
              <tr className="h-8">
                <th className="pl-4 pr-4 py-0 h-8 whitespace-nowrap">
                  <span className="inline-flex items-center gap-2 h-8">
                    <input type="checkbox" className="accent-blue-600" aria-label="Select all" />
                    <span className="inline-flex items-center gap-1 whitespace-nowrap">Doctors <ChevronsUpDown className="h-3.5 w-3.5" /></span>
                  </span>
                </th>
                <th className="px-4 py-0 h-8 whitespace-nowrap">
                  <span className="inline-flex items-center gap-1 whitespace-nowrap h-8">Doc ID <ChevronsUpDown className="h-3.5 w-3.5" /></span>
                </th>
                <th className="px-4 py-0 h-8 whitespace-nowrap"><span className="inline-flex items-center gap-1 whitespace-nowrap h-8">Contact Number <ChevronsUpDown className="h-3.5 w-3.5" /></span></th>
                <th className="px-4 py-0 h-8 whitespace-nowrap">Email</th>
                <th className="px-4 py-0 h-8 whitespace-nowrap">Location</th>
                <th className="px-4 py-0 h-8 whitespace-nowrap">
                  <span className="inline-flex items-center gap-1 whitespace-nowrap h-8">Specializations <ChevronsUpDown className="h-3.5 w-3.5" /></span>
                </th>
                <th className="px-4 py-0 h-8 whitespace-nowrap">
                  <span className="inline-flex items-center gap-1 whitespace-nowrap h-8">Designation <ChevronsUpDown className="h-3.5 w-3.5" /></span>
                </th>
                <th className="px-11 py-0 h-8 whitespace-nowrap text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
  {doctors.map((doc, idx) => (
    <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50 text-sm ">
      <td className="pl-4 pr-4 py-2">
                    <div className="flex items-center gap-2">
            <AvatarCircle name={doc.name} size="s" color="orange" />
                      <div>
                        <p className="font-medium text-gray-900 leading-5">{doc.name}</p>
                        <p className="text-xs text-gray-500">{doc.exp}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-700">{doc.id}</td>
                  <td className="px-4 py-3 text-gray-700">{doc.contact}</td>
                  <td className="px-4 py-3 text-gray-700 whitespace-normal break-words">{doc.email}</td>
                  <td className="px-4 py-3 text-gray-700">{doc.location}</td>
                  <td className="px-4 py-3 text-gray-700">
                    <div className="flex items-center gap-2">
                      {/* If specialization looks like a date, show it as a pill to match UI */}
                      {doc.specialization?.includes('/') ? (
                        <Badge size="s" type="ghost" color="gray" className="!h-6 !text-[12px] !px-2 whitespace-nowrap">{doc.specialization}</Badge>
                      ) : (
                        <span>{doc.specialization}</span>
                      )}
                      {doc.specializationMore ? (
                        <Badge size="s" type="ghost" color="gray" className="!h-5 !text-[11px] !px-1.5">+{doc.specializationMore}</Badge>
                      ) : null}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    <div className="flex items-center gap-2">
                      <span className="truncate max-w-[240px]">{doc.designation}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1 text-gray-600">
                      <button className="p-1.5 rounded hover:bg-gray-100" aria-label="View">
                        <Eye className="h-4 w-4" />
                      </button>
                      <span className="mx-2 h-4 w-px bg-gray-200" aria-hidden="true" />
                      <button className="p-1.5 rounded hover:bg-gray-100" aria-label="More">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Internal pagination footer */}
      <div className="border-t border-gray-200 px-3 py-2">
        <div className="flex items-center justify-center gap-2 text-sm">
          <button className="px-2 py-1 text-gray-600 hover:bg-gray-100 rounded" aria-label="First">«</button>
          <button className="px-2 py-1 text-gray-600 hover:bg-gray-100 rounded" aria-label="Prev">‹</button>
          {[1, 2, 3].map((n) => (
            <button
              key={n}
              className={`w-7 h-7 rounded text-xs ${n === 1 ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100"}`}
              aria-current={n === 1 ? "page" : undefined}
            >
              {n}
            </button>
          ))}
          <span className="px-1">…</span>
          <button className="px-2 py-1 text-gray-600 hover:bg-gray-100 rounded" aria-label="Next">›</button>
          <button className="px-2 py-1 text-gray-600 hover:bg-gray-100 rounded" aria-label="Last">»</button>
          <span className="text-sm text-gray-500 ml-2">10 / Page</span>
          <Badge size="s" type="ghost" color="gray">Go to Page</Badge>
        </div>
      </div>
    </div>
  );
}
