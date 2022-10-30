import style from './CmtAndRating.module.css'
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { selectCustomer } from '../../features/customerSlice'
import CommentItem from './CommentItem';
import Nike1 from '../../assets/images/sneaker-transparent/nike-1.png'
import ReactStars from "react-rating-stars-component";
import { Bar } from 'react-chartjs-2';
import ToastMessage from "../ToastMessage/ToastMessage";

import {
     getAll,
     getOneByCustomer,
     createComment,
     updateComment,
     deleteComment,
} from '../../api/commentAPI'

import {
     Chart as ChartJS,
     CategoryScale,
     LinearScale,
     BarElement,
     Title,
     Tooltip,
     Legend,
} from 'chart.js';

ChartJS.register(
     CategoryScale,
     LinearScale,
     BarElement,
     // Title,
     Tooltip,
     // Legend
);

const options = {
     indexAxis: 'y',
     responsive: true,
     maintainAspectRatio: false,
     scales: {
          x: {
               grid: {
                    display: false
               }
          },
          y:
          {
               grid: {
                    display: false
               }
          }
     }
};

const labels = ['5', '4', '3', '2', '1'];

var data = {
     labels,
     datasets: [
          {
               label: 'Vote',
               data: [],
               backgroundColor: [
                    'rgb(174, 216, 136)',
                    'rgb(121, 201, 161)',
                    'rgb(255, 217, 53)',
                    'rgb(255, 178, 53)',
                    'rgb(255, 140, 90)'
               ],
          },
     ],
};

function CmtAndRating({ id }) {

     console.log(data.datasets[0].data)

     const customer = useSelector(selectCustomer)

     const [openModal, setopenModal] = useState(false);
     const [ratingVote, setRatingVote] = useState(0);
     const [ratingText, setRatingText] = useState('');
     const [comment, setComment] = useState('');

     const [commentList, setCommentList] = useState([]);
     const [ratingPoint, setRatingPoint] = useState(0);
     const [ratingCount, setRatingCount] = useState(0);

     const [yourComment, setYourComment] = useState();

     const ratingChanged = (newRating) => {
          setRatingVote(newRating);
          displayRatingText(newRating);
     };

     const displayRatingText = (newRating) => {
          switch (newRating) {
               case 1:
                    setRatingText('Awful');
                    break;
               case 2:
                    setRatingText('Bad');
                    break;
               case 3:
                    setRatingText('Normal');
                    break;
               case 4:
                    setRatingText('Good');
                    break;
               case 5:
                    setRatingText('Excellent');
                    break;
               default:
                    setRatingText('');
          }
     }

     const handleOpenModal = () => {
          if (customer) {
               setopenModal(!openModal);
               setRatingText('');
          }
          else {
               ToastMessage('error', 'Please login to rating or comment');
          }
     };

     const handleCommentSubmit = async () => {
          if (ratingVote === 0) {
               ToastMessage('error', 'Rating this product!');
               return;
          }

          var customerID = customer.id;
          var customerName = customer.name;
          var productID = id;
          var commentText = comment;
          var rating = ratingVote;
          var time = getCurrentDate();

          // create new if current your comment is null
          // and update if current your comment is exist
          if (yourComment) {
               updateCurrentComment(customerID, productID, commentText, rating, time)
          }
          else {
               createNewComment(customerID, customerName, productID, commentText, rating, time)
          }
     }

     const handleDeleteComment = async () => {
          await deleteComment(customer.id, id)
          .then(res => {
               ToastMessage('success', 'Delete comment successfully');

               // update current comment list
               setCommentList(
                    commentList.filter(comment => comment._id !== yourComment._id)
               )

               
               // update current rating point
               calculateRatingPoint(
                    commentList.filter(comment => comment._id !== yourComment._id)
               )

               // update current your comment
               setYourComment(null)

               // update current comment text
               setComment('')
          })
          .catch(err => {
               ToastMessage('error', 'Delete comment failed');
               console.log(err)
          })
     }

     const createNewComment = async (customerID, customerName, productID, commentText, rating, time) => {
          await createComment(customerID, customerName, productID, commentText, rating, time)
               .then(res => {
                    ToastMessage('success', 'Comment submitted');
                    setopenModal(!openModal);
                    setRatingVote(0);
                    setRatingText('');

                    // update current comment list
                    setCommentList(
                         [
                              ...commentList,
                              {
                                   customerID: customerID,
                                   customerName: customer.name,
                                   productID: productID,
                                   comment: commentText,
                                   rating: rating,
                                   time: time
                              }
                         ]
                    );

                    // update current your comment
                    setYourComment({
                         customerID: customerID,
                         customerName: customer.name,
                         productID: productID,
                         comment: commentText,
                         rating: rating,
                         time: time
                    });

                    // update current rating point
                    calculateRatingPoint([
                         ...commentList,
                         {
                              customerID: customerID,
                              customerName: customer.name,
                              productID: productID,
                              comment: commentText,
                              rating: rating,
                              time: time
                         }
                    ]);
               })
               .catch(err => {
                    ToastMessage('error', 'Comment failed');
                    console.log(err);
               });
     }

     const updateCurrentComment = async (customerID, productID, commentText, rating, time) => {
          await updateComment(customerID, productID, commentText, rating, time)
               .then(res => {
                    ToastMessage('success', 'Comment updated successfully!');
                    setopenModal(!openModal);
                    setRatingVote(0);
                    setRatingText('');

                    // update current comment list
                    setCommentList(
                         commentList.map(comment => {
                              if (comment.customerID === customerID && comment.productID === productID) {
                                   return {
                                        customerID: customerID,
                                        customerName: customer.name,
                                        productID: productID,
                                        comment: commentText,
                                        rating: rating,
                                        time: time
                                   }
                              }
                              else {
                                   return comment;
                              }
                         })
                    );

                    // update current your comment
                    setYourComment({
                         customerID: customerID,
                         customerName: customer.name,
                         productID: productID,
                         comment: commentText,
                         rating: rating,
                         time: time
                    });

                    // update current rating point
                    calculateRatingPoint(
                         commentList.map(comment => {
                              if (comment.customerID === customerID && comment.productID === productID) {
                                   return {
                                        customerID: customerID,
                                        customerName: customer.name,
                                        productID: productID,
                                        comment: commentText,
                                        rating: rating,
                                        time: time
                                   }
                              }
                              else {
                                   return comment;
                              }
                         })
                    );
               })
               .catch(err => {
                    ToastMessage('error', 'Comment update failed');
                    console.log(err);
               });
     }

     const calculateRatingPoint = (list) => {

          if (list.length === 0) {
               setRatingPoint(0);
               setRatingCount(0);
               return;
          }

          let sum = 0;
          let countOne = 0;
          let countTwo = 0;
          let countThree = 0;
          let countFour = 0;
          let countFive = 0;

          list.forEach(comment => {
               sum += comment.rating;

               switch (comment.rating) {
                    case 1:
                         countOne++;
                         break;
                    case 2:
                         countTwo++;
                         break;
                    case 3:
                         countThree++;
                         break;
                    case 4:
                         countFour++;
                         break;
                    case 5:
                         countFive++;
                         break;
                    default:
                         break;
               }
          });

          data = {
               labels,
               datasets: [
                    {
                         label: 'Vote',
                         data: [countFive, countFour, countThree, countTwo, countOne],
                         backgroundColor: [
                              'rgb(174, 216, 136)',
                              'rgb(121, 201, 161)',
                              'rgb(255, 217, 53)',
                              'rgb(255, 178, 53)',
                              'rgb(255, 140, 90)'
                         ],
                    },
               ],
          }

          var avgRating = sum / list.length;
          setRatingPoint(Math.round(avgRating * 10) / 10);
          setRatingCount(list.length);
     }

     const getCurrentDate = () => {
          var today = new Date();
          return today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
     }

     useEffect(() => {
          // get all comment of this product
          getAll(id)
          .then(res => {
               setCommentList(res);
               calculateRatingPoint(res);
          })
          .catch(err => {
               console.log(err);
          });

          // get comment of current customer about this product
          if (customer) {
               getOneByCustomer(id, customer.id)
                    .then(res => {
                         if (res) {
                              setYourComment(res);
                              setComment(res.comment);
                              displayRatingText(res.rating);
                         }
                    })
                    .catch(err => {
                         console.log(err);
                    });
          }
     }, [customer]);

     return (
     <div className={style.outerContainer}>
          <h2 className={style.titleText}>Comments and Rating</h2>
          <div className={style.mainContainer}>
               <div className={style.ratingSection}>
                    <div className={style.ratingInfo}>
                         <h2 className={style.ratingTotalPoint}>{ratingPoint}</h2>
                         <p className={style.ratingTotalText}>Total: {ratingCount}</p>
                    </div>

                    <div className={style.ratingChart}>
                         <Bar options={options} data={data} />
                    </div>
               </div>

               <div className={style.yourCommentSection}>
                    <h3 className={style.yourCommentTitle}>Your Comment</h3>
                    <div className={style.yourCommentbtn}>
                              {yourComment && <button className={style.delCommentButton} onClick={handleDeleteComment}>Delete comment</button>}
                         <button className={style.yourCommentButton} onClick={handleOpenModal}>{yourComment ? 'Edit comment' : 'Leave a comment'}</button>
                    </div>
                    {openModal && 
                         <div className={style.yourCommentModal} onClick={handleOpenModal}>
                              <div className={style.modalContainer} onClick={e => {
                                   e.preventDefault()
                                   e.stopPropagation()
                              }}>
                                   <h2 className={style.modalHeader}>Leave Your Comment Here!</h2>
                                   <div className={style.modalContent}>
                                        <p className={style.modalContentText}>Just public your comment to everyone, let's the others know what do you think about this product. Remember, everyone can see your public information like name, avatar, time you write this comment.</p>

                                        <div className={style.modalMainSection}>
                                             {/* 
                                                  Product's img and name
                                                  <div className={style.modalThumb}>
                                                       <img className={style.modalThumbImg} src={Nike1} alt="thumb" />
                                                       <h4 className={style.modalThumbName}>Nike Pegasus</h4>
                                                  </div>
                                             */}

                                             <textarea 
                                                  className={style.modalContentInput} 
                                                  type="text" 
                                                  placeholder="Write something..." 
                                                  value={comment}
                                                  onChange={e => setComment(e.target.value)}
                                             />
                                        </div>

                                        <ReactStars
                                             classNames={style.modalRating}
                                             count={5}
                                             value={yourComment ? yourComment.rating : 0}
                                             onChange={ratingChanged}
                                             size={24}
                                             activeColor="#ffd700"
                                        />

                                        <p className={style.modalRatingText}>{ratingText}</p>

                                        <div className={style.modalButtonSection}>
                                             <button className={style.modalButtonCancel} onClick={handleOpenModal}>Cancel</button>
                                             <button className={style.modalButtonSubmit} onClick={handleCommentSubmit}>Submit</button>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    }
               </div>

               <div className={style.commentSection}>
                    {
                         yourComment 
                              ? 
                              <CommentItem 
                                   customerID={yourComment.customerID} 
                                   customerName={yourComment.customerName}
                                   comment={yourComment.comment}
                                   rating={yourComment.rating}
                                   time={yourComment.time}
                              />
                              :
                              <h2 className={style.noComment}>No comment yet</h2>
                    }
               </div>

               <h3 className={style.allCommentTitle}>All Comments</h3>
               <div className={style.commentSection}>  
                         {commentList.map((comment, index) => (
                              <CommentItem
                                   key={index}
                                   customerID={comment.customerID}
                                   customerName={comment.customerName}
                                   comment={comment.comment}
                                   rating={comment.rating}
                                   time={comment.time}
                              />
                         ))}
               </div>
          </div>
     </div>
     );
}

export default CmtAndRating;