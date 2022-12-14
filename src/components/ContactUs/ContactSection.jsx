import React from "react";
import { Link } from "react-router-dom";
import ContactDetail from "./ContactDetail";
import ContactForm from "./ContactForm";
import style from "./ContactSection.module.css";
import ServiceSection from "../ServiceSection/ServiceSection.jsx";
import { images } from "../../assets";

const ContactSection = () => {
  return (
    <section className={style.contact}>
      <div className={style.sectionContact}>
        <div className={style.divContact}>
          <h1>Contact Detail</h1>
          <ContactDetail />
        </div>

        <div className={style.divForm}>
          <h1>Get in touch with us</h1>
          <ContactForm />
        </div>
      </div>

      <div className={style.divImg}>
        <Link to="">
          <img src={images.contact.googlemap} alt="A demo map" />
        </Link>
      </div>

      <div>
        <ServiceSection />
      </div>
    </section>
  );
};

export default ContactSection;
