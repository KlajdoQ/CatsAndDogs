import React, { useState } from "react";
import Animal from "./Animal";
import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

// The AnimalDetail component displays the detailed information about a specific animal
export default function AnimalDetail({ animal, addLikes, setAnimals}) {
  const { likes, id } = animal;
  const [isLiked, setIsLiked] = useState(false);
  const [showComments, setshowComments] = useState(false);
  const { user} = useContext(UserContext); 
  const [animalLikes, setLikes] = useState(animal.likes)

  

  function handleClick() {
    let newLikes;
    if (!isLiked) {
      newLikes = [...likes, { user_id: user.id }];
    } else {
      const likeIndex = likes.findIndex((like) => like.user_id === user.id);
      newLikes = [...likes.slice(0, likeIndex), ...likes.slice(likeIndex + 1)];
    }
    setIsLiked(!isLiked);
    setLikes(newLikes);
    fetch(`http://localhost:3000/animals/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ likes: newLikes, user_id: user.id }),
    })
      .then((response) => response.json())
      .then((data) => {
        setAnimals((animals) =>
          animals.map((animal) => (animal.id === data.id ? data : animal))
        );
      })
      .catch((error) => console.log(error));
  }
  
  


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
    });
  }

  function showCom() {
    // Toggle the show comments state when clicking on the comment button
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
      handleClick={handleClick}
      likesFunction={likesFunction}
      showCom={showCom}
      showComments={showComments}
      setShowComments={setshowComments}
      setAnimals={setAnimals}
    />
  );
}
