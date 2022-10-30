import React from "react";
import Style from "./TopFilter.module.css";
import {
  deleteSortingFilter,
  addSortingFilter,
} from "../../features/productArrangeSlice";
import { useDispatch } from "react-redux";
import Data from "./SideBarData";

function TopFilter({ total, showingAmount }) {
  const [isClicked, setIsClicked] = React.useState(0);
  const dispatch = useDispatch();

  function deleteSorting(sorting) {
    dispatch(deleteSortingFilter());
  }

  function addSorting(sortingFilter) {
    dispatch(
      addSortingFilter({
        sorting: sortingFilter,
      })
    );
  }

  function handleClick(e) {
    let sorting = e.target.value;

    switch (sorting) {
      case "Date, new to old":
        sorting = "-_id";
        break;
      case "Date, old to new":
        sorting = "_id";
        break;
      case "Price, low to high":
        sorting = "price";
        break;
      case "Price, high to low":
        sorting = "-price";
        break;
      default:
    }

    deleteSorting(sorting);
    addSorting(sorting);
  }

  return (
    <>
      <div className={`${Style.filterContainer}`}>
        <div className={`${Style.showingAmount}`}>
          Showing {total > 1 ? showingAmount.startProduct : "0"} -{" "}
          {total < 12 ? total : showingAmount.endProduct} of {total} results
        </div>
        <select
          onChange={handleClick}
          name=""
          id=""
          className={`${Style.selection}`}
        >
          {Data.options.map((item, index) => {
            return (
              <option
                value={item}
                className={`${Style.singleOption}`}
                key={index}
              >
                {item}
              </option>
            );
          })}
        </select>
      </div>
    </>
  );
}

export default TopFilter;
