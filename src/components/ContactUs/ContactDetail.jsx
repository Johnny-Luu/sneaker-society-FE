import React, { Component } from 'react'

import style from "./ContactDetail.module.css"

import homeaddress from "../../assets/images/contact/home_address.png"
import phonecall from "../../assets/images/contact/phonecall.png"
import email from "../../assets/images/contact/email.png"
import clock from "../../assets/images/contact/clock.png"

const ContactDetail = () =>
{
    return (
        <section className={style.sectionContact}>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                In eum modi eligendi sequi laboriosam cum unde corporis quod, impedit rerum,
                incidunt assumenda maiores placeat. Temporibus esse in enim quas odit?</p>
            
            <div className={style.divInfo}>
                <div>
                    <img src={homeaddress} alt="" />
                    <p><b>Address:</b> &nbsp; 1234 Heaven Stress, Beverly Hill.</p>
                </div>
                <div>
                    <img src={phonecall} alt="" />
                    <p><b>Telephone:</b> &nbsp; +01 234 567 89</p>
                </div>
                <div>
                    <img src={email} alt="" />
                    <p><b>Email:</b> &nbsp; info@pixelcreative.com</p>
                </div>
                <div>
                    <img src={clock} alt="" />
                    <p><b>Open Door:</b> &nbsp; 8:00 - 19:00, Monday - Saturday</p>
                </div>
            </div>
        </section>
    )
}

export default ContactDetail;