import { Route, Routes } from "react-router-dom";
import HomeRouter from "./components/routes/HomeRouter";
import DashboardRouter from "./components/routes/DashboardRouter";
import Footer from "./components/bars/Footers/Footer";
import { useState } from "react";
import { UserContext } from "./components/contexts/UserContext";
import Navbar from "./components/redirects/ToNavbar";

export default function App() {
  const [userDetails, setUserDetails] = useState({
    username : "",
    password : "",
    status: false,
    wallet: 0
  });

  return (
    <UserContext.Provider value={{ userDetails, setUserDetails }}>
      <Navbar />
      <Routes>
        <Route path="/*" element={<HomeRouter />} />
        <Route path="/dashboard/*" element={<DashboardRouter />} />
      </Routes>
      <Footer />
    </UserContext.Provider>
  );
}
