import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout_sidebar";
import Layout from "./components/Layouts/Layout_sidebar";
import Dashboard from "./pages/Layout_sidebar/Dashboard";
import Doctor from "./pages/Layout_sidebar/Doctor";
import Hospitals from "./pages/Layout_sidebar/Hospitals";
import Patients from "./pages/Layout_sidebar/Patients";
import Settings from "./pages/Layout_sidebar/Settings";
import GetStarted from "./pages/GetStarted";
import Layout_registration from "./components/Layout_registration";
import Step1 from "./pages/Doctor_registration/Step1";
import Step2 from "./pages/Doctor_registration/Step2";
import Step3 from "./pages/Doctor_registration/Step3";
import Step4 from "./pages/Doctor_registration/Step4";
import Step5 from "./pages/Doctor_registration/Step5";
import Hos_1 from "./pages/Hospital_registration/Hos_1";
import Hos_2 from "./pages/Hospital_registration/Hos_2";
import Hos_3 from "./pages/Hospital_registration/Hos_3";
import Layout_registration_new from "./components/Layouts/Layout_registration_new";
import MainPage from "./pages/DoctorList/DoctorInfo/MainPage";
import MainPageHos from "./pages/HospitalList/HospitalInfo/MainPageHos";
import { RegistrationProvider } from "./context/RegistrationContext";
import DummyLogin from "./pages/DummyLogin";

function App() {
  return (
    <Routes>
      {/* Landing page */}

      <Route path="/" element={<GetStarted />} />

      {/* <Route path="/" element={<GetStarted />} /> */}
      <Route path="/" element={<DummyLogin />} />

      {/* Admin panel routes */}
      <Route element={<Layout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="doctor" element={<Doctor />} />
        <Route path="hospital" element={<Hospitals />} />
        <Route path="patients" element={<Patients />} />
        <Route path="settings" element={<Settings />} />

        {/* Registration flow nested under Layout */}
        <Route path="register" element={<Layout_registration />}>
          <Route path="account" element={<Step1 />} />
          <Route path="account1" element={<Step2 />} />
          <Route path="account2" element={<Step3 />} />
          <Route path="account3" element={<Step4 />} />
          <Route path="account4" element={<Step5 />} />

          <Route path="hospital" element={<Hos_1 />} />
          <Route path="hospital1" element={<Hos_2 />} />
          <Route path="hospital2" element={<Hos_3 />} />
          <Route path="hospital3" element={<Step4 />} />
          <Route path="hospital4" element={<Step5 />} />


        </Route>
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
    </Routes>
  );
}

export default App;
