import React from "react";
import styled from 'styled-components'

export default function CommentAndReplyForm({handleCommentChange, 
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
    showComment, 
    newComment}) {

  // This component renders a form that allows the user to submit comments and replies   
  return (
    <form onSubmit={handleCommentSubmit}>
      {/* Map over the comments in the `animal` object and render a `CommentsList` component for each comment */}
      {animal.comments.map((comments, commentIndex) => (
        <>
          <CommentsList
            key={commentIndex}
            animal={animal}
            setAnimals={setAnimals}
          >
            {comments.comment}
          </CommentsList>
          <LikeReply
            onClick={() => likeComments(commentIndex)}
          >
          {/* Display a heart icon depending on whether the comment has been liked */}
          {likeComment[commentIndex] ? "♥" : "♡"} {comments.likes} Likes
          </LikeReply>
          <LikeReply
            onClick={(e) => showCommentReplies(commentIndex)}
          >
            ↳ Reply
          </LikeReply>
          <ul>
            {comments.replies.map((reply, replyIndex) => (
              <Replies key={replyIndex} >
                {reply.reply}
              </Replies>
            ))}
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
        </>
      ))}
      {/* If `showComment` is truthy and there is text on the textarea, render the new comment */}
      {showComment && <NewReplyLi>{newComment}</NewReplyLi>}
      <div className="comment-form">
        <textarea
          type="text"
          value={newComment}
          onChange={handleCommentChange}
          placeholder="Write a comment..."
          className="type-comment"
        />
        <PostCommentBtn  type="submit">
          Post
        </PostCommentBtn>
      </div>
    </form>
  );
}

/*******************************
*   STYLED COMPONENTS          *
*******************************/
const CommentsList = styled.li`
  list-style: none;
  background-color: rgb(243, 243, 243);
  height:auto;
  padding:10px;
  margin:20px;
  display:flex;
  align-items: center;
  border-radius:10px;
  margin-bottom:-4px;
`;

const LikeReply = styled.button`
  border:none;
  font-size:12px;
  margin-left:30px;
  margin-bottom:10px;
  background-color: white;
  font-weight: 500;
`;

const Replies = styled.li`
  list-style: none;
  border-radius:20px;
  padding: 5px 10px;
  margin:5px;
  width:350px;
  margin-left:50px;
  background-color: rgb(242, 244, 246);
`;

const CommentForm = styled.div`
  display: flex;
  align-items: center;
`;

const PostCommentBtn = styled.button`
  width:70px;
  height:40px;
  background-color: rgb(104, 104, 201);
  color:white;
  border-radius: 5px;
  border:none;
`;

const TypeReply = styled.textarea`
  margin-left:100px;
  font-size:12px;
  margin-right:20px;
  height:30px;
  width:200px;
`;

const NewReplyLi = styled.li`
  list-style:none;
`;

