import React, { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';

import { Videogame } from './Videogame/Videogame';


export function Videogames(props)
{
    const videogames = useSelector((state)=>state.videogames);
    console.log(videogames)
    let arrVideogames = videogames.map((element,index)=>
    {
        let name=element.name;
        let img='../../../../../public/alt_img_joystick.jpg';
        let genres=[];
        if(element.id.length<20)
        {
            img=element.background_image;
            element.genres.forEach(element =>{genres.push(element.name)});
        }
        else
        {
            genres[0]=element.genres.name;
        }
        return (<Videogame key={"vgCard"+index} index={index} name={name} img={img} genres={genres}/>)
    });
    let arrVg=[]
    return(
        <div id='videogamesInnerCont'>
            {arrVideogames}
        </div>
    )
}