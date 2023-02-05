import React,{useState,useEffect} from 'react'
import styled from 'styled-components'

export default function DogPictures() {
  const [dogs,setDogs] = useState([])
  useEffect(() => {
    fetch('http://shibe.online/api/shibes?count=100&urls=true&httpsUrls=false')
    .then(response => response.json())
    .then(setDogs)
  },[])


  return (
        dogs.map(dog => (
          <DogImg src={dog} alt='dog' key={dog.id}/>
        ))
  )
}

/*******************************
*   STYLED COMPONENTS          *
*******************************/
const DogImg = styled.img`width:200px; margin:20px;
box-shadow: 5px 5px 5px rgba(80, 96, 214, 0.3);
border-radius: 5px; 
`