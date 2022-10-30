import React, { useState, useEffect } from "react";
import styleCartTable from "./HistoryTable.module.css";
import { Link } from "react-router-dom";
import styleSection from "./HistorySection.module.css";
import ToastMessage from "../ToastMessage/ToastMessage";

const HistorySection = ({ historyList }) => {
  return (
    <>
      <section className={styleSection.cartSection}>
        {/* CartTable */}
        <div className={styleSection.cartTable}>
          <table className={styleCartTable.cartTable}>
            <thead>
              <tr className={styleCartTable.trHead}>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Discount</th>
                <th>Total</th>
              </tr>
            </thead>

            <tbody className={styleCartTable.trProduct}>
              {historyList.map((item) => {
                return (
                  <tr>
                    <th>
                      <div className={styleCartTable.mainInfo}>
                        <img
                          id={styleCartTable.imgProduct}
                          src={item.image}
                          alt=""
                        />
                        <div className={styleCartTable.nameProduct}>
                          <p>{item.name}</p>
                          <div className={styleCartTable.propsProduct}>
                            <p>{item.color}</p>
                            <p>{item.size}</p>
                          </div>
                          <div className={styleCartTable.quantityDiv}>
                            <span>{item.quantity}</span>
                          </div>
                          <div className={styleCartTable.propsProduct}>
                            <p className={styleCartTable.newTotal}>
                              {item.price} USD
                            </p>
                          </div>
                        </div>
                      </div>
                    </th>
                    <th className={styleCartTable.amount}>{item.price}</th>
                    <th className={styleCartTable.quantity}>
                      <div className={styleCartTable.quantityDiv}>
                        <span>{item.quantity}</span>
                      </div>
                    </th>
                    <th className={styleCartTable.discount}>
                      {item.salePercent}
                    </th>
                    <th className={styleCartTable.amount}>
                      {(item.price - (item.price * item.salePercent) / 100) *
                        item.quantity}
                    </th>
                    <th className={styleCartTable.delete}></th>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default HistorySection;
