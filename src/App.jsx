import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layouts/Layout_sidebar";
import Dashboard from "./SuperAdmin/pages/Dashboard/Dashboard";
import Doctor from "./SuperAdmin/pages/Doctors/Doctor";
import Hospitals from "./SuperAdmin/pages/Hospitals/Hospitals";
import Patients from "./SuperAdmin/pages/Patients/Patients";
import Settings from "./SuperAdmin/pages/Settings/Settings";
import Layout_registration_new from "./components/Layouts/Layout_registration_new";
import DoctorDetailsPage from "./SuperAdmin/pages/Doctors/DoctorList/DoctorInfo/DoctorDetailsPage";
import HospitalDetailsPage from "./SuperAdmin/pages/Hospitals/HospitalList/HospitalInfo/HospitalDetailsPage";
import { RegistrationProvider } from "./SuperAdmin/context/RegistrationContext";
import DummyLogin from "./pages/DummyLogin";
import GetStarted from "./pages/GetStarted";
import OnboardingFlow from "./DoctorModule/Pages/Login/OnboardingFlow";
import Doctor_layout from "./DoctorModule/Components/Layout/DoctorLayout";
import DocDashboard from "./DoctorModule/Pages/Dashboard/DocDashboard";
import Queue from "./DoctorModule/Pages/Queue/Queue";
import DocPatients from "./DoctorModule/Pages/Patients/Patient";
import PatientDetails from "./DoctorModule/Pages/Patients/PatientDetails";
import Doc_settings from "./DoctorModule/Pages/Settings/Doc_settings";
import FDLayout from "./FrontDeskModule/Components/Layout/FDLayout";
import FDDashboard from "./FrontDeskModule/Pages/Dashboard/FDDashboard";
import FDQueue from "./FrontDeskModule/Pages/Queue/Queue";
import FDPatients from "./FrontDeskModule/Pages/Patients/Patient";
import FDPatientDetails from "./FrontDeskModule/Pages/Patients/PatientDetails";
import FDCalendar from "./FrontDeskModule/Pages/Calendar/Calendar";
import FDClinics from "./FrontDeskModule/Pages/Settings/FDClinics";
import FDConsultation from "./FrontDeskModule/Pages/Settings/FDConsultation";
import FDStaffPermissions from "./FrontDeskModule/Pages/Settings/FDStaffPermissions";
import HospitalLayout from "./HospitalModule/Components/Layout/HospitalLayout";
import HDashboard from "./HospitalModule/Pages/Dashboard/HDashboard";
import HQueue from "./HospitalModule/Pages/Queue/Queue";
import HPatients from "./HospitalModule/Pages/Patients/Patient";
import HPatientDetails from "./HospitalModule/Pages/Patients/PatientDetails";
import HAccount from "./HospitalModule/Pages/Settings/HAccount";
import HCalendar from "./HospitalModule/Pages/Calendar/Calendar";
import HDoctors from "./HospitalModule/Pages/Doctors/Doctors";
import HTiming from "./HospitalModule/Pages/Settings/HTiming";
import HStaffPermissions from "./HospitalModule/Pages/Settings/HStaffPermissions";
import HRxTemplate from "./HospitalModule/Pages/Settings/HRxTemplate";
import HSubscriptions from "./HospitalModule/Pages/Settings/HSubscriptions";
import HSurgeries from "./HospitalModule/Pages/Settings/HSurgeries";
import HBranches from "./HospitalModule/Pages/Settings/HBranches";
import HSecurity from "./HospitalModule/Pages/Settings/HSecurity";
import HFDLayout from "./HospitalFDModule/Components/Layout/HFDLayout";
import HFDQueue from "./HospitalFDModule/Pages/Queue/Queue";
import HFDPatients from "./HospitalFDModule/Pages/Patients/Patient";
import HFDPatientDetails from "./HospitalFDModule/Pages/Patients/PatientDetails";
import HFDCalendar from "./HospitalFDModule/Pages/Calendar/Calendar";
import HFDClinics from "./HospitalFDModule/Pages/Settings/HFDClinics";
import HFDConsultation from "./HospitalFDModule/Pages/Settings/HFDConsultation";
import HFDStaffPermissions from "./HospitalFDModule/Pages/Settings/HFDStaffPermissions";

function App() {
  return (
    <Routes>
      <Route path="/" element={<DummyLogin/>} />

      {/* Admin panel routes */}
      <Route element={<Layout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="doctor" element={<Doctor />} />
        <Route path="doctor/:id" element={<DoctorDetailsPage />} />
  <Route path="hospitals" element={<Hospitals />} />
        <Route path="hospital/:id" element={<HospitalDetailsPage />} />
        <Route path="patients" element={<Patients />} />
        <Route path="settings" element={<Settings />} />

        {/* Registration flow with single routes */}
        <Route path="register/doctor" element={
          <RegistrationProvider>
            <Layout_registration_new />
          </RegistrationProvider>
        } />
        <Route path="register/hospital" element={
          <RegistrationProvider>
            <Layout_registration_new />
          </RegistrationProvider>
        } />
      </Route>

      <Route path="onboarding" element={<OnboardingFlow />} />

      {/* Doctor Portal */}
      <Route path="doc" element={<Doctor_layout />}>
        <Route index element={<DocDashboard />} />
        <Route path="queue" element={<Queue />} />
        <Route path="patients" element={<DocPatients />} />
        <Route path="patients/:id" element={<PatientDetails />} />
  {/* Settings subroutes */}
  <Route path="settings/account" element={<Doc_settings />} />
  <Route path="settings/consultation" element={<Doc_settings />} />
  <Route path="settings/clinics" element={<Doc_settings />} />
  <Route path="settings/staff-permissions" element={<Doc_settings />} />
  <Route path="settings/security" element={<Doc_settings />} />
  <Route path="settings/rx-template" element={<Doc_settings />} />
      </Route>

      {/* FrontDesk Portal (copy of Doctor Portal) */}
      <Route path="fd" element={<FDLayout />}>
        <Route index element={<Navigate to="queue" replace />} />
        <Route path="queue" element={<FDQueue />} />
  <Route path="calendar" element={<FDCalendar />} />
        <Route path="patients" element={<FDPatients />} />
        <Route path="patients/:id" element={<FDPatientDetails />} />
  {/* Settings */}
  <Route path="settings/clinics" element={<FDClinics />} />
  <Route path="settings/consultation" element={<FDConsultation />} />
  <Route path="settings/staff-permissions" element={<FDStaffPermissions />} />
      </Route>

      {/* Hospital Portal (copy of Doctor Portal) */}
      <Route path="hospital" element={<HospitalLayout />}>
        <Route index element={<HDashboard />} />
        <Route path="queue" element={<HQueue />} />
  <Route path="patients" element={<HPatients />} />
  <Route path="calendar" element={<HCalendar />} />
  <Route path="doctors" element={<HDoctors />} />
        <Route path="patients/:id" element={<HPatientDetails />} />
  <Route path="settings/account" element={<HAccount />} />
  <Route path="settings/timing" element={<HTiming />} />
  <Route path="settings/surgeries" element={<HSurgeries />} />
  <Route path="settings/branches" element={<HBranches />} />
  <Route path="settings/staff-permissions" element={<HStaffPermissions />} />
  <Route path="settings/security" element={<HSecurity />} />
  <Route path="settings/rx-template" element={<HRxTemplate />} />
  <Route path="settings/subscriptions-billing" element={<HSubscriptions />} />
      </Route>

      {/* Hospital FrontDesk Portal (copy of FD) */}
      <Route path="hfd" element={<HFDLayout />}>
        <Route index element={<Navigate to="queue" replace />} />
        <Route path="queue" element={<HFDQueue />} />
        <Route path="calendar" element={<HFDCalendar />} />
        <Route path="patients" element={<HFDPatients />} />
        <Route path="patients/:id" element={<HFDPatientDetails />} />
        {/* Settings */}
        <Route path="settings/clinics" element={<HFDClinics />} />
        <Route path="settings/consultation" element={<HFDConsultation />} />
        <Route path="settings/staff-permissions" element={<HFDStaffPermissions />} />
      </Route>

    </Routes>
  );
}

export default App;
