import React from "react";
import SliderHomepage from "../components/SliderHomePage/SliderHomepage";
import SliderDealOfTheWeek from "../components/SliderDealOfTheWeek/SliderDealOfTheWeek";
import CollectionItem from "../components/CollectionItem/CollectionItem";
import BannerFirst from "../assets/images/banner/banner-homepage-1.jpg";
import BannerSecond from "../assets/images/banner/banner-homepage-2.jpg";
import SneakerFirst from "../assets/images/banner/sneaker-homepage-1.jpg";
import SneakerSecond from "../assets/images/banner/sneaker-homepage-2.jpg";
import OurBlog from "../components/OurBlog/OurBlog";
import ServiceSection from "../components/ServiceSection/ServiceSection";
import Style from "../pageStyle/HomePage.module.css";

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
        sneakerImg={SneakerFirst}
        subTxtBanner="Season Off 30-10%"
        mainTxtBannerAbove="The Benefits"
        mainTxtBannerUnder="Of Running"
        bannerImg={BannerFirst}
      />

      {/* the second collection item */}
      <CollectionItem
        subTxtSneaker="Best Sellers"
        mainTxtSneaker="Adidas Shoes"
        sneakerImg={SneakerSecond}
        subTxtBanner="New Arrivals"
        mainTxtBannerAbove="Women Hoodies &"
        mainTxtBannerUnder="Sweatshirts"
        bannerImg={BannerSecond}
        reverse={true}
      />
      <OurBlog />
      <ServiceSection />
    </div>
  );
};

export default HomePage;
