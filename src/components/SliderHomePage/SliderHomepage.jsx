import React, { useState } from "react";
import SliderCSS from "./SliderHomepage.module.css";
import SliderData from "./SliderHomePageData";
import instagram from "../../assets/images/instagram.png";
import twitter from "../../assets/images/twitter.png";
import facebook from "../../assets/images/facebook.png";
import { Link } from "react-router-dom";

const SliderHomepage = () => {
  //set state for information of slider
  const [sliderInfo, setSliderImage] = useState({
    name: SliderData[0].name,
    img: SliderData[0].image,
    aboveText: SliderData[0].aboveHeadText,
    heading: SliderData[0].heading,
    description: SliderData[0].description,
    btnText: SliderData[0].btnText,
  });

  // callback function when click the thumb and switch the slide
  const switchSlide = (index) => {
    setSliderImage({
      name: SliderData[index].name,
      img: SliderData[index].image,
      aboveText: SliderData[index].aboveHeadText,
      heading: SliderData[index].heading,
      description: SliderData[index].description,
      btnText: SliderData[index].btnText,
    });
  };

  return (
    <div className={SliderCSS.container}>
      <div className={SliderCSS.content}>
        <div className={SliderCSS.textBox}>
          <p key={Math.random()} className={SliderCSS.aboveHeadingText}>
            {sliderInfo.aboveText}
          </p>
          <h2 key={Math.random()}>{sliderInfo.heading}</h2>
          <p key={Math.random()} className={SliderCSS.description}>
            {sliderInfo.description}
          </p>
          <Link
            className={SliderCSS.navigateBtn}
            to="/product"
            key={Math.random()}
          >
            {sliderInfo.btnText}
          </Link>
        </div>

        <div className={SliderCSS.imgBox}>
          <img
            key={sliderInfo.name}
            src={sliderInfo.img}
            alt="sneaker"
            className={SliderCSS.sneakers}
          />
        </div>
      </div>

      <ul className={SliderCSS.thumb}>
        {SliderData.map((currentItem, index) => {
          return (
            <li
              key={index}
              onClick={() => {
                switchSlide(index);
              }}
            >
              <img src={currentItem.image} alt="" />
            </li>
          );
        })}
      </ul>

      <ul className={SliderCSS.sci}>
        <li>
          <a href="#">
            <img src={instagram} alt="" />
          </a>
        </li>
        <li>
          <a href="#">
            <img src={facebook} alt="" />
          </a>
        </li>
        <li>
          <a href="#">
            <img src={twitter} alt="" />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default SliderHomepage;
