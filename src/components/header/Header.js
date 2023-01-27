import React from 'react'
import Search from './Search'
import Logo from '../images/logo.png'
import AnimalForm from './AnimalForm'


export default function Header({addNewAnimal, search, setSearch}) {
  return (
    <div className="header-div">
        <img src={Logo} alt="logo" className="logo" />
        <Search search={search} setSearch={setSearch}/>
        <AnimalForm addNewAnimal={addNewAnimal}/>    
    </div>
  )
}
