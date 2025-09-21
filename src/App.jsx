import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layouts/Layout_sidebar";
import Dashboard from "./pages/Layout_sidebar/Dashboard";
import Doctor from "./pages/Layout_sidebar/Doctor";
import Hospitals from "./pages/Layout_sidebar/Hospitals";
import Patients from "./pages/Layout_sidebar/Patients";
import Settings from "./pages/Layout_sidebar/Settings";
import Layout_registration_new from "./components/Layouts/Layout_registration_new";
import MainPage from "./pages/DoctorList/DoctorInfo/MainPage";
import MainPageHos from "./pages/HospitalList/HospitalInfo/MainPageHos";
import { RegistrationProvider } from "./context/RegistrationContext";
import DummyLogin from "./pages/DummyLogin";
import GetStarted from "./pages/GetStarted";
import OnboardingFlow from "./DoctorModule/Pages/Login/OnboardingFlow";
import Doctor_layout from "./DoctorModule/Components/Layout/DoctorLayout";
import DocDashboard from "./DoctorModule/Pages/Dashboard/DocDashboard";
import Queue from "./DoctorModule/Pages/Queue/Queue";

function App() {
  return (
    <Routes>
      <Route path="/" element={<DummyLogin/>} />

      {/* Admin panel routes */}
      <Route element={<Layout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="doctor" element={<Doctor />} />
        <Route path="hospital" element={<Hospitals />} />
        <Route path="patients" element={<Patients />} />
        <Route path="settings" element={<Settings />} />

        <Route path="doctor1" element={<MainPage/>} />
        <Route path="hos1" element={<MainPageHos/>} />

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

  {/* Single onboarding route managing internal steps without URL changes */}
      <Route path="onboarding" element={<OnboardingFlow />} />

      {/* Doctor Portal */}
      <Route path="doc" element={<Doctor_layout />}>
        {/* default doctor dashboard */}
        <Route index element={<DocDashboard />} />
        <Route path="queue" element={<Queue />} />
        {/* future doctor-specific routes can be nested here, e.g., patients, settings */}
      </Route>

    </Routes>
  );
}

export default App;
