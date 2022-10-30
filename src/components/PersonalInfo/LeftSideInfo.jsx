import React from "react";
import empty from "../../assets/images/empty.jpg";
import style from "./LeftSideInfo.module.css";
import { useHistory } from "react-router-dom";
import ToastMessage from "../ToastMessage/ToastMessage";

function LeftSideInfo({ account, setAccount }) {
  const history = useHistory();

  const onClickAccount = () => {
    setAccount(true);
    document.getElementById("account").classList.add(style.isChosen);
    document.getElementById("history").classList.remove(style.isChosen);
    history.push("/account");
  };
  const onClickHistory = () => {
    setAccount(false);
    document.getElementById("account").classList.remove(style.isChosen);
    document.getElementById("history").classList.add(style.isChosen);
    history.push("/history");
  };

  return (
    <div className={style.container}>
      <div style={{ display: "inline-block" }}>
        <div className={style.image}>
          <img
            style={{
              background: "white",
              borderRadius: "50%",
              border: "2px solid white",
            }}
            className={style.image}
            src={empty}
            alt=""
            width="64px"
          />
        </div>
        <div className={style.username}>Xin chao, Full Name</div>
      </div>
      <div
        id="account"
        style={{ display: "inline-block", margin: "20px 0 0 20px" }}
        className={account ? style.isChosen : null}
        onClick={onClickAccount}
      >
        <i className={`${style.symbol} fas fa-user`}></i>
        <div className={style.title}>Account Information</div>
      </div>
      <div
        id="history"
        style={{ display: "inline-block", margin: "20px 0 0 14px" }}
        className={account ? null : style.isChosen}
        onClick={onClickHistory}
      >
        <i className={`${style.symbol} fas fa-shopping-cart`}></i>
        <div className={style.title}>Billing History</div>
      </div>
    </div>
  );
}

export default LeftSideInfo;
