import React, { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';


export function Videogame(props)
{
    console.log(props.img)
    let arrGenres=props.genres.map((element,index)=>
    {
        return(<p key={"genreCard_"+props.index+'_'+index} className='genresCard'>{element}</p>)
    });
    return(
        <div id='videogameContainer'>
            <h1 id="cardName">{props.name}</h1>
            <img src={props.img} alt="" />
            <p>generos</p>
        </div>
    )
}