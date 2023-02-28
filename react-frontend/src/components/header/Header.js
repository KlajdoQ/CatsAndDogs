import React from 'react'
import Search from './Search'
import Logo from '../images/logo.png'
import {Link} from 'react-router-dom'
import styled from 'styled-components'

import { useContext } from 'react';
import {useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

export default function Header({ search, setSearch, setUser }) {
  const navigate = useNavigate();
  const { user = null } = useContext(UserContext); // provide a default value for user


  const handleLogout = () => {
    fetch('/logout', { method: 'DELETE' })
      .then(() => {
        setUser(null);
        navigate('/');
      })
      .catch((error) => console.error(error));
  };

  return (
    <HeaderDiv>
      <Link to="/">
        <LogoImg src={Logo} alt="logo" />
      </Link>
      <Search search={search} setSearch={setSearch} />
      {user ? (
        <button onClick={handleLogout} className="nav-link">
          Log Out
        </button>
      ) : (
        <ClientSideRoute>
          <Link to="/login" className="nav-link">
            Login
          </Link>
          <Link to="/signup" className="nav-link">
            Sign Up
          </Link>
        </ClientSideRoute>
      )}
    </HeaderDiv>
  );
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

