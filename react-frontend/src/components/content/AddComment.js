import React, { useState } from "react";
import CommentAndReplyForm from "./CommentAndReplyForm";
import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

export default function AddComment({ animal, setAnimals }) {
  // state to keep track of the new comment being added
  const [newComment, setnewComment] = useState("");
  // state to determine if the comment form is displayed
  const [showComment, setshowComment] = useState(false);
  // state to keep track of the like status of a comment
  const [likeComment, setLikeComment] = useState([]);

  // update the animal state in the parent component with a new comment and also update the backend
  const [showReply, setShowReply] = useState(animal.comments ? Array(animal.comments.length).fill(false) : []);
  const [newReply, setNewReply] = useState(animal.comments ? Array(animal.comments.length).fill("") : []);
  const { user} = useContext(UserContext)

  function handleCommentSubmit(event) {
    event.preventDefault();
    if (newComment) {
      const requestBody = { comment: { comment: newComment, user_id: user.id } };
      fetch(`http://localhost:3000/animals/${animal.id}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(requestBody),
      })
        .then((response) => response.json())
        .then((newComment) => {
          setAnimals((prevAnimals) =>
            prevAnimals.map((currentAnimal) => {
              if (currentAnimal.id === animal.id) {
                return {
                  ...currentAnimal,
                  comments: [...(currentAnimal.comments || []), newComment],
                };
              } else {
                return currentAnimal;
              }
            })
          );
          setnewComment("");
          setshowComment(true);
        })
        .catch((error) => console.error(error));
    }
  }
  

  // update the animal state in the parent component with a new comment and also update the backend
  
  // function to handle the change in the comment input
  function handleCommentChange(event) {
    setnewComment(event.target.value);
  }

  // function to like a comment and update the json file
  
  // function to show the comments when the comment is clicked
  function showCommentReplies(commentIndex) {
    setShowReply((prev) => {
      let isCommentShown = { ...prev };
      isCommentShown[commentIndex] = !isCommentShown[commentIndex];
      return isCommentShown;
    });
  }
  function likeComments(commentIndex) {
    fetch(`http://localhost:3000/animals/${animal.id}/update_comment_likes?comment_id=${animal.comments[commentIndex].id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((updatedComment) => {
        setLikeComment((prevLikes) => {
          const updatedLikes = [...prevLikes];
          updatedLikes[commentIndex] = true;
          return updatedLikes;
        });
      })
      .catch((error) => console.error(error));
  }
  
  //function to assign the state change to the reply
  function handleReplyChange(e) {
    setNewReply(e.target.value);
  }

  // update the reply state in the parent component with a new reply and also update the backend
  function handleReplySubmit(e, commentIndex) {
    e.preventDefault();
    if (newReply) {
      fetch(`http://localhost:3000/animals/${animal.id}/comments/${animal.comments[commentIndex].id}/replies`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ reply: { reply: newReply } }),
      })
        .then((response) => response.json())
        .then((newReply) => {
          setAnimals((prevAnimals) =>
            prevAnimals.map((currentAnimal) => {
              if (currentAnimal.id === animal.id) {
                return {
                  ...currentAnimal,
                  comments: currentAnimal.comments.map((currentComment, i) =>
                    i === commentIndex ? { ...currentComment, replies: [...currentComment.replies, newReply] } : currentComment
                  ),
                };
              } else {
                return currentAnimal;
              }
            })
          );
          setNewReply("");
          setShowReply((prev) => {
            let isCommentShown = { ...prev };
            isCommentShown[commentIndex] = false;
            return isCommentShown;
          });
        })
        .catch((error) => console.error(error));
    }
  }
  
  function handleCommentDelete(commentIndex) {
    const commentId = animal.comments[commentIndex].id;
    fetch(`http://localhost:3000/animals/${animal.id}/comments/${commentId}`, {

      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(() => {
        setAnimals((prevAnimals) =>
          prevAnimals.map((currentAnimal) => {
            if (currentAnimal.id === animal.id) {
              return {
                ...currentAnimal,
                comments: currentAnimal.comments.filter(
                  (comment) => comment.id !== commentId
                ),
              };
            } else {
              return currentAnimal;
            }
          })
        );
      })
      .catch((error) => console.error(error));
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

      handleCommentChange={handleCommentChange}
      handleReplySubmit={handleReplySubmit}
      showComment={showComment}
      handleCommentDelete={handleCommentDelete}

    />
  );
}
