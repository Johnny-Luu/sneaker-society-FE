import React, { useState } from "react";
import SideBarData from "./SideBarData";
import Style from "./SizeGrid.module.css";
import { useDispatch } from "react-redux";
import {
  addSizeFilter,
  deleteSizeFilter,
} from "../../features/productArrangeSlice";

function SizeGrid() {
  const dispatch = useDispatch();
  const [size, setSize] = useState();

  function deleteSize(filterSize) {
    dispatch(deleteSizeFilter());
  }

  function addSize(filterSize) {
    dispatch(
      addSizeFilter({
        size: filterSize,
      })
    );
  }

  const changeSize = (index, filterSize) => {
    filterSize = `&size[in]=${filterSize}`;

    if (index === size) {
      setSize(-1);
      deleteSize(filterSize);
    } else {
      setSize(index);
      deleteSize(filterSize);
      addSize(filterSize);
      console.log(filterSize);
    }
  };

  return (
    <>
      <div className={Style.sizeContainer}>
        {SideBarData.size.map((item, index) => (
          <div
            className={
              index === size
                ? `${Style.sizeItem} ${Style.sizeActive}`
                : Style.sizeItem
            }
            key={index}
            onClick={() => changeSize(index, item)}
          >
            {item}
          </div>
        ))}
      </div>
    </>
  );
}

export default SizeGrid;
