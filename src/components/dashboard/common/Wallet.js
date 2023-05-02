import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import logo from "../../bars/img/logo.png"
const Wallet = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { userDetails } = useContext(UserContext);
  const [balance, setBalance] = useState(userDetails.wallet);
  const [sendMoneyDetails, setSendMoneyDetails] = useState({
    username: "",
    amount: ""
  });
  const [alert, setAlert] = useState({ status: false });
  const [moneySent, setMoneySent] = useState([]);
  const [moneyRecieved, setMoneyRecieved] = useState([]);
  const [loadMoney, setLoadMoney] = useState("");
  const [loadMoneyAlert, setLoadMoneyAlert] = useState({ status: false });

  const fetchAPI = () => {
    axios
      .get(
        `https://letsprint-backend.onrender.com/users/username/${userDetails.username}`
      )
      .then((res) => {
        setBalance(res.data.wallet);
      });
    axios
      .get(
        `https://letsprint-backend.onrender.com/wallets/sender/${userDetails.username}`
      )
      .then((res) => {
        setMoneySent(res.data);
      });
    axios
      .get(
        `https://letsprint-backend.onrender.com/wallets/reciever/${userDetails.username}`
      )
      .then((res) => {
        setMoneyRecieved(res.data);
      });
  };

  useEffect(() => {
    fetchAPI();

    const interval = setInterval(() => {
      fetchAPI();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const transactionHandler = (reciever, amount) => {
    setTimeout(() => {
      // console.log("Inside Transactions Handler");
      const data = {
        sender: userDetails.username,
        reciever: reciever,
        amount: amount
      };
      console.log(data);
      axios
        .post(`https://letsprint-backend.onrender.com/wallets`, data)
        .then(() => {
          console.log("I am inside Then");
          setAlert({
            status: true,
            type: "success",
            msg: "Transaction Added Successfully"
          });
        })
        .catch(() => {
          setAlert({
            status: true,
            type: "danger",
            msg: "Server Error (Transaction Handler)"
          });
        });
    }, 1600);
  };

  const addMoneyHandler = () => {
    setLoadMoneyAlert({ status: true, type: "primary", msg: "Processing" });
    setTimeout(() => {
      axios
        .get(
          `https://letsprint-backend.onrender.com/users/username/${userDetails.username}`
        )
        .then((res) => {
          axios
            .put(
              `https://letsprint-backend.onrender.com/users/username/${userDetails.username
              }/wallet/${parseFloat(res.data.wallet) + parseFloat(loadMoney)}`
            )
            .then((walletResponse) => {
              if (walletResponse.data.status) {
                setLoadMoneyAlert({
                  status: true,
                  type: "success",
                  msg: "Money Added"
                });
              }
            })
            .catch(() => {
              setLoadMoneyAlert({
                status: true,
                type: "danger",
                msg: "Server Error"
              });
            });
        })
        .catch(() => {
          setLoadMoneyAlert({
            status: true,
            type: "danger",
            msg: "Server Error"
          });
        });
    }, 1000);
  };

  const onChangeHandler = (events) => {
    setSendMoneyDetails((prevState) => {
      return { ...prevState, [events.target.name]: events.target.value };
    });
  };

  const onClickHandler = () => {
    setAlert({ status: true, type: "primary", msg: "Processing..." });
    setTimeout(() => {
      if (
        sendMoneyDetails.username.trim() === "" ||
        sendMoneyDetails.amount === ""
      ) {
        setAlert({
          status: true,
          type: "warning",
          msg: "Fields cannot be empty"
        });
      } else if (userDetails.username === sendMoneyDetails.username) {
        setAlert({
          status: true,
          type: "warning",
          msg: "Cannot Transfter to Self"
        });
      } else {
        if (sendMoneyDetails.amount > 0) {
          axios
            .get(
              `https://letsprint-backend.onrender.com/users/username/${sendMoneyDetails.username}`
            )
            .then((newUserResponse) => {
              if (newUserResponse.data.username === sendMoneyDetails.username) {
                axios
                  .get(
                    `https://letsprint-backend.onrender.com/users/username/${userDetails.username}`
                  )
                  .then((userResponse) => {
                    if (userResponse.data.wallet >= sendMoneyDetails.amount) {
                      axios
                        .put(
                          `https://letsprint-backend.onrender.com/users/username/${userDetails.username
                          }/wallet/${parseInt(userResponse.data.wallet) -
                          parseInt(sendMoneyDetails.amount)
                          }`
                        )
                        .then((walletResponse) => {
                          if (walletResponse.data.status === true) {
                            axios
                              .put(
                                `https://letsprint-backend.onrender.com/users/username/${sendMoneyDetails.username
                                }/wallet/${parseInt(newUserResponse.data.wallet) +
                                parseInt(sendMoneyDetails.amount)
                                }`
                              )
                              .then((newWalletResponse) => {
                                if (newWalletResponse.data.status === true) {
                                  transactionHandler(
                                    sendMoneyDetails.username,
                                    sendMoneyDetails.amount
                                  );
                                  setAlert({
                                    status: true,
                                    type: "success",
                                    msg: "Money Sent Successfully"
                                  });
                                }
                              })
                              .catch(() => {
                                setAlert({
                                  status: true,
                                  type: "error",
                                  msg: "Server Error (4)"
                                });
                              });
                          }
                        })
                        .catch(() => {
                          setAlert({
                            status: true,
                            type: "error",
                            msg: "Server Error (3)"
                          });
                        });
                    } else {
                      setAlert({
                        status: true,
                        type: "warning",
                        msg: `Your Balance is Low (₹${userResponse.data.wallet})`
                      });
                    }
                  })
                  .catch(() => {
                    setAlert({
                      status: true,
                      type: "error",
                      msg: "Server Error (2)"
                    });
                  });
              } else {
                setAlert({
                  status: true,
                  type: "warning",
                  msg: "User Doesn't Exists"
                });
              }
            })
            .catch(() => {
              setAlert({
                status: true,
                type: "error",
                msg: "Server Error (1)"
              });
            });
        } else {
          setAlert({
            status: true,
            type: "warning",
            msg: "Amount must be greater than Zero"
          });
        }
      }
    }, 1000);
  };

  const [onlineMoney, setOnlineMoney] = useState({ amount: "" });
  const [onlineMoneyAlert, setOnlineMoneyAlert] = useState({ status: false });

  const addWalletTransaction = (orderId, amount) => {
    setTimeout(() => {
      const data = {
        sender: `Razorpay`,
        reciever: userDetails.username,
        amount: amount
      };
      console.log(data);
      axios
        .post(`https://letsprint-backend.onrender.com/wallets`, data)
        .then(() => {
          console.log("I am inside Then");
          setOnlineMoneyAlert({
            status: true,
            type: "success",
            msg: "Transaction Added Successfully"
          });
        })
        .catch(() => {
          setOnlineMoneyAlert({
            status: true,
            type: "danger",
            msg: "Server Error (Transaction Handler)"
          });
        });
    }, 1600);
  }

  const addOnlineMoney = (amount) => {
    setOnlineMoneyAlert({ status: true, type: "primary", msg: "Processing" });
    setTimeout(() => {
      axios
        .get(
          `https://letsprint-backend.onrender.com/users/username/${userDetails.username}`
        )
        .then((res) => {
          axios
            .put(
              `https://letsprint-backend.onrender.com/users/username/${userDetails.username
              }/wallet/${parseFloat(res.data.wallet) + parseFloat(amount)}`
            )
            .then((walletResponse) => {
              if (walletResponse.data.status) {
                setOnlineMoneyAlert({
                  status: true,
                  type: "success",
                  msg: "Money Added"
                });
              }
            })
            .catch(() => {
              setOnlineMoneyAlert({
                status: true,
                type: "danger",
                msg: "Server Error"
              });
            });
        })
        .catch(() => {
          setOnlineMoneyAlert({
            status: true,
            type: "danger",
            msg: "Server Error"
          });
        });
    }, 1000);
  };

  const onlineMoneyHandler = (events) => {
    setOnlineMoney(prevState => {
      return { ...prevState, amount: events.target.value }
    })
  }

  const onlineMoneySubmitHandler = (events) => {
    setOnlineMoneyAlert({ status: true, type: "primary", msg: "Processing" });
    setTimeout(() => {
      if (onlineMoney.amount.trim() === "") {
        setOnlineMoneyAlert({ status: true, type: "warning", msg: "Amount Cannot be Empty" });    
      }
      else {
        axios.post(`https://letsprint-backend.onrender.com/wallets/createorder`, onlineMoney).then(res => {
          if (res.data.status === "created") {
            var options = {
              "key": "rzp_test_H5PcFQfQ2QkpKw", 
              "amount": res.data.amount, 
              "currency": "INR",
              "name": "Letsprint Inc",
              "description": "Adding Money to Wallet",
              "image": logo,
              "order_id": res.data.id, 
              "handler": function (response) {
                console.log(response);
                setOnlineMoneyAlert({ status: true, type: "primary", msg: "Payment Successfull" });
                addOnlineMoney(res.data.amount / 100);
                addWalletTransaction(response.razorpay_order_id, res.data.amount / 100);
              },
              "prefill": {
                "name": "",
                "email": "",
                "contact": ""
              },
              "notes": {
                "address": "A/P Pimpalgaon Khurd"
              },
              "theme": {
                "color": "#3399cc"
              }
            };
            const rzp1 = new window.Razorpay(options);
            rzp1.on('payment.failed', function (response) {
              setOnlineMoneyAlert({ status: true, type: "danger", msg: "Payment Failed" });
            });
            rzp1.open();
            events.preventDefault();
          }
        }).catch(()=>{
          setOnlineMoneyAlert({ status: true, type: "danger", msg: "Server Error" });
        })
      }
    }, 1000);
  }

  return (
    <div className="columns m-1 is-centered">
      <section className="box mt-3 m-2  hero is-primary">
        <div className="hero-body has-text-centered">
          <p className="title ">Wallet</p>
        </div>
      </section>

      <div className="column is-4">
        <div className="box has-background-info-light">
          <table className="table is-hoverable is-fullwidth">
            <tbody>
              <tr>
                <td>Available Balance </td>
                <td>₹{balance.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="box has-background-info-light">
          <div className="notification is-primary has-text-centered is-size-4">
            Add Money
          </div>
          <div className="field">
            <label className="label">Enter Amount</label>
            <div className="control">
              <input
                name="amount"
                onChange={onlineMoneyHandler}
                className="input"
                type="number"
                placeholder="Enter Amount"
              />
            </div>
            {onlineMoneyAlert.status && (
              <div>
                <p
                  className={`my-4 has-text-centered notification is-${onlineMoneyAlert.type}`}
                >
                  {onlineMoneyAlert.msg}
                </p>
              </div>
            )}
            <div className="mt-3 control">
              <button
                onClick={onlineMoneySubmitHandler}
                className="button is-success is-fullwidth"
              >
                Proceed
              </button>
            </div>
          </div>
        </div>

        {userDetails.type === "Admin" && (
          <div className="box has-background-info-light">
            <div className="notification is-primary has-text-centered is-size-4">
              Load Money (Offline)
            </div>
            <div className="field">
              {/* <label className="label">Add Money</label> */}
              <div className="control">
                <input
                  onChange={(event) => {
                    setLoadMoney(event.target.value);
                  }}
                  name="username"
                  value={loadMoney}
                  className="input"
                  type="number"
                  placeholder="Enter Amount"
                />
              </div>
            </div>
            {loadMoneyAlert.status && (
              <div>
                <p
                  className={`my-4 has-text-centered notification is-${loadMoneyAlert.type}`}
                >
                  {loadMoneyAlert.msg}
                </p>
              </div>
            )}
            <button
              onClick={addMoneyHandler}
              className="button is-success is-fullwidth "
            >
              Add Money
            </button>
          </div>
        )}

        <div className="box has-background-info-light">
          <div className="notification is-primary has-text-centered is-size-4">
            Send Money
          </div>
          <div className="field">
            <label className="label">Enter Username</label>
            <div className="control">
              <input
                name="username"
                onChange={onChangeHandler}
                className="input"
                type="text"
                placeholder="Enter Username"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Enter Amount</label>
            <div className="control">
              <input
                name="amount"
                onChange={onChangeHandler}
                className="input"
                type="number"
                placeholder="Enter Amount"
              />
            </div>
            {alert.status && (
              <div>
                <p
                  className={`my-4 has-text-centered notification is-${alert.type}`}
                >
                  {alert.msg}
                </p>
              </div>
            )}
            <div className="mt-3 control">
              <button
                onClick={onClickHandler}
                className="button is-success is-fullwidth"
              >
                Proceed
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="column is-4">
        <div className="box has-background-info has-text-white is-info has-text-centered is-size-4">
          Transactions
        </div>
        {moneySent.length === 0 && moneyRecieved.length === 0 ? (
          <div className="box has-background-link has-text-white has-text-centered">
            No Transactions
          </div>
        ) : (
          <div className="box">
            <table className="table is-hoverable is-fullwidth has-text-centered">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Description</th>
                  <th>Amt</th>
                </tr>
              </thead>
              <tbody>
                {moneySent
                  .concat(moneyRecieved)
                  .sort((a, b) => {
                    return b.id - a.id;
                  })
                  .map((item) => {
                    return (
                      <>
                        {item.sender === userDetails.username && (
                          <tr>
                            <td>{item.id}</td>
                            <td>to {item.reciever}</td>
                            <td>-{item.amount}</td>
                          </tr>
                        )}
                        {item.reciever === userDetails.username && (
                          <tr>
                            <td>{item.id}</td>
                            <td>from {item.sender}</td>
                            <td>+{item.amount}</td>
                          </tr>
                        )}
                      </>
                    );
                  })}
              </tbody>
            </table>
          </div>
        )}
        {/* {moneySent.length !== 0 || moneyRecieved.length !== 0 &&
          } */}
      </div>
    </div>
  );
};
export default Wallet;
