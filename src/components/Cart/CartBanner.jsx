import React from "react";
import { Link } from 'react-router-dom';

import style from "./CartBanner.module.css"
//import cartbanner from "../../assets/images/cart/cartbanner.jpg"

const CartBanner = () =>
{
    return (
        <div className={style.cartBanner}>
            <h1 className={style.cartTitle}>SHOPPING CART</h1>
            <h2 className={style.cartPath}><Link to="/">HOME</Link> / <Link to="/cart">CART</Link></h2>
        </div>
    );
}

export default CartBanner;