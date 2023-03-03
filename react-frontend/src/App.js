// import necessary components and libraries
import React, {useState, useEffect} from 'react';
import Header from './components/header/Header'
import Content from './components/content/Content'
import Footer from './components/Footer'
import Login from './Login'
import SignUp from './SignUp'
import Profile from './Profile'
import {Routes, Route} from "react-router-dom"
import { useContext } from 'react'
import { UserContext } from './components/contexts/UserContext'


function App() {
  const [animals, setAnimals] = useState([]);
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(null);

  function addNewAnimal(newAnimal) {
    setAnimals([...animals, newAnimal]);
  }
  
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div className="app">
        
        <Routes>
          <Route
            path="/login"
            element={<Login setUser={setUser} />}
          />
          <Route
            path="/signup"
            element={<SignUp setUser={setUser} />}
          />
            <Route
            path="/profile"
            element={<Profile setUser={setUser} />}/>
          <Route
            path="/"
            element={user ? (
              <>
              <Header 
                search={search} 
                setSearch={setSearch} 
                setUser={setUser}/>
              <Content
                search={search}
                animals={animals}
                setAnimals={setAnimals}
                addNewAnimal={addNewAnimal}
                setUser={setUser}
              />
              <Footer />
              </>
            ) : (
              <>
              <Header 
                addNewAnimal={addNewAnimal} 
                search={search} 
                setSearch={setSearch} 
                setUser={setUser}/>
              <div>You must be logged in to view this content</div>
              </>
            )}
          />
        </Routes>
       
      </div>
    </UserContext.Provider>
  );
}


export default App;
