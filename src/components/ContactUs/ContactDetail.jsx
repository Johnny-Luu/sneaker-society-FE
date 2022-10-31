import React, { Component } from "react";
import style from "./ContactDetail.module.css";
import { images } from "../../assets";

const ContactDetail = () => {
  return (
    <section className={style.sectionContact}>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. In eum modi
        eligendi sequi laboriosam cum unde corporis quod, impedit rerum,
        incidunt assumenda maiores placeat. Temporibus esse in enim quas odit?
      </p>

      <div className={style.divInfo}>
        <div>
          <img src={images.contact.homeaddress} alt="" />
          <p>
            <b>Address:</b> &nbsp; 1234 Heaven Stress, Beverly Hill.
          </p>
        </div>
        <div>
          <img src={images.contact.phonecall} alt="" />
          <p>
            <b>Telephone:</b> &nbsp; +01 234 567 89
          </p>
        </div>
        <div>
          <img src={images.contact.email} alt="" />
          <p>
            <b>Email:</b> &nbsp; info@pixelcreative.com
          </p>
        </div>
        <div>
          <img src={images.contact.clock} alt="" />
          <p>
            <b>Open Door:</b> &nbsp; 8:00 - 19:00, Monday - Saturday
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactDetail;
