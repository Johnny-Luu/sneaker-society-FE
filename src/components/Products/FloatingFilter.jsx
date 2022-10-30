import React, { useState } from "react";
import Style from "./FloatingFilter.module.css";

function FloatingFilter(props) {
  return (
    <>
      <div
        onClick={() => {
          props.click();
        }}
        className={`${Style.floatingContainer}`}
      >
        <i
          class={
            props.isShow
              ? `fas fa-times ${Style.floatingIcon}`
              : `fas fa-filter ${Style.floatingIcon}`
          }
        ></i>
      </div>
    </>
  );
}

export default FloatingFilter;
