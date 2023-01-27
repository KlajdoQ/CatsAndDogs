import React from 'react'
import AnimalList from './AnimalList'
import CatSection from '../cats/CatSection'
import DogSection from '../dogs/DogSection'
//import DogNews from '../dogs/DogNews'

export default function Content({animals,addLikes, setAnimals}) {
  return (
    <div className="content-div">
        <AnimalList 
          animals={animals} 
          addLikes={addLikes}
          setAnimals={setAnimals} />
        <DogSection />
        <CatSection/>
    </div>
  )
}
