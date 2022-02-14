import React, { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';

export function DetailVG(props)
{

    const details= useSelector((state)=>state.detailVideogames)
    
    let rawDescription;
    let description;
    let platforms=[];
    let genres=[];
    if(details.description)
    {
        rawDescription=details.description.slice(3,-4).split("<br />\n");
        description = rawDescription.map((element,index)=><p key={"description_"+index}>{"\n"+element}</p>);
    }
    if(details.platforms){details.platforms.forEach(element=>platforms.push(<p>{element.name}</p>));}
    if(details.genres){details.genres.forEach(element=>genres.push(<p>{element.name}</p>));}
    return(
        <div id='detailedContainer'>
            <h1>{details.name}</h1>
            <img width={"500px"} height={"400px"} src={details.background_image} alt="../../../public/alt_img_joystick.jpg"/>
            {description}
            <p>{details.rating}</p>
            {platforms}
            {genres}
        </div>
    )
}