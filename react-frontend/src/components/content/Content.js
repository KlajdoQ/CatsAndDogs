import React from 'react'
import AnimalList from './AnimalList'
import styled from 'styled-components'
import DogSection from '../dogs/DogSection'
import CatSection from '../cats/CatSection'


export default function Content({animals,addLikes, setAnimals}) {
  // divide the content into 3 sections - dog-section - animal-list and cat-section
  return (
    <ContentDiv >
      <AnimalList 
          animals={animals} 
          addLikes={addLikes}
          setAnimals={setAnimals} />
        <div className="facts-section">
      <CatSection/>
        </div>
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


