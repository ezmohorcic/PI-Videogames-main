import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getVideogames } from '../../../redux/actions';

import { Videogame } from './Videogame/Videogame';


export function Videogames()
{
    const dispatch=useDispatch();
    const videogames = useSelector((state)=>state.videogames);
    const search = useSelector((state)=>state.search);
    const filterAndOrder = useSelector((state)=>state.filterAndOrder);
    const page = useSelector((state)=>state.page);

    console.log(videogames);
    
    useEffect(()=>{dispatch(getVideogames({query:search,page,...filterAndOrder}))},[search,filterAndOrder,page])
    

    let arrVideogames = videogames.map((element,index)=>
    {
        //console.log(element)
        let name=element.name;
        let img=element.background_image;
        let genres=element.genres.split(',');
        return (<Videogame key={"vgCard"+index} id={element.id} index={index} name={name} img={img} genres={genres}/>)
    });
    return(
        <div id='videogamesInnerCont'>
            {arrVideogames}
        </div>
    )
}