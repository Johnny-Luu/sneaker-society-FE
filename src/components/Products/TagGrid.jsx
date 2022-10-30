import React, { useState } from "react";
import Style from "./TagGrid.module.css";
import SideBarData from "./SideBarData";
import { useDispatch } from "react-redux";
import {
  addTagFilter,
  deleteTagFilter,
} from "../../features/productArrangeSlice";

function TagGrid() {
  const [isClicked, setTagClickState] = useState(false);
  const dispatch = useDispatch();

  function deleteTag(filterTag) {
    dispatch(deleteTagFilter());
  }

  function addTag(filterTag) {
    dispatch(
      addTagFilter({
        tag: filterTag,
      })
    );
  }

  const setClick = (index, filterTag) => {
    filterTag = `&tags[in]=${filterTag}`;

    if (index === isClicked) {
      setTagClickState(-1);
      deleteTag(filterTag);
    } else {
      setTagClickState(index);
      deleteTag(filterTag);
      addTag(filterTag);
    }
  };

  return (
    <>
      <ul className={`${Style.tagContainer}`}>
        {SideBarData.tags.map((item, index) => {
          return (
            <li
              onClick={() => {
                setClick(index, item);
              }}
              className={
                index === isClicked
                  ? `${Style.tagItem} ${Style.tagItemActive}`
                  : `${Style.tagItem}`
              }
              key={index}
            >
              {item}
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default TagGrid;
