import React from 'react'
import BackGround from '../../assets/images/productDetail/detail-product-bg.jpg'
import style from './BackGroundImg.module.css'

function BackGroundImg() {
     return (
          <div className={style.bgContainer}>
               <img src={BackGround}/>
          </div>
     )
}

export default BackGroundImg