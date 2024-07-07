import { Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/LoginPage/LoginPage";
import HomePage from './Pages/HomePage/Homepage';
import LoginWithFaceId from './Pages/LoginPage/LoginFaceId';
import RestrictedAccessPage from "./Pages/RestrictedAccessPage/RestrictedAccessPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/faceid" element={<LoginWithFaceId />} />
      <Route path="/faceid" element={<LoginWithFaceId />} />
      <Route path="/restricted-access" element={<RestrictedAccessPage />} />
    </Routes>
  );
};

export default App;
