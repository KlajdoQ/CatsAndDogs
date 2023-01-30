import React, { useState } from "react";
import CommentAndReplyForm from './CommentAndReplyForm'

export default function AddComment({ animal, setAnimals }) {
  const [newComment, setnewComment] = useState("");
  const [showComment, setshowComment] = useState(false);
  const [likeComment, setLikeComment] = useState({});
  const [isLikeClicked, setIsLikeClicked] = useState(false);
  const [showReply, setShowReply] = useState({});
  const [newReply, setNewReply] = useState("")


  function updateAnimals() {
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
    <CommentAndReplyForm 
      handleCommentSubmit={handleCommentSubmit}
      animal={animal}
      setAnimals={setAnimals}
      likeComments={likeComments}
      likeComment={likeComment}
      showCommentReplies={showCommentReplies}
      showReply={showReply}
      newReply={newReply}
      handleReplyChange={handleReplyChange}
      newComment={newComment}
      handleCommentChange={handleCommentChange}
      handleReplySubmit={handleReplySubmit}
      showComment={showComment}
    />
  );
}
