import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from 'react-router-dom';
import { NUMBER_200, NUMBER_404 } from '../../consts';
import { getVideogameById, killVideogameDB } from '../../redux/actions';

import './DetailVG.css'

export function DetailVG()
{

    const searchparams=useLocation();
    
    const dispatch=useDispatch()
    const details= useSelector((state)=>state.detailVideogames)
    useEffect(()=>
    {
        document.title= "owo || " + "Detailed!"  
        if(!details.hasOwnProperty("id"))dispatch(getVideogameById(searchparams.pathname.split('/')[2]))
    },[]);

    let platforms=[];
    let genres=[];
    //let img='';

    function handleKill()
    {
        dispatch(killVideogameDB(searchparams.pathname.split('/')[2]))
    }
    
    console.log(details)

    if(details.number===NUMBER_200)
    {
        document.title= "owo || " + "Detailed:"+details.videogame.name + "!";
        platforms=details.videogame.platforms.split(",").map((element,index)=><div className='detailedPlatGenreShell' key={"detailed_Plat_"+index}><p className='detailedPlatGenre' >{element}</p></div>)
    
        genres=details.videogame.genres.split(",").map((element,index)=><div className='detailedPlatGenreShell' key={"detailed_Genre_"+index}><p className='detailedPlatGenre'>{element}</p></div>)
        
        //img=details.videogame.background_image;
        
        return(
            <div id='detailedContainer'>
                <h1 id="detailName">{details.videogame.name}</h1>
                <div id='detailedImgShell'><img id='detailedImg' src={details.videogame.background_image} /></div>
                <div id='detailedDescription' dangerouslySetInnerHTML={{__html: details.videogame.description}}></div>
                <h2>Platforms:</h2>
                <div id='shellMiddlesDetailed'>{platforms}</div>
                <h2>Genres:</h2>
                <div id='shellMiddlesDetailed'>{genres}</div>
                <h2>Rating:</h2>
                <div id='shellMiddlesDetailed'><p className='detailedPlatGenre'>{details.videogame.rating}</p></div>
                <h2>Release Date:</h2>
                <div id='shellMiddlesDetailed'><p className='detailedPlatGenre'>{details.videogame.releaseDate}</p></div>
                <button onClick={()=>handleKill()}>owo kill</button>
            </div>
        )
    }
    else if(details.number===NUMBER_404)
    {
        return<p id='searchingMessageDet'>OOPSIE WOOPSIE!! UwU We made a fucky wucky!! A wittle fucko boingo! The code monkeys at our headquarters are working VEWY HAWD to fix this!</p>
    }
    else if(details.number===NUMBER_200)
    {
        return<p id='Message404Det'>OH! UwU, we are LOADING... </p>
    }

    /*return(
        <div id='detailedContainer'>
            <h1>{details.name}</h1>
            <img width={"500px"} height={"400px"} src={img} />
            {description}
            <p>Rating:{details.rating}</p>
            {platforms}
            {genres}
        </div>
    )*/

    return(<p id='searchingMessageDet'>OH! UwU, we are LOADING... </p>)
}
