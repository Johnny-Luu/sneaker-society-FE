import React from "react";
import { images } from "../../assets";
import style from "./BackGroundImg.module.css";

function BackGroundImg() {
  return (
    <div className={style.bgContainer}>
      <img src={images.productDetail.backgroundImageTop} />
    </div>
  );
}

export default BackGroundImg;
