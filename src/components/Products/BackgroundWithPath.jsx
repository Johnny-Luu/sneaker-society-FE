import React from "react";
// import BackGround from "../../assets/images/productDetail/detail-product-bg.jpg";
import style from "./BackgroundWithPath.module.css";

function BackgroundWithPath({ img, pathText, title }) {
  const background = {
    backgroundImage: `url(${img})`,
    backgroundRepeat: "no-repeat",
    webkitBackgroundSize: "cover",
    mozBackgroundSize: "cover",
    oBackgroundSize: "cover",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <div className={style.bgContainer} style={background}>
      <h2>{title}</h2>
      <p>{pathText}</p>
    </div>
  );
}

export default BackgroundWithPath;
