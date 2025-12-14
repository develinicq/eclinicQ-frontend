// Unify Patient header with the same shared header used by Doctors/Hospitals
// so the look-and-feel matches across sections.
import Header from "../DoctorList/Header";

export default function PatientHeader(props) {
  // Default to the 4-tab layout seen in the design: All, Active, Inactive, Draft
  const tabs = props.tabs ?? [
    { key: "all", label: "All" },
    { key: "active", label: "Active" },
    { key: "inactive", label: "Inactive" },
    { key: "draft", label: "Draft" },
  ];
  const counts = props.counts ?? { all: 0, active: 0, inactive: 0, draft: 0 };

  return (
    <Header
      {...props}
      tabs={tabs}
      counts={counts}
  addLabel={props.addLabel ?? "Add New Patient"}
    />
  );
}
