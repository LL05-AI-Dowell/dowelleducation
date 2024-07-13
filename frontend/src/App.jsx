import { Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/LoginPage/LoginPage";
import HomePage from './Pages/HomePage/Homepage';
// import LoginWithFaceId from './Pages/LoginPage/LoginFaceId';
import RestrictedAccessPage from "./Pages/RestrictedAccessPage/RestrictedAccessPage";
import DashboardPage from "./Pages/Dashboard/Dashboard";

const App = () => {
  return (
    <Routes>
      <Route path="/dowelleducation/" element={<LoginPage />} />
      <Route path="/dowelleducation/home" element={<HomePage />} />
      {/* <Route path="/dowelleducation/faceid" element={<LoginWithFaceId />} /> */}
      <Route path="/dowelleducation/restricted-access" element={<RestrictedAccessPage />} />
      <Route path="/dowelleducation/dashboard" element={<DashboardPage />} />
    </Routes>
  );
};



export default App;