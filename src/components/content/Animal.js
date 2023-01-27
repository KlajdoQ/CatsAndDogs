import React,{useState} from 'react'
import Paw from '../images/paw.png'
import AddComment from './AddComment'
import ShareButton from './ShareButton'

export default function AnimalDetail({animal, addLikes,setAnimals}) {
    const{name,image,hobbies,breed,likes} = animal
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
    <>
    <div className="animal-div">
      <img className="animal-image"src={image} alt={name} />
      <h2 className="animal-name">{name}</h2>
      <h4 className="animal-breed">{breed}</h4>
      <p className="animal-hobbies"> {hobbies}</p>
      <div className="line-div">
        <p className="line"></p>
      </div>
      <div className="like-comment-share">
        <button
          style={likeButtonStyle}
          className="animal-likes" 
          onClick={handleClick}
          >
        <img src={Paw} alt="paw" className="paw-img"/>
            {likes} {likesFunction()}
        </button>
        <button 
        className="animal-comments" 
        onClick={showCom}
        >{animal.comments.length} {animal.comments.length===1? "Comment":"Comments"}

        </button>
        <ShareButton animal={animal}/>
      </div>
      {showComments? 
      <AddComment  
        key={animal.image}
        setAnimals={setAnimals} 
        animal={animal}
      /> : null
       }

    </div>
    </>
  );
}

