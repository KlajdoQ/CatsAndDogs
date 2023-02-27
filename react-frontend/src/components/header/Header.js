import React from 'react'
import Search from './Search'
import Logo from '../images/logo.png'
import {Link} from 'react-router-dom'
import styled from 'styled-components'


export default function Header({addNewAnimal, search, setSearch}) {
    //Returning the header with links to home and animal pictures and a form to add a new animal
  return (
    <HeaderDiv >
      <Link to='/'><LogoImg src={Logo} alt="logo"/></Link>
      <Search search={search} setSearch={setSearch}/>
        <ClientSideRoute >
          <Link to='/login' className='nav-link'>Login</Link>
          <Link to='/signup' className='nav-link'>Sign Up </Link>
            {/*Show form to add new animal on click*/}
           {/* <AnimalForm addNewAnimal={addNewAnimal}/> */}
        </ClientSideRoute>  
    </HeaderDiv>
  )
}

/*******************************
*   STYLED COMPONENTS          *
*******************************/
const HeaderDiv = styled.div `
  background-color: rgb(230, 117, 64);
  color:white;
  height:80px;
  display:flex;
  align-items: center;
  justify-content: left;
  position: relative;

  @media (max-width: 768px) {
    width: 100%;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom:50px;
`
const LogoImg = styled.img`
  width:140px;
  @media (max-width:600px) {
    width:100px;
    position: absolute;
    top: 15px;
    left: 0;
  }
`
const ClientSideRoute = styled.div`
  position:absolute;
  right:10px;
  display: flex;
  align-items: center;
  overflow: visible ;
  @media (max-width:600px) {
    width:260px;
  }
`

