import React from 'react'
import { Link } from 'react-router-dom'

import { BlogInfo } from './OurBlogData'
import cardBlogStyle from "./CardBlog.module.css"
//import ourBlogStyle from "../OurBlog/OurBlogStyle.module.css"

const CardBlog = () =>
{
    return (
        <div className={cardBlogStyle.divContainer}>

            {BlogInfo.map((item, index) => {
                return (
                    <div className={cardBlogStyle.cardBlog} key={index}>
                        <Link to={item.path}><img src={item.thumbnail} alt="" /></Link>
                        <p><time>on {item.timePost}</time></p>
                        <article><Link to="">{item.titlePost}</Link></article>
                        <p>{item.description}</p>
                    </div>
                );
            })}

        </div>
    )
}

export default CardBlog