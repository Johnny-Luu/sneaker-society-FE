import React from "react";
import empty from "../../assets/images/empty.jpg";
import style from "./ModalAccount.module.css";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { logout } from "../../features/customerSlice";
import ToastMessage from "../ToastMessage/ToastMessage";

function ModalAccount() {
  const dispatch = useDispatch();
  const history = useHistory();
  const onHover = () => {
    document
      .getElementsByClassName(style.modal)[0]
      .classList.remove(style.modalHidden);
  };
  const onNotHover = () => {
    document
      .getElementsByClassName(style.modal)[0]
      .classList.add(style.modalHidden);
  };

  const onClickAccount = () => {
    history.push("/account");
  };
  const onClickHistory = () => {
    history.push("/history");
  };

  function handleLogout() {
    dispatch(logout());
    history.push("/");
    ToastMessage("success", "logout successfully!");
  }

  return (
    <div className={style.container} onMouseLeave={onNotHover}>
      <img
        style={{
          background: "white",
          borderRadius: "50%",
          border: "1px solid white",
        }}
        src={empty}
        alt=""
        width="24px"
        className={style.image}
        onMouseOver={onHover}
      />
      <div className={`${style.modal} ${style.modalHidden}`}>
        <div onClick={onClickAccount}>My Information</div>
        <div onClick={onClickHistory}>Billing History</div>
        <div onClick={handleLogout}>
          Log Out
          <i style={{ marginLeft: "5px" }} className="fas fa-sign-out-alt"></i>
        </div>
      </div>
    </div>
  );
}

export default ModalAccount;
