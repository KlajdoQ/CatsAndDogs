// import necessary components and libraries
import React, {useState, useEffect} from 'react';
import Header from './components/header/Header'
import Content from './components/content/Content'
import Footer from './components/Footer'
import Login from './Login'
import SignUp from './SignUp'
import {Routes, Route} from "react-router-dom"

function App() {
    // initialize state for the list of animals and search query
  const [animals, setAnimals] = useState([])
  const [search, setSearch] = useState("")
  let [authMode, setAuthMode] = useState("signin");

 
  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin");
  };

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
  const filteredAnimals = animals.filter(animal => (
    //animal.name.toLowerCase().includes(search.toLowerCase())
   animal.name.toLowerCase().includes(search.toLowerCase()) ||
   animal.breed.toLowerCase().includes(search.toLowerCase()) 
  ))

    // update the likes of an animal
    function addLikes(updatedAnimal) {
      setAnimals(prevAnimals => {
        return prevAnimals.map(prevAnimal => {
          if (prevAnimal.id === updatedAnimal.id) {
            return { ...prevAnimal, likes: updatedAnimal.likes };
          } else {
            return prevAnimal;
          }
        });
      });
    }
    
    return (
      <div className="app">
        <Header 
          addNewAnimal={addNewAnimal}
          search={search}
          setSearch={setSearch}/>
          <Routes>
            <Route path='/login' element={<Login setAuthMode={setAuthMode} changeAuthMode={changeAuthMode}/>}/>
            <Route path='/signup' element={<SignUp setAuthMode={setAuthMode} changeAuthMode={changeAuthMode}/>}/>
            <Route path='/' element={<Content animals={filteredAnimals} addLikes={addLikes}setAnimals={setAnimals} />}></Route>
          </Routes> 
        <Footer />
      </div>
    )
}

export default App;
