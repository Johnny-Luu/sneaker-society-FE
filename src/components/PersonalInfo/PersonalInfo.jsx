import React, { useState } from "react";
import HistoryPart from "./HistoryPart";
import LeftSideInfo from "./LeftSideInfo";
import MainPartInfo from "./MainPartInfo";
import style from "./PersonalInfo.module.css";
import BackgroundWithPath from "../Products/BackgroundWithPath";
import backgroundImageTop from "../../assets/images/productDetail/detail-product-bg.jpg";
//../assets/images/productDetail/detail-product-bg.jpg
function PersonalInfo({ bool }) {
  const [account, setAccount] = useState(bool);

  return (
    <>
      <BackgroundWithPath
        img={backgroundImageTop}
        pathText={account ? "Home/ account" : "Home/ history"}
        title={account ? "My information" : "Billing History"}
      />

      <div className={style.row}>
        <LeftSideInfo account={account} setAccount={setAccount} />
        {account ? <MainPartInfo /> : <HistoryPart />}
      </div>
    </>
  );
}

export default PersonalInfo;
