import React from 'react';
import {NavLink} from "react-router-dom";
import './AppHeader.style.css';

export const AppHeader = () => {

    return (
    <>
        <header className="App-header"> School App </header>
        Menu:
        <NavLink className='NavLink' to='/course' >Courses</NavLink>
        <NavLink className='NavLink' to='/teacher'>Teachers</NavLink>
        <NavLink className='NavLink' to='/student'>Student</NavLink>


    </>
    )
}