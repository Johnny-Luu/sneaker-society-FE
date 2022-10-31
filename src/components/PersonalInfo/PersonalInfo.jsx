import React, { useState } from "react";
import HistoryPart from "./HistoryPart";
import LeftSideInfo from "./LeftSideInfo";
import MainPartInfo from "./MainPartInfo";
import style from "./PersonalInfo.module.css";
import BackgroundWithPath from "../Products/BackgroundWithPath";
import { images } from "../../assets";
function PersonalInfo({ bool }) {
  const [account, setAccount] = useState(bool);

  return (
    <>
      <BackgroundWithPath
        img={images.productDetail.backgroundImageTop}
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
