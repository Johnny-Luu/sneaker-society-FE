import React, { useEffect, useState } from "react";
import style from "./SuggestProducts.module.css";
import ProductItem from "../ProductItem/ProductItem";
import { getAllProduct } from "../../api/paginationProductAPI";
import { getOneProduct } from "../../api/productAPI";

function SuggestProducts({ id }) {
  const [productList, setProductList] = React.useState([]);
  const [brand, setBrand] = useState("");

  useEffect(() => {
    getOneProduct(id).then((res) => {
      setBrand(res.brand);
    });
  }, []);

  useEffect(() => {
    getAllProduct(`http://localhost:3001/product/suggest?brand=${brand}`).then(
      (res) => {
        setProductList(res.products);
      }
    );
  }, [brand]);

  return (
    <div className={style.container}>
      <h2 className={style.text}>Suggested Products</h2>
      <div className={style.productContainer}>
        {productList.map((item, index) => {
          return <ProductItem key={item._id} data={item} />;
        })}
      </div>
    </div>
  );
}

export default SuggestProducts;
