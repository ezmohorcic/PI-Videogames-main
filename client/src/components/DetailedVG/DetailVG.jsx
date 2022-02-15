import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from 'react-router-dom';
import { getVideogameById } from '../../redux/actions';

export function DetailVG(props)
{

    const searchparams=useLocation();
    
    const dispatch=useDispatch()
    const details= useSelector((state)=>state.detailVideogames)
    console.log(details)
    useEffect(()=>
    {
        if(!details.hasOwnProperty("id"))dispatch(getVideogameById(searchparams.pathname.split('/')[2]))
    },[]);

    let rawDescription;
    let description;
    let platforms=[];
    let genres=[];
    let img='';

    if(details.hasOwnProperty("id"))
    {
        if(details.description.includes("<p>"))
        {
            rawDescription=details.description.slice(3,-4).split("<br />\n");
            description = rawDescription.map((element,index)=><p key={"description_"+index}>{"\n"+element}</p>);
        }
        else{description=<p>{details.description}</p>;}
      
        platforms=details.platforms.split(",").map((element,index)=><p key={"detailed_Plat_"+index}>{element}</p>)
    
        if(details.genres)genres=details.genres.split(",").map((element,index)=><p key={"detailed_Genre_"+index}>{element}</p>)
        
        details.background_image? img=details.background_image : img="../../../public/alt_img_joystick.jpg"
    }

    return(
        <div id='detailedContainer'>
            <h1>{details.name}</h1>
            <img width={"500px"} height={"400px"} src={img} alt="../../../public/alt_img_joystick.jpg"/>
            {description}
            <p>Rating:{details.rating}</p>
            {platforms}
            {genres}
        </div>
    )
}