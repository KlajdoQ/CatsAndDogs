import React,{useState} from 'react'
import Animal from './Animal'

// The AnimalDetail component displays the detailed information about a specific animal
export default function AnimalDetail({animal, addLikes,setAnimals}) {
    const{likes} = animal
      // keep track of the like state
    const [isLiked, setIsLiked] = useState(false);
      // keep track of the show comments state
    const [showComments, setshowComments]= useState(false)


    function handleClick() {
      const newLikes = isLiked ? likes - 1 : likes + 1;
      setIsLiked(!isLiked);
    
      fetch(`http://localhost:3000/animals/${animal.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ likes: newLikes }),
      })
        .then(response => response.json())
        .then(data => {
          addLikes(data);
        })
        .catch(error => console.log(error));
    }
    

  // Determine the correct wording for the likes count (e.g. 1 like or 2 likes)
   function likesFunction() {
    return likes === 1 ? 'Like' : 'Likes';
   }

function showCom() {
      // Toggle the show comments state when clicking on the comment button 
  setshowComments(prev => !prev)
}

  // Set the styles for the like button based on whether the animal is liked or not
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
   setShowComments={setshowComments}
   setAnimals={setAnimals}

   />
  );
}

