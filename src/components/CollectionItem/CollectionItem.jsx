import style from "./CollectionItem.module.css";
import { Link } from "react-router-dom";

function CollectionItem({
  subTxtSneaker,
  mainTxtSneaker,
  sneakerImg,
  subTxtBanner,
  mainTxtBannerAbove,
  mainTxtBannerUnder,
  bannerImg,
  reverse = false,
}) {
  return (
    <div
      className={
        reverse
          ? `${style.collectionContainer} ${style.reverseLayout}`
          : style.collectionContainer
      }
    >
      <div className={style.itemSneaker}>
        <Link className={style.itemLink} to="/product">
          <img
            className={style.itemImgSneaker}
            src={sneakerImg}
            alt="sneaker"
          />
          <div className={style.sneakerText}>
            <h5>{subTxtSneaker}</h5>
            <h2>{mainTxtSneaker}</h2>
          </div>
        </Link>
      </div>

      <div className={style.itemBanner}>
        <Link className={style.itemLink} to="/product">
          <img className={style.itemImgBanner} src={bannerImg} alt="banner" />
        </Link>

        <div
          className={
            reverse
              ? `${style.bannerText} ${style.bannerTextRight}`
              : style.bannerText
          }
        >
          <h2>
            {mainTxtBannerAbove}
            <br />
            {mainTxtBannerUnder}
          </h2>
          <h5>{subTxtBanner}</h5>
          <Link className={style.bannerBtn} to="/product">
            More Info
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CollectionItem;
