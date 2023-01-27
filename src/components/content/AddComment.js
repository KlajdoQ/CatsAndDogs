import React, { useState } from "react";

export default function AddComment({ animal, setAnimals }) {
  const [newComment, setnewComment] = useState("");
  const [showComment, setshowComment] = useState(false);
  const [likeComment, setLikeComment] = useState({});
  const [isLikeClicked, setIsLikeClicked] = useState(false);
  const [showReply, setShowReply] = useState({});
  const [newReply, setNewReply] = useState("");

  function updateAnimals(e) {

    if (newComment) {
      fetch(`http://localhost:3000/animals/${animal.id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({
          comments: [
            ...animal.comments,
            { comment: newComment, replies: [], likes: 0 },
          ],
        }),
      })
        .then((response) => response.json())
        .then((updatedAnimals) => {
          setAnimals((prevAnimals) =>
            prevAnimals.map((currentAnimals) => {
              if (currentAnimals.id === updatedAnimals.id) {
                return updatedAnimals;
              } else {
                return currentAnimals;
              }
            })
          )
        })
    }
    handleCommentSubmit();
  }

  function handleCommentChange(event) {
    setnewComment(event.target.value);
  }

  function handleCommentSubmit(e) {
    e.preventDefault();
    if (newComment && !isLikeClicked) {
      likeComments();
      setnewComment("")
      updateAnimals();
    }
    setIsLikeClicked(false);
    setnewComment("");
    setshowComment(true);
  }
  function likeComments(index) {
    setLikeComment((prev) => {
      let newLikeComment = { ...prev };
      newLikeComment[index] = !newLikeComment[index];
      return newLikeComment;
    });
    fetch(`http://localhost:3000/animals/${animal.id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        comments: animal.comments.map((comment, i) =>
          i === index ? { ...comment, likes: comment.likes + 1 } : comment
        ),
      }),
    })
      .then((response) => response.json())
      .then((updatedAnimals) => {
        setAnimals((prevAnimals) =>
          prevAnimals.map((currentAnimals) => {
            if (currentAnimals.id === updatedAnimals.id) {
              return updatedAnimals;
            } else {
              return currentAnimals;
            }
          })
        );
      });
  }

  function showCommentReplies(commentIndex) {
    setShowReply((prev) => {
      let isCommentShown = { ...prev };
      isCommentShown[commentIndex] = !isCommentShown[commentIndex];
      return isCommentShown;
    });
  }

  function handleReplyChange(e) {
    setNewReply(e.target.value);
  }

  function handleReplySubmit(e, commentIndex) {
    e.preventDefault();

    fetch(`http://localhost:3000/animals/${animal.id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        comments: animal.comments.map((comment, i) => {
          if (i === commentIndex) {
            return {
              ...comment,
              replies: [...comment.replies, { reply: newReply }],
            };
          }
          return comment;
        }),
      }),
    })
      .then((response) => response.json())
      .then((updatedAnimals) => {
        setAnimals((prevAnimals) =>
          prevAnimals.map((currentAnimals) => {
            if (currentAnimals.id === updatedAnimals.id) {
              return updatedAnimals;
            } else {
              return currentAnimals;
            }
          })
        );
      });

    setNewReply("");
    setShowReply({});
  }

  return (
    <div>
    <form onSubmit={handleCommentSubmit}>
      {animal.comments.map((comments, commentIndex) => (
        <>
          <li
            className="comments-list"
            key={commentIndex}
            animal={animal}
            setAnimals={setAnimals}
          >
            {comments.comment}
          </li>
          <button className="like-reply" onClick={() => likeComments(commentIndex)}>
            {likeComment[commentIndex] ? "♥" : "♡"}
            Like
          </button>
          <button
            className="like-reply"
            onClick={(e) => showCommentReplies(commentIndex)}
          >
             ↳ Reply
          </button>
          <ul className="ul-replies">
            {comments.replies.map((reply, replyIndex) => (
              <li key={replyIndex} className="replies">{reply.reply}</li>
            ))}
          </ul>
          {showReply[commentIndex] ? (
            <div className="comment-form">
              <textarea
                type="text"
                value={newReply}
                onChange={handleReplyChange}
                placeholder="Write a reply..."
                className="type-reply"
              />
              <button
                className="post-comment-btn replyBtn"
                type="submit"
                onClick={(e) => handleReplySubmit(e,commentIndex)}
              >
                Reply
              </button>
            </div>
          ) : null}
        </>
      ))}
      {showComment && <li className="new-reply-li">{newComment}</li>}
      <div className="comment-form">
        <textarea
          type="text"
          value={newComment}
          onChange={handleCommentChange}
          placeholder="Write a comment..."
          className="type-comment"
          />
        <button className="post-comment-btn" type="submit">
          Post
        </button>
      </div>
    </form>
  </div>
  );
}
