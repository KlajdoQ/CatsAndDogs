import React from 'react'
import Paw from '../images/paw.png'
import AddComment from './AddComment'
import ShareButton from './ShareButton'
import styled from 'styled-components'

export default function Animal({animal,likeButtonStyle,handleClick,likesFunction,showCom,showComments,setAnimals}) {
    const{name,image,hobbies,breed,likes} = animal
  return (
    <AnimalDiv>
     <AnimalImage src={image} alt={name} />
      <AnimalName>{name}</AnimalName>
      <AnimalBreed >{breed}</AnimalBreed>
      <AnimalHobbies >{hobbies}</AnimalHobbies>
      <LineDiv>
        <Line ></Line>
      </LineDiv>
    <LikeCommentShare >
      <AnimalLikes
        style={likeButtonStyle}
        onClick={handleClick}
        >
      <PawImg src={Paw} alt="paw"/>
          {likes} {likesFunction}
      </AnimalLikes>
      <AnimalComments 
      onClick={showCom}
      >{animal.comments.length} {animal.comments.length===1? "Comment":"Comments"}

      </AnimalComments>
      <ShareButton animal={animal}/>
    </LikeCommentShare>
    {showComments? 
    <AddComment  
      key={animal.image}
      setAnimals={setAnimals} 
      animal={animal}
    /> : null
     }

  </AnimalDiv>
  )
}
const AnimalDiv = styled.div`
  margin: 30px;
  border: 1px solid rgb(233, 227, 227);
  width: 450px;
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
  padding-top: 10px;
  color: rgb(224, 110, 182);
`;

const AnimalBreed = styled.h4`
  font-size: 16px;
  padding-left: 20px;
  color: rgb(178, 173, 173);
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
  padding-left: 20px;
`;

const LikeCommentShare = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px;
`;

const AnimalLikes = styled.button`
  text-align: center;
  border: 2px solid rgb(150, 144, 144);
  padding: 3px 5px;
  border-radius: 5px;
  font-weight: bold;
`;

const AnimalComments = styled.button`
  text-align: center;
  background-color: rgb(229, 38, 51);
  border: 1px solid lightgray;
  padding: 3px 5px;
  color: white;
  border-radius: 5px;
  font-weight: bold;
`;

const PawImg = styled.img 
`width:20px;
margin-right:3px;`