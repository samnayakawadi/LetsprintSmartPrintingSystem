import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../contexts/UserContext";

const Orders = () => {
  const { userDetails } = useContext(UserContext);
  const [empty, setEmpty] = useState(false);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [alert, setAlert] = useState({ status: false });
  const [error, setError] = useState(false);

  const fetchAPI = () => {
    axios
      .get(
        `https://letsprint-backend.onrender.com/orders/sender/${userDetails.username}`
      )
      .then((res) => {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);

        if (res.data.length === 0) {
          setEmpty(true);
          console.log(res.data);
        } else {
          setEmpty(false);
          setOrders(res.data);
          console.log(res.data);
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

  return (
    <div className="columns m-1 is-centered">
      <section className="box mt-3 m-2  hero is-primary">
        <div className="hero-body has-text-centered">
          <p className="title ">Orders</p>
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
                You Have Not Ordered Anything Yet!
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
                All Placed Orders
              </div>
              <div className="box has-background-info-light table-container">
                <table className="table is-hoverable is-fullwidth has-text-centered">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Shop Name</th>
                      <th>Rate</th>
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
                            <td>{item.shopName}</td>
                            <td>₹{(item.amount / item.pages).toFixed(2)}</td>
                            <td>{item.pages}</td>
                            <td>₹{item.amount.toFixed(2)}</td>
                            <td>{item.date}</td>
                            <td>
                              {item.fileName}
                              <a href={item.fileUrl}>{" "}&#10515;</a>
                            </td>
                            <td>{item.status}</td>
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
