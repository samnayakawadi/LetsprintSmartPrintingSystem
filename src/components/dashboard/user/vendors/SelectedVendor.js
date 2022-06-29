import { useContext } from "react";
import { VendorContext } from "../../../contexts/VendorContext";

const SelectedVendor = () => {
  const { vendorDetails } = useContext(VendorContext);

  return (
    <div
      style={{ color: "black" }}
      className="box card has-text-black has-background-info-light"
    >
      <p className="box  has-text-centered title is-4">
        {vendorDetails.shopName}
      </p>
      <div className="box has-text-centered">
        <p className="title is-5">
          {vendorDetails.firstName} {vendorDetails.lastName}
        </p>
        <p className="subtitle is-6">@{vendorDetails.vendorname}</p>
        <p className="subtitle is-6">Address : {vendorDetails.address}</p>
        {/* <p className="subtitle is-6">Rate : ₹{vendorDetails.rate}/Page</p> */}
      </div>
      <div className="subtitle is-6 has-text-centered is-size-5 notification is-warning">
        ₹{vendorDetails.rate} Per Page
      </div>
    </div>
  );
};
export default SelectedVendor;
