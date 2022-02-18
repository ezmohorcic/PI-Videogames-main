import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from 'react-router-dom';
import { NUMBER_200, NUMBER_404 } from '../../consts';
import { getVideogameById } from '../../redux/actions';

import './DetailVG.css'

export function DetailVG()
{

    const searchparams=useLocation();
    
    const dispatch=useDispatch()
    const details= useSelector((state)=>state.detailVideogames)
    useEffect(()=>
    {
        if(!details.hasOwnProperty("id"))dispatch(getVideogameById(searchparams.pathname.split('/')[2]))
    },[]);

    let rawDescription;
    let description;
    let platforms=[];
    let genres=[];
    let img='';
    
    console.log(details)

    if(details.number===NUMBER_200)
    {
        if(details.videogame.description.includes("<p>"))
        {
            rawDescription=details.videogame.description.slice(3,-4).split("<br />\n");
            description = rawDescription.map((element,index)=><p key={"description_"+index}>{"\n"+element}</p>);
        }
        else{description=<p>{details.videogame.description}</p>;}
      
        platforms=details.videogame.platforms.split(",").map((element,index)=><p key={"detailed_Plat_"+index}>{element}</p>)
    
        if(details.videogame.genres)genres=details.videogame.genres.split(",").map((element,index)=><p key={"detailed_Genre_"+index}>{element}</p>)
        
        img=details.videogame.background_image;
        
        return(
            <div id='detailedContainer'>
                <h1 id="detailName">{details.videogame.name}</h1>
                <div id='detailedImgShell'><img id='detailedImg' src={img} /></div>
                {description}
                <p>Rating:{details.videogame.rating}</p>
                {platforms}
                {genres}
            </div>
        )
    }
    else if(details.number===NUMBER_404)
    {
        return<p id='searchingMessageDet'>OOPSIE WOOPSIE!! UwU We made a fucky wucky!! A wittle fucko boingo! The code monkeys at our headquarters are working VEWY HAWD to fix this!</p>
    }
    else if(details.number===NUMBER_200)
    {
        return<p id='Message404Det'>OH! UwU, we are Wowking VEWY HAWD seaWching uwu, pls b patient OnO</p>
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

    return(<p id='searchingMessageDet'>OH! UwU, we are Wowking VEWY HAWD seaWching uwu, pls b patient OnO</p>)
}

//.\alt_img_joystick.jpg
//.\DetailVG.jsx