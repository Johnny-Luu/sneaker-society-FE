import React from "react";
import { useSpring, animated } from "react-spring";
import style from "./ProductModal.module.css";
import { useHistory } from "react-router";

function ProductModal({ showModal, setShowModal, data }) {
  const closeClick = () => {
    setShowModal((prev) => !prev);
  };

  const history = useHistory();

  console.log(data);

  function handleNavigateToDetail() {
    history.push(`/product/${data._id}`);
  }

  const stopPropagationChild = (e) => {
    e.stopPropagation();
  };

  return (
    <div className={style.modal} onClick={closeClick}>
      <div className={style.modal__wrapper} onClick={stopPropagationChild}>
        <div className={style.imageContainer}>
          <img className={style.modal__image} src={data.images[0]} alt="" />
        </div>

        <div className={style.modal__content}>
          <h1>{data.name}</h1>
          <p>{data.description}</p>
          <button onClick={handleNavigateToDetail}>See detail</button>
        </div>
        <i
          className={`${style.modal__close} far fa-times-circle`}
          onClick={closeClick}
        ></i>
      </div>
    </div>
  );
}

export default ProductModal;
