import React, { useState } from "react";

export default function AddCommentForm({ newComment, handleCommentChange, handleCommentSubmit }) {
  return (
    <form onSubmit={handleCommentSubmit}>
      <input
        type="text"
        value={newComment}
        onChange={handleCommentChange}
        placeholder="Add a comment"
      />
      <button type="submit">Post Comment</button>
    </form>
  );
}

