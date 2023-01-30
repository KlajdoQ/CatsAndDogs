import React, {useState, useEffect} from 'react';
import Header from './components/header/Header'
import Content from './components/content/Content'
import Footer from './components/Footer'
import CatPictures from './components/header/CatPictures'
import DogPictures from './components/header/DogPictures'
import {Routes, Route} from "react-router-dom"

function App() {
  const [animals, setAnimals] = useState([])
  const [search, setSearch] = useState("")


  useEffect(() => {
    fetch('http://localhost:3000/animals')
    .then((response) =>response.json())
    .then(setAnimals)
  },[])

  function addNewAnimal(newAnimal) {
    setAnimals([
      newAnimal,
      ...animals
    ])
  }

  const filteredAnimals = animals.filter(animal => {
  return  animal.name.toLowerCase().includes(search.toLowerCase()) ||
  animal.breed.toLowerCase().includes(search.toLowerCase()) 
  })

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
