import { Link, useNavigate } from "react-router-dom";
import SelectedVendor from "../vendors/SelectedVendor";
import { useState, useContext } from "react";
// import { VendorContext } from "../../contexts/VendorContext";
// import { OrderContext } from "../../contexts/OrderContext";
import { UserContext } from "../../../contexts/UserContext";
import { OrderContext } from "../../../contexts/OrderContext";
import { VendorContext } from "../../../contexts/VendorContext";
import axios from "axios";
import emailjs from "emailjs-com"

const Proceed = () => {
  
  const { userDetails} = useContext(UserContext);
  const { vendorDetails } = useContext(VendorContext);
  const { orderDetails, setOrderDetails } = useContext(OrderContext)
  
  const [alert, setAlert] = useState({ status: false })
  const [amount] = useState(orderDetails.pages * vendorDetails.rate);
  const [confirmed, setConfirmed] = useState(false);

  const navigate = useNavigate();

  const orderHandler =  () => {
    setTimeout(() => {
      axios.get(`https://letsprint-backend.onrender.com/users/username/${userDetails.username}`).then(userResponse => {
        if (userResponse.data.wallet >= amount) {
          console.log("Printing Order Details : ")
          console.log(orderDetails)
          axios.post(`https://letsprint-backend.onrender.com/orders`, orderDetails).then(orderResponse => {
            if (orderResponse.data.status === true) {
              axios.put(`https://letsprint-backend.onrender.com/users/username/${userDetails.username}/wallet/${userResponse.data.wallet - amount}`).then(walletResponse => {
                if (walletResponse.data.status === true) {
                  setOrderDetails(prevState => {
                    return { ...prevState, confirmedId: orderResponse.data.id }
                  });
                  
                  //send email to vendor 

                  axios
                  .get(
                    `https://letsprint-backend.onrender.com/users/username/${orderDetails.reciever}`
                  ).then(res=>{
                    const templateParameters = {
                      username: orderDetails.sender,
                      vendorname: orderDetails.reciever,
                      id: orderResponse.data.id,
                      amount: orderDetails.amount,
                      sendto:res.data.email
                    }
                    emailjs.send("service_l4ng7si", "template_e623wob", templateParameters, "YutABetRpmwl-W5nQ").then(mailres=>{
                      console.log(mailres);
                      setAlert({
                        status: true,
                        msg: `Email Sent to ${res.data.email}`,
                        type: "success"
                      });
                    }, (mailerr)=>{
                      console.log(mailerr)
                      setAlert({
                        status: true,
                        msg: `Failed Email to ${res.data.email}`,
                        type: "danger"
                      });
                    })
                  })

                  setTimeout(() => {
                    navigate("/dashboard/order")
                  }, 1500)
                }
                else {
                  axios.delete(`https://letsprint-backend.onrender.com/orders/${orderResponse.data.id}`)
                  setAlert({ status: true, type: "danger", msg: `Order Could Not be Placed (Wallet API Failed)` })
                  setConfirmed(false)
                }
              }).catch(() => {
                setAlert({ status: true, type: "danger", msg: "Order Delete API Failed" })
                setConfirmed(false)
              })
            }
            else {
              setAlert({ status: true, type: "danger", msg: "Order Could Not be Placed (Order API Failed)" })
              setConfirmed(false)
            }
          }).catch(() => {
            setAlert({ status: true, type: "danger", msg: "Cannot Connect to Server. (Order POST API Failed)" })
            setConfirmed(false)
          })
        }
        else {
          setAlert({ status: true, type: "warning", msg: `Wallet Balance is Low (Rs.${userResponse.data.wallet})` })
          setConfirmed(false)
        }
      }).catch(() => {
        setAlert({ status: true, type: "danger", msg: "GET User Response API Failed!" })
        setConfirmed(false)
      })
    }, 1000)
  }

  const onSubmitHandler = () => {
    setAlert({ status: true, type: "success", msg: "Processing...Please Wait!" })
    setConfirmed(true);
    orderHandler();
  };
  return (
    <div>
      <div className="columns m-3 is-centered">
        <nav
          className="box column is-7  breadcrumb has-succeeds-separator"
          aria-label="breadcrumbs"
        >
          <ul>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/dashboard/upload">Upload</Link>
            </li>
            <li className="is-active">
              <Link to="/">Summary</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="columns m-2 is-centered">
        <div className="column box m-1 has-background-primary  is-one-quarter">
          <p className="title has-text-centered has-text-white ">
            All Done
          </p>
          <div className="box">
            <p className="title is-6">File Name : {orderDetails.fileName}</p>
          </div>
          <SelectedVendor />
        </div>
        <div className="column is-one-third">
          <div className="notification is-info has-text-centered">
            Order Summary
          </div>

          <div className="box has-background-info-light">
            <table className="table is-fullwidth is-hoverable">
              <tbody>
                <tr>
                  <td>
                    <p className=" is-6">Rate</p>
                  </td>
                  <td>
                    <p className=" is-6">₹{vendorDetails.rate}/Page</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p className=" is-6">Pages</p>
                  </td>
                  <td>
                    <p className=" is-6">{orderDetails.pages}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p className=" is-6">
                      <strong>Total</strong>
                    </p>
                  </td>
                  <td>
                    <p className=" is-6">
                      <strong>₹{amount.toFixed(2)}</strong>
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {alert.status && <div>
            <p className={`my-4 has-text-centered notification is-${alert.type}`}>{alert.msg}</p>
          </div>}

          {!confirmed && <div>
            <button
              onClick={onSubmitHandler}
              className="button is-success is-fullwidth"
            >
              Confirm Order
            </button>
          </div>}
        </div>
      </div>
    </div>
  );
};
export default Proceed;
