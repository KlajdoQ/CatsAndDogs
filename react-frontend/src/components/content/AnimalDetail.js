import React, { useState } from "react";
import Animal from "./Animal";
import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

// The AnimalDetail component displays the detailed information about a specific animal
export default function AnimalDetail({ newMessage, setNewMessage, animal,setUser ,setAnimals}) {
  const { likes} = animal;
  const [isLiked, setIsLiked] = useState(false);
  const [showComments, setshowComments] = useState(false);
  const { user} = useContext(UserContext); 

  
  // Determine the correct wording for the likes count (e.g. 1 like or 2 likes)
  function likesFunction() {
    return likes.length === 1 ? "Like" : "Likes";
  }

  function addLikes(updatedAnimal) {
    setAnimals((prevAnimals) => {
      return prevAnimals.map((prevAnimal) => {
        if (prevAnimal.id === updatedAnimal.id) {
          return { ...prevAnimal, likes: updatedAnimal.likes || [] };
        } else {
          return prevAnimal;
        }
      });
    })}

  function showCom() {
    setshowComments((prev) => !prev);
  }

  // Set the styles for the like button based on whether the animal is liked or not
  const likeButtonStyle = {
    backgroundColor: isLiked ? "red" : "white",
    color: isLiked ? "white" : "red",
  };

  return (
    <Animal
      animal={animal}
      likeButtonStyle={likeButtonStyle}
      likesFunction={likesFunction}
      showCom={showCom}
      showComments={showComments}
      setShowComments={setshowComments}
      setAnimals={setAnimals}
      setUser={setUser}
      user={user}
      addLikes={addLikes}
      newMessage={newMessage}
      setNewMessage={setNewMessage}
    />
  );
}
