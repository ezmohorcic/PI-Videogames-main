import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getAllGenres } from '../../redux/actions';

export function ShowGenres(props)
{
    const genres = useSelector((state)=>state.genres);
    const dispatch=useDispatch();

    useEffect(()=>{if(genres.length===0){dispatch(getAllGenres())}},[])

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