import React, { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';


export function Videogames(props)
{
    
    return(
        <div id='videogameContainer'>
            <h1 id="cardName">name Card</h1>
            <img src="" alt="" />
            <p>generos</p>
        </div>
    )
}