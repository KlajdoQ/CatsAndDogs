import React from 'react'
import Search from './Search'
import Logo from '../images/logo.png'
import AnimalForm from './AnimalForm'
import CatImg from '../images/cat-img.png'
import DogImg from '../images/dog-img.png'
import {Link} from 'react-router-dom'
import styled from 'styled-components'


export default function Header({addNewAnimal, search, setSearch}) {
  return (
    <HeaderDiv >
      <Link to='/'><LogoImg src={Logo} alt="logo"/></Link>
      <Search search={search} setSearch={setSearch}/>
      
        <ClientSideRoute >
            <Link to='/cat-pictures' className='nav-link'><CatImgBtn src={CatImg} alt="cat-img"/>Pictures</Link>
            <Link to='/dog-pictures' className='nav-link'><DogImgBtn src={DogImg} alt='dog-img' />Pictures</Link>
           <AnimalForm addNewAnimal={addNewAnimal}/>
        </ClientSideRoute>  
    </HeaderDiv>
  )
}
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

const CatImgBtn = styled.img`
  width:40px;
  @media (max-width:600px) {
    margin-left:10px;
  }
 
`
const DogImgBtn = styled.img` 
  width:45px;
  margin-left:30px;
  @media (max-width:600px) {
    margin-left:5px;
  }

`
