import React from "react";
import { Link } from "react-router-dom";
import style from "./Checkout.module.css";
import { images } from "../../assets";

const Checkout = ({ showModal, setShowModal }) => {
  const closeClick = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <div className={style.modal}>
      <div className={style.checkoutContainer}>
        <div className={style.checkoutDiv}>
          <img src={images.cart.check} alt="" />
          <h3>CHECKOUT SUCCEEDED!</h3>
          <div className={style.btnDiv}>
            <Link to="/" onClick={closeClick}>
              BACK TO HOME
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
