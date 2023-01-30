import React from 'react'
import AnimalList from './AnimalList'
import CatSection from '../cats/CatSection'
import DogSection from '../dogs/DogSection'
import styled from 'styled-components'



export default function Content({animals,addLikes, setAnimals}) {
  return (
    <ContentDiv >
      
        <DogSection className='dog-section'/>
      <AnimalList 
          animals={animals} 
          addLikes={addLikes}
          setAnimals={setAnimals} />
        <CatSection className='cat-section'/>
   
    </ContentDiv>
  )
}

const ContentDiv= styled.div 
`  display:grid;
grid-template-columns: auto  auto auto;
margin-top:30px;
position:relative;

`


