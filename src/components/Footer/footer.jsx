import React, { Component } from "react";
import footerCSS from "./footerStyle.module.css";
import { Link } from "react-router-dom";
import { images } from "../../assets";

export class Footer extends Component {
  render() {
    return (
      <footer className={footerCSS.container}>
        <div className={`${footerCSS.colInfo}`}>
          <div className={`${footerCSS.colUpper}`}>
            <ul>
              <li>
                <Link to="">FIND A STORE</Link>
              </li>
              <li>
                <Link to="">BECOME A MEMBER</Link>
              </li>
              <li>
                <Link to="">SIGNUP FOR EMAIL</Link>
              </li>
              <li>
                <Link to="/contact">SEND US FEEDBACK</Link>
              </li>
            </ul>
          </div>

          <div className={footerCSS.col}>
            <ul>
              <li>
                <Link to="">GET HELP</Link>
              </li>
              <li>
                <Link to="">Order status</Link>
              </li>
              <li>
                <Link to="">Delivery</Link>
              </li>
              <li>
                <Link to="">Return</Link>
              </li>
              <li>
                <Link to="">Payment options</Link>
              </li>
              <li>
                <Link to="">Contact us</Link>
              </li>
            </ul>
          </div>
          <div className={footerCSS.col}>
            <ul>
              <li>
                <Link to="/about-us">ABOUT US</Link>
              </li>
              <li>
                <Link to="">News</Link>
              </li>
              <li>
                <Link to="">Careers</Link>
              </li>
              <li>
                <Link to="">Investors</Link>
              </li>
              <li>
                <Link to="">Sustainability</Link>
              </li>
            </ul>
          </div>
          <div className={footerCSS.col}>
            <ul>
              <li>
                <Link to="">POLICY</Link>
              </li>
              <li>
                <Link to="">Return policy</Link>
              </li>
              <li>
                <Link to="">Check orders</Link>
              </li>
              <li>
                <Link to="">Payment policy</Link>
              </li>
              <li>
                <Link to="">Ordering guide</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className={`${footerCSS.trademarks}`}>
          <div className={footerCSS.row}>
            <ul className={footerCSS.icon}>
              <li>
                <Link to="">
                  <img src={images.footer.instagram} alt="" />
                </Link>
              </li>
              <li>
                <Link to="">
                  <img src={images.footer.facebook} alt="" />
                </Link>
              </li>
              <li>
                <Link to="">
                  <img src={images.footer.twitter} alt="" />
                </Link>
              </li>
            </ul>
          </div>
          <div className={footerCSS.row}>
            &copy; 2021 BRAND, Inc. All Rights Reserved
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
