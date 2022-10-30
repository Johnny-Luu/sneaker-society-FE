import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { selectCustomer } from "../../features/customerSlice";
import styleCartTable from "./CartTable.module.css";
import sneaker from "../../assets/images/ColoredSneaker.png"; //temp image
import {
  getCurrent,
  removeCartItem,
  checkout,
  createCart,
  addToCart,
} from "../../api/cartAPI";
import { Link } from "react-router-dom";

import styleCartTotal from "./CartTotal.module.css";
import styleCartInfo from "./CartCustomerInfo.module.css";
import styleSection from "./CartSection.module.css";

import checked from "../../assets/icons/checked.png";
import emptycart from "../../assets/images/cart/emptycart.png";
import cross from "../../assets/images/cart/cross.png";
import plus from "../../assets/images/cart/plus.png";
import minus from "../../assets/images/cart/minus.png";
import {
  selectCartList,
  addCartItemToRedux,
  removeCartItemFromRedux,
  clearCartList,
} from "../../features/cartSlice";
import ToastMessage from "../ToastMessage/ToastMessage";
import Checkout from "../Checkout/Checkout";
import { updateQuantity } from "../../api/cartAPI";

const CartSection = () => {
  //CartTable
  const customer = useSelector(selectCustomer); //get current logged in customer
  const cartListRedux = useSelector(selectCartList) || []; //get current cart list

  const [cartList, setCartList] = useState([]);

  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  const [subTotalPrice, setSubTotalPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();

  const getCartListLocal = () => {
    const sessionStorage = window.sessionStorage;
    const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    setCartList(cart);

    // calculate bill's price
    let subTotal = 0;
    let total = 0;
    cart.forEach((product) => {
      subTotal += product.price * product.quantity;
      total +=
        (product.price - (product.price * product.salePercent) / 100) *
        product.quantity;
    });

    setSubTotalPrice(subTotal);
    setTotalPrice(total);
  };

  const getCartListDatabase = () => {
    getCurrent(customer.id).then((res) => {
      // exist current cart in database
      if (res) {
        setCartList(res.products);

        // calculate bill's price
        let subTotal = 0;
        let total = 0;
        res.products.forEach((product) => {
          subTotal += product.price * product.quantity;
          total +=
            (product.price - (product.price * product.salePercent) / 100) *
            product.quantity;
        });

        setSubTotalPrice(subTotal);
        setTotalPrice(total);
      } else {
        // TODO: HANDLE GET CART LIST EMPTY HERE
        console.log("Empty cart!");
        setCartList([]);
        setSubTotalPrice(0);
        setTotalPrice(0);
      }
    });
  };

  const calculatePrice = () => {
    let subTotal = 0;
    let total = 0;
    cartList.forEach((product) => {
      subTotal += product.price * product.quantity;
      total +=
        (product.price - (product.price * product.salePercent) / 100) *
        product.quantity;
    });

    setSubTotalPrice(subTotal);
    setTotalPrice(total);
  };

  const handleRemoveItem = async (productID) => {
    // if user logged in, remove item from database
    // else remove item from local storage
    if (customer) {
      await removeCartItem(customer.id, productID).then((res) => {
        ToastMessage("success", "Remove item successfully!");

        // remove item from redux
        dispatch(removeCartItemFromRedux(productID));
      });
      getCartListDatabase();
    } else {
      const newCart = cartList.filter((item) => item.id !== productID);
      sessionStorage.setItem("cart", JSON.stringify(newCart));
      getCartListLocal();
    }
  };

  const handleCheckout = async () => {
    if (
      customerName === "" ||
      customerEmail === "" ||
      customerAddress === "" ||
      customerPhone === ""
    ) {
      ToastMessage("error", "Please fill all information!");
      return;
    }

    // if user logged in, checkout from database
    // else create a new bill in database with customer is anonymous
    if (customer) {
      await checkout(customer.id, totalPrice).then((res) => {
        ToastMessage("success", "Checkout successfully!");
        getCartListDatabase();
        openModal();
        dispatch(clearCartList());
      });
    } else {
      createCart("anonymous").then((res) => {
        cartList.map((item) => {
          addToCart(
            "anonymous",
            item.id,
            item.name,
            item.brand,
            item.price,
            item.size,
            item.color,
            item.salePercent,
            item.quantity,
            item.image
          );
        });

        setTimeout(() => {
          checkout("anonymous", totalPrice).then((res) => {
            ToastMessage("success", "Checkout successfully!");

            // clear cart in local storage
            sessionStorage.setItem("cart", JSON.stringify([]));
            getCartListLocal();
            openModal();
            dispatch(clearCartList());
          });
        }, 0);
      });
    }
  };

  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  const handleUpdateQuantity = async (productID, quantity) => {
    if (customer) {
      await updateQuantity(customer.id, productID, quantity);
    } else {
      const newCart = cartList.map((it) => {
        if (it.id === productID) {
          it.quantity = quantity;
        }
        return it;
      });
      sessionStorage.setItem("cart", JSON.stringify(newCart));
      getCartListLocal();
    }
    calculatePrice();
  };

  //CartCustomerInfo
  useEffect(() => {
    if (customer) {
      getCartListDatabase();

      // auto fill customer info
      setCustomerName(customer.name);
      setCustomerEmail(customer.email);
      setCustomerAddress(customer.address);
      setCustomerPhone(customer.phone);
    } else {
      getCartListLocal();
    }
  }, [customer]);

  return (
    <>
      {showModal ? (
        <Checkout showModal={showModal} setShowModal={setShowModal} />
      ) : null}
      <div className={styleSection.emptyCart}>
        <img src={emptycart} alt="" />
        <p>There is not any product in the cart yet!</p>
        <div className={styleSection.btnEmpty}>
          <Link to="/product">Back to Product Page</Link>
        </div>
      </div>

      <section className={styleSection.cartSection}>
        {/* CartTable */}
        <div className={styleSection.cartTable}>
          <table className={styleCartTable.cartTable}>
            <thead>
              <tr className={styleCartTable.trHead}>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Discount</th>
                <th>Total</th>
              </tr>
            </thead>

            <tbody className={styleCartTable.trProduct}>
              {cartList.map((item) => {
                return (
                  <tr>
                    <th>
                      <div className={styleCartTable.mainInfo}>
                        <img
                          id={styleCartTable.imgProduct}
                          src={item.image}
                          alt=""
                        />
                        <div className={styleCartTable.nameProduct}>
                          <p>{item.name}</p>
                          <div className={styleCartTable.propsProduct}>
                            <p>{item.color}</p>
                            <p>{item.size}</p>
                          </div>
                          <div className={styleCartTable.quantityDiv}>
                            <img
                              src={minus}
                              onClick={() => {
                                if (item.quantity <= 1) {
                                  ToastMessage(
                                    "error",
                                    "Quantity cannot be less than 1"
                                  );
                                  return;
                                }
                                item.quantity--;
                                handleUpdateQuantity(item.id, item.quantity);
                              }}
                            />
                            <span>{item.quantity}</span>
                            <img
                              src={plus}
                              onClick={() => {
                                item.quantity++;
                                handleUpdateQuantity(item.id, item.quantity);
                              }}
                            />
                          </div>
                          <div className={styleCartTable.propsProduct}>
                            <p className={styleCartTable.newTotal}>
                              {item.price} USD
                            </p>
                          </div>
                        </div>
                      </div>
                    </th>
                    <th className={styleCartTable.amount}>{item.price}</th>
                    <th className={styleCartTable.quantity}>
                      <div className={styleCartTable.quantityDiv}>
                        <img
                          src={minus}
                          onClick={() => {
                            if (item.quantity <= 1) {
                              ToastMessage(
                                "error",
                                "Quantity cannot be less than 1"
                              );
                              return;
                            }
                            item.quantity--;
                            handleUpdateQuantity(item.id, item.quantity);
                          }}
                        />
                        <span>{item.quantity}</span>
                        <img
                          src={plus}
                          onClick={() => {
                            item.quantity++;
                            handleUpdateQuantity(item.id, item.quantity);
                          }}
                        />
                      </div>
                    </th>
                    <th className={styleCartTable.discount}>
                      {item.salePercent}
                    </th>
                    <th className={styleCartTable.amount}>
                      {(item.price - (item.price * item.salePercent) / 100) *
                        item.quantity}
                    </th>
                    <th className={styleCartTable.delete}>
                      <img
                        id={styleCartTable.deleteBtn}
                        src={cross}
                        onClick={() => {
                          handleRemoveItem(item.id);
                        }}
                      />
                    </th>
                  </tr>
                );
                //return <CartItem item={item} key={item.id} />
              })}
            </tbody>
          </table>
        </div>

        <div className={styleSection.cartCalculate}>
          {/* CartCustomerInfo */}
          <div className={styleCartInfo.cartInfoDiv}>
            <h1 className={styleCartInfo.titleInfo}>Customer Information</h1>

            <div className={styleCartInfo.divSectionCal}>
              <div className={styleCartInfo.divInput}>
                <div className={styleCartInfo.divInfo}>
                  <input
                    className={styleCartInfo.input}
                    type="text"
                    placeholder="Name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                  />
                </div>
                <div className={styleCartInfo.divInfo}>
                  <input
                    className={styleCartInfo.input}
                    type="text"
                    placeholder="Email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                  />
                </div>
                <div className={styleCartInfo.divInfo}>
                  <input
                    className={styleCartInfo.input}
                    type="text"
                    placeholder="Address"
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                  />
                </div>
                <div className={styleCartInfo.divInfo}>
                  <input
                    className={styleCartInfo.input}
                    type="text"
                    placeholder="Phone Number"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* CartTotal */}
          <div className={styleCartTotal.cartTotalDiv}>
            <h1 className={styleCartTotal.titleTotal}>Cart Totals</h1>

            <div className={styleCartTotal.divTotal}>
              <div className={styleCartTotal.totals}>
                <p>Subtotals: </p>
                <p>{subTotalPrice} USD</p>
              </div>
              <div className={styleCartTotal.totals}>
                <p>Totals: </p>
                <p>{totalPrice} USD</p>
              </div>
              <div className={styleCartTotal.checked}>
                <img src={checked} alt="" />
                <p>Shipping and taxes calculated at checkout</p>
              </div>
              <div
                className={styleCartTotal.divBtn}
                onClick={() => {
                  handleCheckout();
                }}
              >
                {/* <Link to="">Procced to check out</Link> */}
                Procced to check out
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CartSection;
