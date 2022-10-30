import React, { Component } from 'react'

import ourBlogStyle from "./OurBlogStyle.module.css"
import CardBlog from '../CardBlog/CardBlog'

// export class OurBlog extends Component {
//     render() {
//         return (
//             <section className={ourBlogStyle.sectionContainer}>
//                 <div className={ourBlogStyle.headerBlog}>
//                     <h1>Our Blog</h1>
//                 </div>

//                 <div className={ourBlogStyle.separator}>
//                     <span> <b>&#x02666;</b> </span>
//                 </div>

//                 <div className={ourBlogStyle.divContainer}>

//                     {BlogInfo.map((item, index) => {
//                         return (
//                             <div className={ourBlogStyle.cardBlog}>
//                                 <a href={item.path}><img src={item.thumbnail} alt="" /></a>
//                                 <p><time>on {item.timePost}</time></p>
//                                 <article><a href="">{ item.titlePost }</a></article>
//                                 <p>{ item.description }</p>
//                             </div>
//                         );
//                     })}

//                 </div>
//             </section>
//         )
//     }
// }

const OurBlog = () =>
{
    return (
        <section className={ourBlogStyle.sectionContainer}>
            <div className={ourBlogStyle.headerBlog}>
                <h1>Our Blog</h1>
            </div>

            <div className={ourBlogStyle.separator}>
                <span> <b>&#x02666;</b> </span>
            </div>

            <CardBlog />
            
        </section>
    )
}

export default OurBlog
