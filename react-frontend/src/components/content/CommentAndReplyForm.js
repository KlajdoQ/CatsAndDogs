import React,{ useState, useEffect} from "react";
import styled from "styled-components";
import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import './CommentAndReplies.css'


export default function CommentAndReplyForm({
  handleCommentChange,
  handleCommentSubmit,
  animal,
  setAnimals,
  likeComments,
  likeComment,
  showCommentReplies,
  showReply,
  newReply,
  handleReplyChange,
  handleReplySubmit,
  newComment,
  handleCommentDelete,
  user_id
}) {
  const { user} = useContext(UserContext)
  const userImage = localStorage.getItem("userImage");

  const [replyAuthors, setReplyAuthors] = useState({})
  const [commentAuthors, setCommentAuthors] = useState({});
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/users')
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  
  useEffect(() => {
    const authors = {};
    users.forEach((user) => {
      authors[user.id] = user.full_name;
    });
    setCommentAuthors(authors)
  }, [users]);
  
  // useEffect(() => {
  //   const authors = {};
  //   users.forEach((user) => {
  //     authors[user.id] = user.full_name;
  //   });
  //   setReplyAuthors(authors)
  // }, [users]);


  // Generate unique IDs for each comment
  const generateCommentId = (index) => `comment-${index}`;
  
  // Generate unique IDs for each comment like
  const generateCommentLikeId = (commentIndex) =>
  `comment-${commentIndex}-like`;
  const generateCommentReplyId = (commentIndex, replyIndex) =>
  `comment-${commentIndex}-reply-${replyIndex}`;
  
  function handleDelete(commentIndex) {
    handleCommentDelete(commentIndex);
  }

  // This component renders a form that allows the user to submit comments and replies
  return (
<form onSubmit={(event) => handleCommentSubmit(event, user)}>
      {/* Map over the comments in the `animal` object and render a `CommentsList` component for each comment */}
      {animal.comments &&
        animal.comments?.map((comment, commentIndex) => (
          <div key={generateCommentId(commentIndex)}>
            <div className='imgAuthor'>
                {/* <div className='author'>
                {userImage && (<img className="commentator" src={userImage} alt="User"/>)}   
                </div> */}
                <div className="comments-list" 
                  animal={animal} 
                  setAnimals={setAnimals}>
                  <div className='commentAuthor'>
                    {commentAuthors[comment.user_id] || `User ${comment.user_id}`} 
                  </div>
                  <div className="userImgComment">
                    {comment.comment}
                  </div>
                </div>
            </div>
            <LikeReply
              key={generateCommentLikeId(commentIndex)}
              onClick={() => likeComments(commentIndex)}
            >
              {/* Display a heart icon depending on whether the comment has been liked */}
              <div className='likeBtn'>
                {likeComment ? "???" : "???"} {comment.likes} Like
              </div>
            </LikeReply>
            <LikeReply onClick={(e) => showCommentReplies(commentIndex)}>
              ??? Reply
            </LikeReply>
            <LikeReply onClick={(e) => handleDelete(commentIndex)}>
                {user_id === comment.user_id && <>&#9746; Delete</>}
            </LikeReply>
            <ul>
              {comment.replies && Array.isArray(comment.replies) && comment.replies.length > 0
                ? comment.replies.map((reply, replyIndex) => (
                    <Replies
                      key={generateCommentReplyId(commentIndex, replyIndex)}
                    >
                     {reply.reply}
                    </Replies>
                  ))
                : null}
            </ul>

            {/* If `showReply[commentIndex]` is truthy, render a form for submitting a reply to the comment */}
            {showReply[commentIndex] ? (
              <CommentForm>
                <TypeReply
                  type="text"
                  value={newReply}
                  onChange={handleReplyChange}
                  placeholder="Write a reply..."
                />
                <PostCommentBtn
                  className="replyBtn"
                  type="submit"
                  onClick={(e) => handleReplySubmit(e, commentIndex)}
                >
                  Reply
                </PostCommentBtn>
              </CommentForm>
            ) : null}
          </div>
        ))}
      {/* If `showComment` is truthy and there is text on the textarea, render the new comment */}
      {/* {showComment && newComment && <NewReplyLi key="new-comment">{newComment}</NewReplyLi>} */}
      <div className="comment-form">
        <textarea
          type="text"
          value={newComment}
          onChange={handleCommentChange}
          placeholder="Write a comment..."
          className="type-comment"
        />
        <PostCommentBtn key="post-comment" type="submit">
          Post
        </PostCommentBtn>
      </div>
    </form>
  );
}

/*******************************
 *   STYLED COMPONENTS          *
 *******************************/


const LikeReply = styled.button`
  border: none;
  font-size: 12px;
  margin-left: 30px;
  margin-bottom: 10px;
  background-color: white;
  font-weight: 500;
`;

const Replies = styled.li`
  list-style: none;
  border-radius: 20px;
  padding: 5px 10px;
  margin: 5px;
  width: 350px;
  margin-left: 50px;
  background-color: rgb(242, 244, 246);
`;

const CommentForm = styled.div`
  display: flex;
  align-items: center;

`;

const PostCommentBtn = styled.button`
  width: 60px;
  height: 35px;
  background-color: rgb(104, 104, 201);
  color: white;
  border-radius: 5px;
  border: none;
  margin-bottom:5px;
`;

const TypeReply = styled.textarea`
  margin-left: 100px;
  font-size: 12px;
  margin-right: 20px;
  height: 30px;
  width: 200px;
`;