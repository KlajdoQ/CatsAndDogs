// import necessary components and libraries
import React, {useState, useEffect} from 'react';
import Header from './components/header/Header'
import Content from './components/content/Content'
import Footer from './components/Footer'
import Login from './Login'
import SignUp from './SignUp'
import {Routes, Route} from "react-router-dom"
import { useContext } from 'react'
import { UserContext } from './components/contexts/UserContext'


function App() {
  const [animals, setAnimals] = useState([]);
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(null);

  function addNewAnimal(newAnimal) {
    setAnimals([newAnimal, ...animals]);
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
            path="/"
            element={user ? (
              <>
              <Header addNewAnimal={addNewAnimal} search={search} setSearch={setSearch} />
              <Content
                search={search}
              animals={animals}
              setAnimals={setAnimals}
              addNewAnimal={addNewAnimal}
              />
              <Footer />
              </>
            ) : (
              <SignUp setUser={setUser} />
            )}
          />
        </Routes>
       
      </div>
    </UserContext.Provider>
  );
}


export default App;
