import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getAllGenres, newGenre, setFilter, setVideogamesPorBuscando } from '../../redux/actions';
import { Link } from 'react-router-dom';

import './ShowGenres.css'
import { useState } from 'react';

export function ShowGenres()
{
    const genres = useSelector((state)=>state.genres);
    const dispatch=useDispatch();

    const [input,setInput]=useState("");

    useEffect(()=>
    {
        document.title= "owo || " + "Show Genres!"  
        if(genres.length===0){dispatch(getAllGenres())}
    },[])

    function handleGenreShowAll(e,element){
        dispatch(setVideogamesPorBuscando());
        dispatch(setFilter({type:"genero",payload:element.name}));
    }

    console.log(genres)
    let arrGenres=genres.map((element,index)=>
    {   
        return(
            <div className="genreButCont" key={"genre"+index}><Link to={"/ShowAll"} className="genreButLink" onClick={(e)=>{handleGenreShowAll(e,element)}}>{element.name}</Link></div>
        )
    });
    return(
        <div id='showGenresContainer'>
            <h1 id='genresh1'>Genres owo!</h1>
            <div id='showGenresShell'>{arrGenres}</div>
        </div>
    )
}