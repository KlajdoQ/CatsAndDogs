import React, { useState } from "react";
import CommentAndReplyForm from './CommentAndReplyForm'

export default function AddComment({ animal, setAnimals }) {
    // state to keep track of the new comment being added
  const [newComment, setnewComment] = useState("");
    // state to determine if the comment form is displayed
  const [showComment, setshowComment] = useState(false);
    // state to keep track of the like status of a comment
  const [likeComment, setLikeComment] = useState({});
    // state to determine if a comment has been liked
  const [isLikeClicked, setIsLikeClicked] = useState(false);
    // state to keep track of the replies to a comment
  const [showReply, setShowReply] = useState({});
  const [newReply, setNewReply] = useState("")

  // update the animal state in the parent component with a new comment and also update the backend 
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

  // function to handle the change in the comment input
  function handleCommentChange(event) {
    setnewComment(event.target.value);
  }

    // function to submit the comment
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

    // function to like a comment and update the json file 
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

  // function to show the comments when the comment is clicked 
  function showCommentReplies(commentIndex) {
    setShowReply((prev) => {
      let isCommentShown = { ...prev };
      isCommentShown[commentIndex] = !isCommentShown[commentIndex];
      return isCommentShown;
    });
  }

  //function to assign the state change to the reply 
  function handleReplyChange(e) {
    setNewReply(e.target.value);
  }

    // update the reply state in the parent component with a new reply and also update the backend 
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
