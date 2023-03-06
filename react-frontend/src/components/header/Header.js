import React from 'react'
import Search from './Search'
import Logo from '../images/logo.png'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import './Header.css'

import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

export default function Header({ search, setSearch, setUser }) {
  const { user = null } = useContext(UserContext); // provide a default value for user

  const userImage = localStorage.getItem("userImage");



  const handleLogout = () => {
    fetch("http://localhost:3000/logout", { method: 'DELETE' })
      .then(() => {
        setUser(null);
      })
      .catch((error) => console.error(error));
  };
  return (
    <div className="header-div">
      <Link to="/content">
        <LogoImg src={Logo} alt="logo" />
      </Link>
      {user ? (
        <>
        <Search search={search} setSearch={setSearch} />
          <div className='header-links'>
        {/* {userImage && (
            <img className="userImg" src={userImage} alt="User" />
          )}            */}
            <Link to="/profile" className="nav-link">
              {user.full_name}
            </Link>
            <button onClick={handleLogout} className="logoutBtn">
              Log Out
            </button>
          </div>
        </>
      ) : (
        <div className="header-links">
          <button className="navBtn">
            <Link to="/login"  className="navLink">
              Login
            </Link>
          </button>
          <button  className="navBtn">
            <Link to="/signup"className="navLink" >
              Sign Up
            </Link>
          </button>
        </div>
      )}
    </div>
  );
  
  
}


/*******************************
*   STYLED COMPONENTS          *
*******************************/

const LogoImg = styled.img`
  width:140px;
  @media (max-width:600px) {
    width:100px;
    position: absolute;
    top: 15px;
    left: 0;
  }
`


