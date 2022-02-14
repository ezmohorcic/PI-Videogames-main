import React, { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';

export function DetailVG(props)
{

    const details= useSelector((state)=>state.detailVideogames)
    
    let rawDescription;
    let description;
    let rawPlatforms=[]
    if(typeof details.platforms == "string")
    {
        // if(details.platform.includes(","))
        // {
        //     rawPlatforms=details.platforms.split(",");
        // }
        // else
        // {
        //     rawPlatforms=details.platforms;
        // }
        rawPlatforms=details.platforms.split(",");
        console.log(rawPlatforms);
    }
    let platforms=[];
    let genres=[];
    let img='';

    if(details.description)
    {
        if(typeof details.id == "number")
        {
            rawDescription=details.description.slice(3,-4).split("<br />\n");
            description = rawDescription.map((element,index)=><p key={"description_"+index}>{"\n"+element}</p>);
        }
        else
        {
            description=<p>{details.description}</p>;
        }

    }
    if(typeof details.platforms == "object"){rawPlatforms.forEach((element,index)=>platforms.push(<p key={"detailed_Plat_"+index}>{element.name}</p>));}
    else{rawPlatforms.forEach(element=>platforms.push(<p>{element}</p>));}
    if(details.genres){details.genres.forEach((element,index)=>genres.push(<p key={"detailed_Plat_"+index}>{element.name}</p>));}
    if(details.img){img=details.img}
    else{img="../../../public/alt_img_joystick.jpg"}
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