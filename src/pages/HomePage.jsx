import React from "react";
import SliderHomepage from "../components/SliderHomePage/SliderHomepage";
import SliderDealOfTheWeek from "../components/SliderDealOfTheWeek/SliderDealOfTheWeek";
import CollectionItem from "../components/CollectionItem/CollectionItem";
import OurBlog from "../components/OurBlog/OurBlog";
import ServiceSection from "../components/ServiceSection/ServiceSection";
import Style from "../styles/HomePage.module.css";
import { images } from "../assets";

const HomePage = () => {
  return (
    <div className={Style.HomePageContainer}>
      <SliderHomepage />

      {/* slider Best Seller Sneaker here */}
      <SliderDealOfTheWeek />
      {/* ... */}

      {/* the first collection item */}
      <CollectionItem
        subTxtSneaker="Running Shoes"
        mainTxtSneaker="Nike Just Do It"
        sneakerImg={images.banner.firstSneaker}
        subTxtBanner="Season Off 30-10%"
        mainTxtBannerAbove="The Benefits"
        mainTxtBannerUnder="Of Running"
        bannerImg={images.banner.firstBanner}
      />

      {/* the second collection item */}
      <CollectionItem
        subTxtSneaker="Best Sellers"
        mainTxtSneaker="Adidas Shoes"
        sneakerImg={images.banner.secondSneaker}
        subTxtBanner="New Arrivals"
        mainTxtBannerAbove="Women Hoodies &"
        mainTxtBannerUnder="Sweatshirts"
        bannerImg={images.banner.secondBanner}
        reverse={true}
      />
      <OurBlog />
      <ServiceSection />
    </div>
  );
};

export default HomePage;
