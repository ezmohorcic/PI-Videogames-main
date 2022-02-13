import React, { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { getAllGenres } from '../../redux/actions';

export function ShowGenres(props)
{
    const genres = useSelector((state)=>state.genres);
    const dispatch=useDispatch();

    let arrGenres=genres.map((element,index)=>
    {
        return(
            <div className="genreButCont" key={"genre"+index}>{element.name}</div>
        )
    });
    return(
        <div id='showGenresContainer'>
                {arrGenres}
        </div>
    )
}