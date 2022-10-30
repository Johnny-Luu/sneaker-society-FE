import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import style from "./ProductItem.module.css";
import Nike1 from "../../assets/images/sneaker-transparent/jordan-1.png"; //temp image
import { selectCustomer } from "../../features/customerSlice";
import { selectCartList, addCartItemToRedux } from "../../features/cartSlice";
import { createCart, addToCart, getCurrent } from "../../api/cartAPI";
import ToastMessage from "../ToastMessage/ToastMessage";
import ProductModal from "../ProductModal/ProductModal";

import {
  getFavourites,
  createFavouriteList,
  addFavourite,
  removeFavourite,
} from "../../api/favouriteAPI";

import {
  selectFavouriteList,
  addFavouriteToRedux,
  removeFavouriteFromRedux,
} from "../../features/favouriteSlice";

function ProductItem({ data, marginRight }) {
  const customer = useSelector(selectCustomer); //get current logged in customer
  const favouriteList = useSelector(selectFavouriteList) || []; //get current favourite list
  const cartList = useSelector(selectCartList) || []; //get current cart list

  const dispatch = useDispatch();

  const [sizeChoose, setSizeChoose] = useState("");

  const rightMargin = {
    marginRight: marginRight,
  };

  const handleSizeChange = (size) => {
    setSizeChoose(size);
  };

  const handleAddToCart = () => {
    if (sizeChoose === "") {
      ToastMessage("error", "Please choose a size!");
      return;
    }

    if (customer) {
      getCurrent(customer.id)
        .then((res) => {
          // exist current cart in database
          if (res) {
            addToCartDatabase();
          } else {
            createCart(customer.id).then((res) => {
              addToCartDatabase();
            });
          }
        })
        .catch((err) => {
          // HANDLE GET ADD PRODUCT TO DATABASE FAILED HERE
          ToastMessage("error", "Something went wrong!");
          console.log(err);
        });
    } else {
      addToCartLocal();
    }
  };

  const addToCartLocal = () => {
    const sessionStorage = window.sessionStorage;
    const cart = JSON.parse(sessionStorage.getItem("cart")) || [];

    for (let i = 0; i < cart.length; i++) {
      if (cart[i].id === data._id) {
        ToastMessage("error", "This product is already in your cart!");
        return;
      }
    }

    sessionStorage.setItem(
      "cart",
      JSON.stringify([
        ...cart,
        {
          id: data._id,
          size: sizeChoose,
          name: data.name,
          brand: data.brand,
          color: data.color,
          price: data.price,
          salePercent: data.salePercent,
          quantity: 1,
          image: data.images[0],
        },
      ])
    );
    ToastMessage("success", "Added to cart successfully!");
  };

  const addToCartDatabase = () => {
    if (isInCart()) {
      ToastMessage("error", "This product is already in your cart!");
      return;
    } else {
      addToCart(
        customer.id,
        data._id,
        data.name,
        data.brand,
        data.price,
        sizeChoose,
        data.color,
        data.salePercent,
        data.images[0]
      )
        .then((res) => {
          // HANDLE UPDATE UI WHEN ADD TO CART SUCCESSFULLY HERE
          ToastMessage("success", "Added to cart successfully!");

          // add to cart list in redux
          dispatch(addCartItemToRedux(data._id));
        })
        .catch((err) => {
          console.log(err);
          // HANDLE UPDATE UI WHEN ADD TO CART FAIL HERE
          ToastMessage("error", "Add to cart failed!");
        });
    }
  };

  const handleAddToFavorite = () => {
    if (customer) {
      addFavourite(customer.id, data._id).then((res) => {
        dispatch(addFavouriteToRedux(data._id));
        // HANDLE UPDATE UI WHEN ADD FAVOURITE SUCCESSFULLY HERE
        ToastMessage("success", "Favourite added successfully!");
      });
    } else {
      // HANDLE NOTIFY WHEN USER NOT LOGGED IN HERE
      ToastMessage("error", "Please login to use this feature!");
    }
  };

  const hanleRemoveFromFavorite = () => {
    if (customer) {
      removeFavourite(customer.id, data._id).then((res) => {
        // HANDLE UPDATE UI WHEN REMOVE FAVOURITE SUCCESSFULLY HERE
        dispatch(removeFavouriteFromRedux(data._id));
        ToastMessage("success", "Favourite removed successfully!");
      });
    }
  };

  const isFavourite = () => {
    if (favouriteList.includes(data._id)) {
      return true;
    }
    return false;
  };

  const isInCart = () => {
    if (cartList.includes(data._id)) {
      return true;
    }
    return false;
  };

  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <>
      {showModal ? (
        <ProductModal
          data={data}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      ) : null}
      <Link
        to={`/product/${data._id}`}
        style={rightMargin}
        className={style.card}
      >
        <div className={style.imgBox}>
          <img src={data.images || Nike1} />
        </div>

        <div className={style.popup}>
          <div
            className={`${style.btn} ${style.btn1}`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              openModal();
            }}
          >
            <i className="fas fa-ellipsis-h"></i>
          </div>

          <div
            className={`${style.btn} ${style.btn2}`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleAddToCart();
            }}
          >
            <i className="fal fa-shopping-cart"></i>
          </div>

          <div
            className={`${style.btn} ${style.btn3}`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();

              // add if not favourite, remove if favourite
              if (isFavourite()) {
                hanleRemoveFromFavorite();
              } else {
                handleAddToFavorite();
              }
            }}
          >
            {isFavourite() ? (
              <i className="fas fa-heart" style={{ color: "red" }}></i>
            ) : (
              <i className="far fa-heart"></i>
            )}
          </div>
        </div>

        <div className={style.content}>
          <h2 className={style.name}>{data.name}</h2>
          <h4 className={style.rating}>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="far fa-star"></i>
          </h4>
          <p className={style.shortDesc}>{data.shortDescription}</p>
          <div className={style.sizeContainer}>
            {data.size.map((size) => {
              return (
                <p
                  key={size}
                  className={
                    size === sizeChoose
                      ? `${style.sizeItem} ${style.sizeChoose}`
                      : style.sizeItem
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleSizeChange(size);
                  }}
                >
                  {size}
                </p>
              );
            })}
          </div>
          <h2 className={style.price}>{`$${data.price}`}</h2>
        </div>
      </Link>
    </>
  );
}

export default ProductItem;
