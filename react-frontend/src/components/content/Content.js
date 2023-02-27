import React from 'react'
import AnimalList from './AnimalList'
import styled from 'styled-components'
import CatSection from '../cats/CatSection'
import AnimalForm from './AnimalForm'
import './Content.css'


export default function Content({animals,addLikes, setAnimals}) {
  // divide the content into 3 sections - dog-section - animal-list and cat-section
  return (
    <div className="content-box">
      <AnimalForm />
      <ContentDiv >
        <AnimalList 
            animals={animals} 
            addLikes={addLikes}
            setAnimals={setAnimals} />
        <CatSection/>
      </ContentDiv>
    </div>
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


