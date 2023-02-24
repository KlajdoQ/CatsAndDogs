import React,{useState,useEffect} from 'react'
import styled from 'styled-components'

export default function CatPictures() {
  const [cats, setCats]= useState([])

  useEffect(() => {
    fetch('https://api.thecatapi.com/v1/images/search?limit=50&breed_ids=beng&api_key=live_buGGVzKS1guG8pPEZOdttSIMeMuKNjc4pVAF0Vh5oz2nhgfascednvbVBAg1n3sJ')
    .then(response => response.json())
    .then(
      setCats
    )
  },[])
  
  return (
    cats.map(cat => (
      <CatImg src={cat.url} alt='cat' key={cat.id}/>)
    )
  )
}

/*******************************
*   STYLED COMPONENTS          *
*******************************/
const CatImg = styled.img `width:300px;
margin:20px;
box-shadow: 5px 5px 5px rgba(80, 96, 214, 0.3);
border-radius: 5px; 
`