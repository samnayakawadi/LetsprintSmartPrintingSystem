import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { VendorContext } from "../../../contexts/VendorContext";
import { UserContext } from "../../../contexts/UserContext";
import { OrderContext } from "../../../contexts/OrderContext";

const SingleVendor = ({ singleVendor }) => {
  const { setVendorDetails } = useContext(VendorContext);
  const { userDetails } = useContext(UserContext)
  const { setOrderDetails } = useContext(OrderContext)

  const navigate = useNavigate();
  const onClickHandler = () => {
    setVendorDetails((prevState) => {
      return {
        ...prevState,
        selected: true,
        shopName: singleVendor.shopName,
        vendorname: singleVendor.username,
        firstName: singleVendor.firstName,
        lastName: singleVendor.lastName,
        address: singleVendor.address,
        rate: singleVendor.rate
      };
    });

    setOrderDetails(prevState=>{
      return {...prevState, sender: userDetails.username, reciever:singleVendor.username, shopName: singleVendor.shopName}
    })
    navigate("upload");
  };
  return (
    <div className="box  card has-background-info-light">
      <p className="box  has-text-centered title is-4">
        {singleVendor.shopName}
      </p>
      <div className="box has-text-centered">
        <p className="title  is-5">
          {singleVendor.firstName} {singleVendor.lastName}
        </p>
        <p className="subtitle is-6">@{singleVendor.username}</p>
        <p className="subtitle is-6">{singleVendor.address}</p>
        </div>
        <div className="subtitle is-6 has-text-centered is-size-5 notification is-warning">₹{singleVendor.rate} Per Page</div>
      
      <button
        onClick={onClickHandler}
        className="button is-success is-fullwidth"
      >
        Select This Shop
      </button>
    </div>
  );
};

export default SingleVendor;
