import React, {useState, useEffect} from 'react'
import AnimalList from './AnimalList'
import styled from 'styled-components'
import CatSection from '../cats/CatSection'
import AnimalForm from './AnimalForm'
import './Content.css'


export default function Content({search, animals, setAnimals, addNewAnimal, setUser}) {
  
  useEffect(() => {
    fetch("http://localhost:3000/animals")
      .then((response) => response.json())
      .then(setAnimals)
      .catch((error) => console.error(error));
  }, []);

  const filteredAnimals = animals.filter(
    (animal) =>
      animal.name.toLowerCase().includes(search.toLowerCase()) ||
      animal.breed.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="content-box">
      <AnimalForm addNewAnimal={addNewAnimal} animals={animals} setAnimals={setAnimals}/>
      <ContentDiv >
        <AnimalList 
            animals={filteredAnimals} 
            setAnimals={setAnimals}
            setUser={setUser}/>
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


