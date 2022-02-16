import React from 'react';
import { Link } from 'react-router-dom';


export function Videogame(props)
{
    let arrGenres=props.genres.map((element,index)=>
    {
        return(<p key={"genreCard_"+props.index+'_'+index} className='genresCard'>{element}</p>)
    });
    return(
        <div id='videogameContainer'>
            <Link to={"/videogame/"+props.id}>
                <p id="cardName">{props.name}</p>
                <div className='imgHolderCardVG'><img width={"500px"} height={"400px"} src={props.img} alt='../../../../../public/alt_img_joystick.jpg' /></div>
                {arrGenres}
            </Link>
        </div>
    )
}