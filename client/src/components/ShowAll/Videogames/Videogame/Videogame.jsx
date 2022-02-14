import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { getVideogameById } from '../../../../redux/actions';


export function Videogame(props)
{
    console.log(props.img)
    const dispatch= useDispatch()
    let arrGenres=props.genres.map((element,index)=>
    {
        return(<p key={"genreCard_"+props.index+'_'+index} className='genresCard'>{element}</p>)
    });
    return(
        <div id='videogameContainer'>
            <Link to={"/videogame/"+props.id} onClick={()=>{dispatch(getVideogameById(props.id))}}>
                <p id="cardName">{props.name}</p>
                <div className='imgHolderCardVG'><img width={"500px"} height={"400px"} src={props.img} alt='../../../../../public/alt_img_joystick.jpg' /></div>
                {arrGenres}
            </Link>
        </div>
    )
}