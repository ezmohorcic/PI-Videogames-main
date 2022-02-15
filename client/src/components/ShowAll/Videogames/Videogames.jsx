import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getVideogames } from '../../../redux/actions';

import { Videogame } from './Videogame/Videogame';


export function Videogames(props)
{
    const dispatch=useDispatch();
    const videogames = useSelector((state)=>state.videogames);
    const search = useSelector((state)=>state.search);
    const filterAndOrder = useSelector((state)=>state.filterAndOrder);
    const page = useSelector((state)=>state.page);
    console.log(videogames);
    console.log(search);
    console.log(filterAndOrder);
    console.log(page);
    
    dispatch(getVideogames({page,query:search,...filterAndOrder}))

    let arrVideogames = videogames.map((element,index)=>
    {
        //console.log(element)
        let name=element.name;
        let img='../../../../../public/alt_img_joystick.jpg';
        let genres=[];
        if(typeof element.id == "number")
        {
            img=element.background_image;
            element.genres.forEach(element =>{genres.push(element.name)});
        }
        else
        {
            genres[0]=element.genres.name;
        }
        return (<Videogame key={"vgCard"+index} id={element.id} index={index} name={name} img={img} genres={genres}/>)
    });
    let arrVg=[]
    return(
        <div id='videogamesInnerCont'>
            {arrVideogames}
        </div>
    )
}