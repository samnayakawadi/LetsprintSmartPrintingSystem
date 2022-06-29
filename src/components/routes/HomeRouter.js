import Home from "../home/Home";
import Login from "../auth/Login";
import { Route, Routes } from "react-router-dom";
import Register from "../auth/Register";
import ToDashboard from "../redirects/ToDashboard";

const HomeRouter = () => {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/" element={<ToDashboard />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  );
};

export default HomeRouter;
