import React, { useState } from "react";
import DealStyle from "./SliderDealOfTheWeek.module.css";
import Data from "./SliderOfTheWeekData";
import { Link } from "react-router-dom";

const SliderDealOfTheWeek = () => {
  const [contentState, setContentState] = useState({
    name: Data[0].name,
    img: Data[0].img,
    nameOfShoes: Data[0].nameOfShoes,
    normalPrice: Data[0].normalPrice,
    salePrice: Data[0].salePrice,
    btnText: Data[0].btnText,
    saleAmount: Data[0].saleAmount,
    alreadySold: Data[0].alreadySold,
    description: Data[0].description,
  });

  const switchSlide = (index) => {
    setContentState({
      name: Data[index].name,
      img: Data[index].img,
      nameOfShoes: Data[index].nameOfShoes,
      normalPrice: Data[index].normalPrice,
      salePrice: Data[index].salePrice,
      btnText: Data[index].btnText,
      saleAmount: Data[index].saleAmount,
      alreadySold: Data[index].alreadySold,
      description: Data[index].description,
    });
  };

  const turnLeft = (index) => {
    if (index === 0) {
      switchSlide(2);
    } else {
      switchSlide(index - 1);
    }
  };
  const turnRight = (index) => {
    if (index === 2) {
      switchSlide(0);
    } else {
      switchSlide(index + 1);
    }
  };
  return (
    <>
      <div className={`${DealStyle.dealContainer}`}>
        <div className={`${DealStyle.titleContainer}`}>
          <h2>Deal Of The Week</h2>
        </div>

        <div className={`${DealStyle.dealContentContainer}`}>
          <div className={`${DealStyle.sideTextContainer}`}>
            <p className={`${DealStyle.sideAboveHeaderText}`}>Hot Deal Week</p>
            <h3 className={`${DealStyle.sideHeader}`} key={Math.random()}>
              {contentState.nameOfShoes}
            </h3>
            <div className={`${DealStyle.priceContainer}`} key={Math.random()}>
              <p className={`${DealStyle.salePrice}`}>
                {contentState.salePrice}$
              </p>
              <p className={`${DealStyle.normalPrice}`}>
                {contentState.normalPrice}$
              </p>
            </div>
            <div className={`${DealStyle.soldAvailableContainer}`}>
              <p className={`${DealStyle.soldText}`}>
                Already sold: {contentState.alreadySold}
              </p>
              <p className={`${DealStyle.AvailableText}`}>
                Sale amount: {contentState.saleAmount}
              </p>
            </div>

            {/* <ProgressBar
              done={Math.floor(
                (Number(contentState.alreadySold) /
                  Number(contentState.saleAmount)) *
                  100
              )}
              className={`${DealStyle.progress}`}
              key={contentState.name}
            /> */}

            <p className={`${DealStyle.description}`}>
              {contentState.description}
            </p>

            <Link
              to="/product"
              className={`${DealStyle.dealBtn}`}
              key={Math.random()}
            >
              Shop now
            </Link>
          </div>

          <div className={`${DealStyle.sideImageContainer}`}>
            <img src={contentState.img} alt="" key={contentState.name} />
          </div>

          <ul className={`${DealStyle.mobileArrowContainer}`}>
            <li
              className={`fas fa-chevron-left ${DealStyle.arrowLeft}`}
              onClick={() => {
                turnLeft(contentState.name);
              }}
            ></li>
            <li
              className={`fas fa-chevron-right ${DealStyle.arrowRight}`}
              onClick={() => {
                turnRight(contentState.name);
              }}
            ></li>
          </ul>
        </div>

        <ul className={DealStyle.thumb}>
          {Data.map((currentItem, index) => {
            return (
              <li
                key={index}
                onClick={() => {
                  switchSlide(index);
                }}
              >
                <img src={currentItem.img} alt="" />
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default SliderDealOfTheWeek;
