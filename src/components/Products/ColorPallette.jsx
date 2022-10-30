import React from "react";
import Style from "./ColorPallette.module.css";
import SideBarData from "./SideBarData";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  addColorFilter,
  deleteColorFilter,
} from "../../features/productArrangeSlice";

function ColorPallette() {
  const dispatch = useDispatch();
  const [isClicked, setColorState] = React.useState(-1);

  function addColor(filterColor) {
    dispatch(
      addColorFilter({
        color: filterColor,
      })
    );
  }

  function deleteColor(filterColor) {
    dispatch(deleteColorFilter());
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function switchColor(index, filterColor) {
    filterColor = capitalizeFirstLetter(filterColor);
    if (index === isClicked) {
      setColorState(-1);
      deleteColor(filterColor);
    } else {
      setColorState(index);
      deleteColor(filterColor);
      addColor(filterColor);
      console.log(filterColor);
    }
  }

  return (
    <>
      <div class={`${Style.PalletteContainer}`}>
        {SideBarData.colorName.map((item, index) => {
          return (
            <div
              key={index}
              className={
                isClicked === index
                  ? `${Style.singleColor} ${Style.activeColor}`
                  : `${Style.singleColor}`
              }
              style={{ backgroundColor: `${item}` }}
              onClick={() => {
                switchColor(index, item);
              }}
            ></div>
          );
        })}
      </div>
    </>
  );
}

export default ColorPallette;
