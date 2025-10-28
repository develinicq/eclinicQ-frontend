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

function App() {
  return (
    <Routes>
      <Route path="/" element={<DummyLogin/>} />

      {/* Admin panel routes */}
      <Route element={<Layout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="doctor" element={<Doctor />} />
        <Route path="doctor/:id" element={<DoctorDetailsPage />} />
        <Route path="hospital" element={<Hospitals />} />
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
        <Route path="settings/account" element={<Doc_settings />} />
      </Route>

      {/* FrontDesk Portal (copy of Doctor Portal) */}
      <Route path="fd" element={<FDLayout />}>
        <Route index element={<Navigate to="queue" replace />} />
        <Route path="queue" element={<FDQueue />} />
        <Route path="patients" element={<FDPatients />} />
        <Route path="patients/:id" element={<FDPatientDetails />} />
        {/* settings/account could later mirror doctor settings if needed */}
      </Route>

    </Routes>
  );
}

export default App;
