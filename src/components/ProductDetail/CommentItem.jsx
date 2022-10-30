import style from './CommentItem.module.css';
import avatarImg from '../../assets/images/img_avatar.png';

function CommentItem({ 
     customerID,
     customerName,
     comment,
     rating,
     time,
 }) {

     return (
          <div className={style.mainContainer}>
               <img className={style.avatar} src={avatarImg} alt="avatar" />
               <div className={style.infoContainer}>
                    <h2 className={style.name}>{customerName === '' ? 'Anonymous' : customerName}</h2>

                    <div className={style.ratingAndDate}>
                         {
                              Array(5).fill(1).map((e, i) => {
                                   if (i < rating) {
                                        return <i className="fas fa-star" key={i}></i>
                                   } else {
                                        return <i className="far fa-star" key={i}></i>
                                   }
                              })
                         }
                         <p className={style.date}>{time}</p>
                    </div>

                    <p className={style.content}>{comment}</p>
               </div>
          </div>
     );
}

export default CommentItem;