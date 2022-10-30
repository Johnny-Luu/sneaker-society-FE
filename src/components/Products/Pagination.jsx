import React, { useState } from "react";
import Style from "./Pagination.module.css";

const Pagination = ({
  total,
  pageNumber,
  changePage,
  setPrevShowingAmount,
  setNextShowingAmount,
}) => {
  const setPreviousPage = () => {
    if (pageNumber > 0) {
      changePage(pageNumber - 1);
    }
  };

  const setNextPage = () => {
    if (pageNumber < total - 1) {
      changePage(pageNumber + 1);
    }
  };

  return (
    <>
      <div className={`${Style.paginationContainer}`}>
        <div
          className={`${Style.arrowLeftContainer}`}
          onClick={() => {
            setPreviousPage();
            setPrevShowingAmount();
          }}
        >
          <i className={`${Style.arrowLeft} fas fa-chevron-left`}></i>
        </div>

        <div className={`${Style.paginationMainPart}`}>
          <div className={`${Style.currentPageContainer}`}>
            Page {parseInt(pageNumber) + 1}
          </div>
          <div className={`${Style.totalPageContainer}`}>
            <span>of {total}</span>
          </div>
        </div>
        <div
          className={`${Style.arrowRightContainer}`}
          onClick={() => {
            setNextPage();
            setNextShowingAmount();
          }}
        >
          <i className={`${Style.arrowRight} fas fa-chevron-right`}></i>
        </div>
      </div>
    </>
  );
};

export default Pagination;
