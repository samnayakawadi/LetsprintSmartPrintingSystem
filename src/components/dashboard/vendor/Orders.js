import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import emailjs from "emailjs-com"

const Orders = () => {
  const { userDetails } = useContext(UserContext);
  const [empty, setEmpty] = useState(false);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [alert, setAlert] = useState({ status: false });
  const [error, setError] = useState(false);
  const [clicked, setClicked] = useState({ id: null, status: false });

  const fetchAPI = () => {
    axios
      .get(
        `https://letsprint-backend.onrender.com/orders/reciever/${userDetails.username}`
      )
      .then((res) => {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);

        if (res.data.length === 0) {
          setEmpty(true);
        } else {
          setEmpty(false);
          setOrders(res.data);
        }
      })
      .catch(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
        setEmpty(true);
        setError(true);
        setAlert({ status: true, type: "danger", msg: "Server Error" });
      });
  };

  useEffect(() => {
    fetchAPI();

    const interval = setInterval(() => {
      fetchAPI();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const onClickHandler = (id, amount, sender) => {
    setClicked({ id: id, status: true });
    setAlert({ status: true, msg: "Updating Status", type: "primary" });
    setTimeout(() => {
      axios
        .get(
          `https://letsprint-backend.onrender.com/users/username/${userDetails.username}`
        )
        .then((userResponse) => {
          axios
            .put(
              `https://letsprint-backend.onrender.com/users/username/${userDetails.username
              }/wallet/${userResponse.data.wallet + amount}`
            )
            .then((walletResponse) => {
              if (walletResponse.data.status === true) {
                axios
                  .put(
                    `https://letsprint-backend.onrender.com/orders/${id}/status/Completed`
                  )
                  .then((res) => {
                    if (res.data.status === true) {
                      setAlert({
                        status: true,
                        msg: "Status Updated Successfully",
                        type: "success"
                      });

                      //send email to customer (sender)

                      axios
                        .get(
                          `https://letsprint-backend.onrender.com/users/username/${sender}`
                        ).then(res=>{
                          const templateParameters = {
                            username: sender,
                            vendorname: userDetails.username,
                            id: id,
                            amount: amount,
                            sendto:res.data.email
                          }
                          emailjs.send("service_l4ng7si", "template_r6mpcil", templateParameters, "YutABetRpmwl-W5nQ").then(mailres=>{
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

                    } else {
                      axios.put(
                        `https://letsprint-backend.onrender.com/users/username/${userDetails.username
                        }/wallet/${userResponse.data.wallet - amount}`
                      );
                      setAlert({
                        status: true,
                        msg: "Status Updation Failed",
                        type: "danger"
                      });
                    }
                  })
                  .catch(() => {
                    setAlert({
                      status: true,
                      msg: "Server Error (Status API Failed)",
                      type: "danger"
                    });
                  });
              } else {
                setAlert({
                  status: true,
                  msg: "Server Error (Wallet API Failed)",
                  type: "danger"
                });
              }
            });
        })
        .catch(() => {
          setAlert({
            status: true,
            msg: "Server Error (User Data API Failed)",
            type: "danger"
          });
        });
    }, 1000);
    setTimeout(() => {
      setAlert({ status: false });
    }, 5000);
  };

  return (
    <div className="columns m-1 is-centered">
      <section className="box mt-3 m-2  hero is-primary">
        <div className="hero-body has-text-centered">
          <p className="title ">Vendor</p>
        </div>
      </section>

      {isLoading && (
        <div className="column is-5">
          <p className={`has-text-centered notification is-success`}>
            Loading...Please Wait!
          </p>
        </div>
      )}

      {!isLoading && (
        <div className={`column is-${empty ? 5 : 9}`}>
          {empty && !error && (
            <div>
              <p className={`has-text-centered notification is-info`}>
                You Have No Orders Yet!
              </p>
            </div>
          )}

          {alert.status && (
            <div>
              <p className={` has-text-centered notification is-${alert.type}`}>
                {alert.msg}
              </p>
            </div>
          )}

          {!empty && (
            <div>
              <div className="my-2 notification is-info is-size-4 has-text-centered">
                All Recieved Orders
              </div>
              <div className="box has-background-info-light table-container">
                <table className="table is-hoverable is-fullwidth has-text-centered">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Username</th>
                      <th>Pages</th>
                      <th>Amount</th>
                      <th>Date</th>
                      <th>FileName</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders
                      .slice(0)
                      .reverse()
                      .map((item) => {
                        return (
                          <tr>
                            <td>{item.id}</td>
                            <td>{item.sender}</td>
                            <td>{item.pages}</td>
                            <td>₹{item.amount.toFixed(2)}</td>
                            <td>{item.date}</td>
                            <td>
                              {item.fileName}
                              <a href={item.fileUrl}>{" "}&#10515;</a>
                            </td>
                            <td>
                              {item.status === "Completed" ? (
                                "Completed"
                              ) : clicked.id === item.id && clicked.status ? (
                                "Wait..."
                              ) : (
                                <button
                                  onClick={() => {
                                    onClickHandler(item.id, item.amount, item.sender);
                                  }}
                                  className="button"
                                >
                                  Mark Done
                                </button>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default Orders;
