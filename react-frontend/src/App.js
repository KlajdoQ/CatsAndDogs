// import necessary components and libraries
import React, {useState} from 'react';
import './App.css'
import Header from './components/header/Header'
import Content from './components/content/Content'
import Footer from './components/Footer'
import Login from './Login'
import SignUp from './SignUp'
import Profile from './Profile'
import {Routes, Route} from "react-router-dom"
import { UserContext } from './components/contexts/UserContext'


function App() {
  const [animals, setAnimals] = useState([]);
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(null);

  function addNewAnimal(newAnimal) {
    setAnimals([...animals, newAnimal]);
  }

  return (
    <UserContext.Provider value={{ user, setUser }} >
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
              <div className="login-to-view" >
                <Header 
                    addNewAnimal={addNewAnimal} 
                    search={search} 
                    setSearch={setSearch} 
                    setUser={setUser}/>
                <div className="error-msg">You must be <br></br>logged in <br></br>to view this <br></br>content!</div>
              </div>
             
            )}
          />
        </Routes>
       
      </div>
    </UserContext.Provider>
  );
}


export default App;
