import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../img/logo.png";
import { UserContext } from "../../contexts/UserContext";
import { useContext } from "react";

export default function AdminDashboard() {
  const { userDetails, setUserDetails } = useContext(UserContext);
  const [isActive, setisActive] = useState(false);

  return (
    <div>
      <nav
        style={{
          position: "fixed",
          top: 0,
          width: "100%"
        }}
        className="box navbar"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <div href="/" className="mt-2 navbar-item">
            <Link to="/">
              <img src={logo} alt="Logo" height="50" />
            </Link>
          </div>

          <div
            onClick={() => {
              setisActive(!isActive);
            }}
            type="button"
            className={`navbar-burger burger ${isActive ? "is-active" : ""}`}
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </div>
        </div>

        <div
          onClick={() => {
            setisActive(!isActive);
          }}
          id="navbarBasicExample"
          className={`navbar-menu ${isActive ? "is-active" : ""}`}
        >
          <div className="navbar-end">
            <div>
              <div className="navbar-start mt-4">
                <Link to="/">
                  <p className="navbar-item ">Home</p>
                </Link>
                <Link to="/dashboard/admin">
                  <p className="navbar-item">Dashboard</p>
                </Link>
                <div className="navbar-item has-dropdown is-hoverable">
                  <p className="navbar-link">Hi {userDetails.firstName}</p>
                  <div className="navbar-dropdown">
                    <Link to="/dashboard/profile">
                      <p className="navbar-item">My Profile</p>
                    </Link>
                    <Link to="/dashboard/wallet">
                      <p className="navbar-item">My Wallet</p>
                    </Link>
                    {/* <Link to="/dashboard/orders">
                      <p className="navbar-item">My Orders</p>
                    </Link> */}
                    <hr className="navbar-divider" />
                    <Link to="/login">
                      <p
                        className="navbar-item"
                        onClick={() => {
                          setUserDetails({ ...userDetails, status: false });
                        }}
                      >
                        Logout
                      </p>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div
        style={{
          marginBottom: "120px"
        }}
      ></div>
    </div>
  );
}
