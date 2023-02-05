// import necessary components and libraries
import React, {useState, useEffect} from 'react';
import Header from './components/header/Header'
import Content from './components/content/Content'
import Footer from './components/Footer'
import CatPictures from './components/header/CatPictures'
import DogPictures from './components/header/DogPictures'
import {Routes, Route} from "react-router-dom"

function App() {
    // initialize state for the list of animals and search query
  const [animals, setAnimals] = useState([])
  const [search, setSearch] = useState("")

  // Fetch the list of animals when the component is mounted
  useEffect(() => {
    fetch('http://localhost:3000/animals')
    .then((response) =>response.json())
    .then(setAnimals)
  },[])

    // add a new animal to the list of animals
  function addNewAnimal(newAnimal) {
    setAnimals([
      newAnimal,
      ...animals
    ])
  }

    // filter the list of animals based on the search query
  const filteredAnimals = animals.filter(animal => {
  return  animal.name.toLowerCase().includes(search.toLowerCase()) ||
  animal.breed.toLowerCase().includes(search.toLowerCase()) 
  })

    // update the likes of an animal
  function addLikes(updatedLikes)  {
    setAnimals(animals.map(animal => animal.id === updatedLikes.id ? updatedLikes : animal))
  }

    return (
      <div className="app">
        <Header 
          addNewAnimal={addNewAnimal}
          search={search}
          setSearch={setSearch}/>
          <Routes>
            <Route exact path='/cat-pictures' element={<CatPictures/>}></Route>
            <Route path='/dog-pictures' element={<DogPictures/>}/>
            <Route path='/' element={<Content animals={filteredAnimals} addLikes={addLikes}setAnimals={setAnimals} />}></Route>
          </Routes> 
        <Footer />
      </div>
    )
}

export default App;
