import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectCustomer } from "../../features/customerSlice";
import style from "./CartTable.module.css";
import sneaker from "../../assets/images/ColoredSneaker.png"; //temp image
import { getCurrent } from "../../api/cartAPI";

// THIS IS NOT SUPPOSED TO BE USED !!
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////

const CartTable = () => {
  const customer = useSelector(selectCustomer); //get current logged in customer

  const [cartList, setCartList] = useState([]);

  const getCartListLocal = () => {
    const sessionStorage = window.sessionStorage;
    const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    setCartList(cart);
  };

  const getCartListDatabase = () => {
    getCurrent(customer.id).then((res) => {
      // exist current cart in database
      if (res) {
        setCartList(res.products);
      } else {
        // TODO: HANDLE GET CART LIST EMPTY HERE
        console.log("Empty cart!");
      }
    });
  };

  useEffect(() => {
    if (customer) {
      getCartListDatabase();
    } else {
      getCartListLocal();
    }
  }, [customer]);

  return (
    <table className={style.cartTable}>
      <thead>
        <tr className={style.trHead}>
          <th>Product</th>
          <th>Price</th>
          <th>Discount</th>
          <th>Total</th>
        </tr>
      </thead>

      <tbody className={style.trProduct}>
        {cartList.map((item) => {
          return (
            <tr>
              <th>
                <div className={style.mainInfo}>
                  <img src={sneaker} alt="" />
                  <div className={style.nameProduct}>
                    <p>{item.name}</p>
                    <div className={style.propsProduct}>
                      <p>{item.color}</p>
                      <p>{item.size}</p>
                    </div>
                    <div className={style.propsProduct}>
                      <p className={style.newTotal}>Total {item.salePercent}</p>
                    </div>
                  </div>
                </div>
              </th>
              <th className={style.amount}>{item.price}</th>
              <th className={style.discount}>{item.salePercent}</th>
              <th className={style.amount}>
                {item.price - item.price * item.salePercent * 0.01}
              </th>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default CartTable;
