import SingleVendor from "./SingleVendor";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Vendors = () => {
  const [allVendors, setAllVendors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadVendors = () => {
    setIsLoading(true);
    axios.get(`https://letsprint-backend.onrender.com/users/type/Vendor`).then((res) => {
      setTimeout(() => {
        setAllVendors(res.data)
        setIsLoading(false);
      }, 500);
    });
  };
  
  useEffect(loadVendors, []);

  return (
    <div>
      <div className="columns m-3 is-centered">
        <nav
          className="box column is-7  breadcrumb has-succeeds-separator"
          aria-label="breadcrumbs"
        >
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li className="is-active">
              <Link to="/">Dashbaord</Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="columns m-1 is-centered">
        <div className="column is-3 box mt-3 m-2 hero is-primary">
          <div className="hero-body">
            <p className="title has-text-centered">Select Shop</p>
            <p className="subtitle"></p>
          </div>
        </div>
        <div className="column is-4">
          <div className="notification is-info">Available Shops</div>
          {isLoading ? (<div className=" box notification is-primary">
            <p>Searching for Shops...</p>
          </div>) : allVendors.length === 0 ? <div className="notification is-warning">No Shops Available</div> : allVendors.map((item, index) => {
            return <SingleVendor key={index} singleVendor={item} />;
          })}
        </div>
      </div>
    </div>
  );
};
export default Vendors;
