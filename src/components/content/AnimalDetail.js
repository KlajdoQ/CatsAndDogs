import React,{useState} from 'react'
import Animal from './Animal'


export default function AnimalDetail({animal, addLikes,setAnimals}) {
    const{likes} = animal
    const [isLiked, setIsLiked] = useState(false);
    const [showComments, setshowComments]= useState(false)


function handleClick() {
  let newLikes = animal.likes;
  if (isLiked) {
    newLikes--;
    setIsLiked(false);
   
  } else {
    newLikes++;
    setIsLiked(true);
   
  }

  fetch(`http://localhost:3000/animals/${animal.id}`,{
    method:'PATCH',
    headers: {
      'content-type': 'application/json',
      'accept': 'application/json',
    },
    body: JSON.stringify({likes: newLikes})
  })
  .then(response => response.json())
  .then(addLikes)
  
}

function likesFunction() {
  if(likes === 1) {
    return "Like"
  }else  {
    return "Likes"
  }
}

function showCom() {
  setshowComments(prev => !prev)
}

const likeButtonStyle = {
  backgroundColor: isLiked ? 'red' : 'white',
  color: isLiked ? 'white' : 'red',
}

  return (
   <Animal 
   animal={animal}
   likeButtonStyle={likeButtonStyle}
   handleClick={handleClick}
   likesFunction={likesFunction}
   showCom={showCom}
   showComments={showComments}
   setAnimals={setAnimals}
   />
  );
}

