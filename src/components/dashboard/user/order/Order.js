import gif from "./confirmed.gif";
import { OrderContext } from "../../../contexts/OrderContext";
import { useContext } from "react";

const Order = () => {

  const {orderDetails} = useContext(OrderContext)

  return (
    <div className="columns is-centered">
      <div className="column is-half">
        <img
          style={{
            display: "block",
            marginLeft: "auto",
            marginRight: "auto"
          }}
          className="is-centered"
          src={gif}
          alt=""
          width="180px"
        />
        <section className="box m-2 hero is-primary">
          <div className="hero-body  has-text-centered">
            <p className="title">Ordered</p>
            <p className="mt-3 subtitle">Your Order ID : {orderDetails.confirmedId}</p>
            <p className="subtitle">
              We will inform you once its printed. Thank You.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};
export default Order;
