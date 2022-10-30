import React from "react";
import backgroundImageTop from "../assets/images/productDetail/detail-product-bg.jpg";
import { Link } from "react-router-dom";
import style from "../pageStyle/AboutUsPage.module.css";
import ServiceSection from "../components/ServiceSection/ServiceSection";
import backgroundImage from "../assets/images/contactus2.jpg";
import BackgroundWithPath from "../components/Products/BackgroundWithPath";
import tuyen from "../assets/images/aboutus/tuyen.jpg";
import sang from "../assets/images/aboutus/sang.jpg";
import hien from "../assets/images/aboutus/team3.jpg";

function AboutUsPage() {
  return (
    <>
      <BackgroundWithPath
        img={backgroundImageTop}
        title="About Us"
        pathText="Home / About us"
      />
      <div className={style.history}>
        <div className={style.left_title_info}>
          <p className={style.sub_title}>History Since 2021</p>
          <h2 className={style.title}>
            Welcome to Michelie Shop Amazing Fashion.
          </h2>
          <span className={style.text}>
            Maecenas sed diam eget risus varius blandit sit amet non magna.
            Integer posuere erat a ante venenatis dapibus posuere velit aliquet.
          </span>
        </div>
        <div className={style.right_title_info}>
          <p className={style.text}>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
            Cras mattis consectetur purus sit amet fermentum. Sed posuere
            consectetur est at lobortis. Nullam id dolor id nibh ultricies
            vehicula ut id elit.
          </p>
          <p className={style.text}>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium.
          </p>
        </div>
      </div>
      <div className={style.image_container}>
        <img className={style.image} src={backgroundImageTop} alt="middle" />
      </div>
      <ServiceSection />
      <div className={style.introduce_team}>
        <h2 className={style.title_team}>Our Teams</h2>
        <div className={style.team_member}>
          <div className={style.team_member_card}>
            <div className={style.team_member_img}>
              <img src={sang} className={style.team_member_image}></img>
            </div>
            <div className={style.team_member_info}>
              <p className={style.team_name}>Lưu Ngọc Sáng</p>
            </div>
          </div>
          <div className={style.team_member_card}>
            <div className={style.team_member_img}>
              <img src={tuyen} className={style.team_member_image}></img>
            </div>
            <div className={style.team_member_info}>
              <p className={style.team_name}>Phạm Hớn Tuyền</p>
            </div>
          </div>
          <div className={style.team_member_card}>
            <div className={style.team_member_img}>
              <img src={hien} className={style.team_member_image}></img>
            </div>
            <div className={style.team_member_info}>
              <p className={style.team_name}>Trần Thanh Hiền</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutUsPage;
