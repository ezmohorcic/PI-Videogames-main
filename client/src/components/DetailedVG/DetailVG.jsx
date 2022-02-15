import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from 'react-router-dom';
import { getVideogameById } from '../../redux/actions';

export function DetailVG(props)
{

    const searchparams=useLocation();
    
    const dispatch=useDispatch()
    const details= useSelector((state)=>state.detailVideogames)
    
    useEffect(()=>
    {
        if(!details.hasOwnProperty("id"))
        {
            dispatch(getVideogameById(searchparams.pathname.split('/')[2]))
        }
    },[]);

    let rawDescription;
    let description;
        if(typeof details.id == "number")
        {
            rawDescription=details.description.slice(3,-4).split("<br />\n");
            description = rawDescription.map((element,index)=><p key={"description_"+index}>{"\n"+element}</p>);
        }
        else{description=<p>{details.description}</p>;}

    let rawPlatforms=[]
    if(typeof details.platforms == "string"){rawPlatforms=details.platforms.split(",");}
    let platforms=[];
    if(typeof details.platforms == "object"){rawPlatforms.forEach((element,index)=>platforms.push(<p key={"detailed_Plat_"+index}>{element.name}</p>));}
    else{rawPlatforms.forEach(element=>platforms.push(<p>{element}</p>));}

    let genres=[];
    if(details.genres){details.genres.forEach((element,index)=>genres.push(<p key={"detailed_Plat_"+index}>{element.name}</p>));}

    let img='';
    if(details.background_image){img=details.background_image}
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