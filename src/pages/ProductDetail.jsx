import React from "react";
import BackGroundImg from "../components/ProductDetail/BackGroundImg";
import DetailInfo from "../components/ProductDetail/DetailInfo";
import CmtAndRating from "../components/ProductDetail/CmtAndRating";
import SuggestProducts from "../components/ProductDetail/SuggestProducts";

function ProductDetail(props) {
  const id = props.match.params.id;

  return (
    <>
      <BackGroundImg />
      <DetailInfo id={id} />
      <CmtAndRating id={id} />
      <SuggestProducts id={id} />
    </>
  );
}

export default ProductDetail;
