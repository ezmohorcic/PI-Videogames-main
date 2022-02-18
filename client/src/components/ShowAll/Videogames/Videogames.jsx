import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NUMBER_000, NUMBER_200, NUMBER_404 } from '../../../consts';
import { getVideogames, setSearch } from '../../../redux/actions';
import { useLocation } from 'react-router-dom';
import { Videogame } from './Videogame/Videogame';

import './Videogames.css'


export function Videogames()
{
    const dispatch=useDispatch();
    const videogames = useSelector((state)=>state.videogames);
    const search = useSelector((state)=>state.search);
    const filterAndOrder = useSelector((state)=>state.filterAndOrder);
    const page = useSelector((state)=>state.page);

    const searchparams=useLocation();

    console.log(search);
    
    useEffect(()=>
    {
        if(searchparams.search)
        {   
            //param= searchparams.search.split("=")[1];
            dispatch(setSearch(searchparams.search.split("=")[1]));
            console.log(searchparams.search.split("=")[1])
        }
        dispatch(getVideogames({query:searchparams.search.split("=")[1],page,...filterAndOrder}))
    },[search,filterAndOrder,page])
    
    let arrVideogames='';
    if(videogames.number===NUMBER_200)
    {
        arrVideogames = videogames.videogames.map((element,index)=>
        {
            //console.log(element)
            let name=element.name;
            let img=element.background_image;
            let genres=[]
            if(element.genres)genres=element.genres.split(',');
            return (<Videogame key={"vgCard"+index} id={element.id} index={index} name={name} img={img} genres={genres}/>)
        });
    }
    else if(videogames.number===NUMBER_000)
    {
        arrVideogames=<p id='searchingMessage'>OH! UwU, we are Wowking VEWY HAWD seaWching uwu, pls b patient OnO</p>
    }
    else if(videogames.number===NUMBER_404)
    {
        arrVideogames=<p id="Message404">OOPSIE WOOPSIE!! UwU We made a fucky wucky!! A wittle fucko boingo! The code monkeys at our headquarters are working VEWY HAWD to fix this!</p>
    }
    return(
        <div id='videogamesInnerCont'>
            {arrVideogames}
        </div>
    )
}