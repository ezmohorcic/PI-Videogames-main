import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailedSearching } from '../../../../redux/actions';

import './Videogame.css'

export function Videogame(props)
{
    const dispatch=useDispatch();

    let arrGenres=props.genres.map((element,index)=>
    {
        return(<p key={"genreCard_"+props.index+'_'+index} className='genresCard'>{element}</p>)
    });
    return(
        <div className='videogameContainer' >
            <Link to={"/videogame/"+props.id} onClick={dispatch(detailedSearching())}>
                <p className="cardName">{props.name}</p>
                <div className='imgHolderCardVG'><img className='imgCardVG' src={props.img} alt='./alt_img_joystick.jpg' /></div>
                <div className="genresCardShell">{arrGenres}</div>
            </Link>
        </div>
    )
}