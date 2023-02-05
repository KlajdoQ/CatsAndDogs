import React from 'react'
import AnimalList from './AnimalList'
import CatSection from '../cats/CatSection'
import DogSection from '../dogs/DogSection'
import styled from 'styled-components'



export default function Content({animals,addLikes, setAnimals}) {
  // divide the content into 3 sections - dog-section - animal-list and cat-section
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

/*******************************
*   STYLED COMPONENTS          *
*******************************/
const ContentDiv= styled.div 
`  display:grid;
grid-template-columns: auto  auto auto;
margin-top:30px;
position:relative;
;

`


