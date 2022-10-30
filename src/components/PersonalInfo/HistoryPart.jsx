import React, { useEffect, useState } from "react";
import style from "./HistoryPart.module.css";
import { useSelector, useDispatch } from "react-redux";
import { selectCartList } from "../../features/cartSlice";
import { selectCustomer } from "../../features/customerSlice";
import { getHistory } from "../../api/cartAPI";
import HistorySection from "./HistorySection";

function HistoryPart() {
  const customerState = useSelector(selectCustomer);
  const customerID = customerState.id;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getHistory(`http://localhost:3001/cart/history?id=${customerID}`).then(
      (res) => {
        // setProductList(res.products);
        // setTotalPage(res.totalPage);
        // setTotalProduct(res.totalProducts);

        const listCarts = res.doneCarts;
        let productDoneList = [];

        for (let i = 0; i < listCarts.length; i++) {
          productDoneList = productDoneList.concat(listCarts[i].products);
        }

        setProducts(productDoneList);
      }
    );
  }, []);

  console.log("products: ", products);

  return (
    <div className={style.container}>
      <h1 className={style.h1}>Billing History</h1>
      <hr />
      {products.length === 0 && <p>There is no products that you bought</p>}
      {products.length !== 0 && <HistorySection historyList={products} />}
    </div>
  );
}

export default HistoryPart;
