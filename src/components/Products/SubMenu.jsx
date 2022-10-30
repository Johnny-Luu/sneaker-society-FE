import React, { useState, useEffect } from "react";
import Style from "./SubMenu.module.css";
import { useDispatch } from "react-redux";
import {
  addBrandFilter,
  deleteBrandFilter,
  addPriceFilter,
  deletePriceFilter,
} from "../../features/productArrangeSlice";
import { useSelector } from "react-redux";

//pass listChild as an array
function SubMenu({ title, listChild }) {
  const dispatch = useDispatch();
  const [isDropped, setDropState] = useState(true);
  const [isSelected, setIsSelected] = useState();
  let selectedBrand = useSelector((state) => state.productArrange.value.brand);

  useEffect(() => {
    if (selectedBrand === "") {
      setIsSelected(-1);
    }

    if (selectedBrand !== "" && title === "Brand") {
      for (let i = 0; i < listChild.length; i++) {
        if (listChild[i].replace(" ", "") === selectedBrand) {
          setIsSelected(i);
          break;
        }
      }
    }
  }, [selectedBrand]);

  function drop() {
    setDropState(function (preValue) {
      return !preValue;
    });
  }

  // Brand handler
  function addBrand(filterBrand) {
    dispatch(
      addBrandFilter({
        brand: filterBrand,
      })
    );
  }

  function deleteBrand(filterBrand) {
    dispatch(deleteBrandFilter());
  }

  //Price handler
  function addPrice(filterPrice) {
    switch (filterPrice) {
      case "Less than 50$":
        filterPrice = "&price[lt]=50";
        break;
      case "50$-100$":
        filterPrice = "&price[gte]=50&price[lte]=100";
        break;
      case "100$-150$":
        filterPrice = "&price[gte]=100&price[lte]=150";
        break;
      case "150$-200$":
        filterPrice = "&price[gte]=150&price[lte]=200";
        break;
      case "Above 200$":
        filterPrice = "&price[gt]=200";
        break;
      default:
    }

    dispatch(
      addPriceFilter({
        price: filterPrice,
      })
    );
  }

  function deletePrice(filterPrice) {
    dispatch(deletePriceFilter());
  }

  // on click handler
  function handleSelected(index, filterType) {
    switch (title) {
      case "Brand":
        if (index === isSelected) {
          setIsSelected(-1);
          deleteBrand(filterType);
        } else {
          setIsSelected(index);
          deleteBrand(filterType);
          addBrand(filterType);
        }
        break;
      case "Price":
        if (index === isSelected) {
          setIsSelected(-1);
          deletePrice(filterType);
        } else {
          setIsSelected(index);
          deletePrice(filterType);
          addPrice(filterType);
        }
        break;
      default:
    }
  }

  return (
    <>
      <div
        className={`${Style.titleContainer}`}
        onClick={() => {
          drop();
        }}
      >
        <h3 className={`${Style.titleText}`}>{title}</h3>
        <i
          className={
            isDropped
              ? `fas fa-chevron-down ${Style.arrow} ${Style.arrowActive}`
              : `fas fa-chevron-down ${Style.arrow}`
          }
        ></i>
      </div>

      <ul
        className={
          isDropped
            ? `${Style.childContainer} ${Style.childContainerActive}`
            : `${Style.childContainer}`
        }
        key={title}
      >
        {listChild.map((item, index) => {
          return (
            <li
              className={
                index === isSelected
                  ? `${Style.childText} ${Style.childTextActive}`
                  : `${Style.childText}`
              }
              key={index}
              onClick={() => handleSelected(index, item)}
            >
              {item}
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default SubMenu;
