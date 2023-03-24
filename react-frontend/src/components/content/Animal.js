import React, {useState} from 'react'
import Paw from '../images/paw.png'
import AddComment from './AddComment'
import ShareButton from './ShareButton'
import styled from 'styled-components'

export default function Animal({animal, 
  likeButtonStyle, 
  handleClick, 
  likesFunction, 
  showCom,
   showComments, 
   setAnimals,
   setUser, user, addLikes,
   newMessage, 
   setNewMessage
  }) {

    const { id, name, image, hobbies, breed, likes, comments } = animal;
  const [isLiked, setIsLiked] = useState(likes.some((like) => like.user_id === user.id));

  function handleClick() {
    const userLikes = likes.filter((like) => like.user_id === user.id);
    if (userLikes.length === 0) {
      const newLikes = [...likes, { user_id: user.id }];
      setIsLiked(true);
      const updatedAnimal = { ...animal, likes: newLikes };
      fetch(`http://localhost:3000/animals/${animal.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(updatedAnimal),
      })
        .then((response) => response.json())
        .then((data) => {
          addLikes(data);
        })
        .catch((error) => console.log(error));
    } else {
      const likeIndex = likes.findIndex((like) => like.user_id === user.id);
      const newLikes = [
        ...likes.slice(0, likeIndex),
        ...likes.slice(likeIndex + 1),
      ];
      setIsLiked(false);
      const updatedAnimal = { ...animal, likes: newLikes };
      fetch(`http://localhost:3000/animals/${animal.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(updatedAnimal),
      })
        .then((response) => response.json())
        .then((data) => {
          addLikes(data);
        })
        .catch((error) => console.log(error));
    }
  }

  
  return (
    <AnimalDiv>
      <AnimalImage src={image} alt={name} />
      <AnimalData>
        <AnimalName>{name}</AnimalName>
        <AnimalBreed> {breed}</AnimalBreed>
      </AnimalData>
      <AnimalHobbies><strong>{name}</strong> likes {hobbies}</AnimalHobbies>
      <LineDiv>
        <Line />
      </LineDiv>
      <LikeCommentShare>
        <AnimalLikes style={likeButtonStyle} onClick={handleClick}>
          <PawImg src={Paw} alt="paw" />
          {likes.length} {likesFunction()}
        </AnimalLikes>
        <button onClick={showCom} className="btn-comments">
          {comments && comments.length}{" "}
          {comments && comments.length === 1 ? "Comment" : "Comments"}
        </button>
        <ShareButton animal={animal} />
      </LikeCommentShare>
      <br />
      {showComments ? (
        <AddComment
          key={animal.image}
          setAnimals={setAnimals}
          animal={animal}
          setUser={setUser}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
        />
      ) : null}
    </AnimalDiv>
  );
}
/*******************************
*   STYLED COMPONENTS          *
*******************************/
const AnimalDiv = styled.div`
  background-color: white;
  margin-bottom:20px;
  border: 1px solid rgb(233, 227, 227);
  width: 500px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1);
  padding-bottom: 20px;
  position: relative;
  @media (max-width:600px) {
    width:350px;
    margin-top:40px;
`;

const AnimalImage = styled.img`
  width: 100%;
  height: 290px;
`;

const AnimalName = styled.h2`
  padding-left: 20px;
  color: rgb(224, 110, 182);
`;

const AnimalBreed = styled.h4`
  font-size: 18px;
  padding-left: 20px;
  color: rgb(178, 173, 178);
`;

const LineDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;

const Line = styled.p`
  border: 1px solid rgb(221, 217, 217);
  width: 400px;
  margin-bottom: 10px;
`;

const AnimalHobbies = styled.p`
  text-align: center;
`;

const LikeCommentShare = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px;
  margin-top: 5px;
`;

const AnimalLikes = styled.button`
  text-align: center;
  border: 2px solid rgb(150, 144, 144);
  padding: 3px 5px;
  border-radius: 5px;
  font-weight: bold;
`;

const PawImg = styled.img 
`width:20px;
margin-right:3px;`

const AnimalData = styled.div `
display:flex;
align-items: center;
justify-content: space-between;
margin-right:30px;
margin-top:10px;
margin-bottom:10px;
`;