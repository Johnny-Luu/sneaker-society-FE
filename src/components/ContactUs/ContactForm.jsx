import React, { Component, useRef } from "react";
import emailjs from "emailjs-com";
import style from "./ContactForm.module.css";
import ToastMessage from "../ToastMessage/ToastMessage";

const ContactForm = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_ygsinew",
        "template_9ousre8",
        form.current,
        "user_rbYAN0UsFn6FJREytlBz0"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );

    const name = document.getElementById("contactFullName");
    const email = document.getElementById("contactEmail");
    const subject = document.getElementById("contactSubject");
    const message = document.getElementById("contactMessage");
    name.value = "";
    email.value = "";
    subject.value = "";
    message.value = "";
    ToastMessage("success", "Sending successfully!!");
    ToastMessage("success", "We will reply as soon as we can!");
  };

  return (
    <form ref={form} onSubmit={sendEmail}>
      <section className={style.sectionForm}>
        <div className={style.inputInfo}>
          <input
            className={style.inputText}
            placeholder="Your full name"
            name="userName"
            id="contactFullName"
          />
          <input
            className={style.inputText}
            placeholder="Your Email"
            name="userEmail"
            id="contactEmail"
          />
        </div>

        <div className={style.inputSubject}>
          <input
            className={style.inputText}
            placeholder="Subject"
            name="subject"
            id="contactSubject"
          />

          <textarea
            className={style.inputText}
            placeholder="Some messages"
            rows="15"
            name="message"
            id="contactMessage"
          />
        </div>

        <input type="submit" value="Send us" className={style.divBtn} />
      </section>
    </form>
  );
};

export default ContactForm;
