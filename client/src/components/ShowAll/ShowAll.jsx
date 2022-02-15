import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";

import { Order } from './Options/Order/Order.jsx';
import {Filters} from './Options/Filters/Filters.jsx'
import { Videogames } from './Videogames/Videogames.jsx';
import { useLocation } from 'react-router-dom';
import { setSearch } from '../../redux/actions.js';

export function ShowAll() //Solo se encarga de ?search= NADIE FUERA DE VIDEOGAMES MANDA PETICION GETVIDEOGAMES
{
    const searchparams=useLocation();
    const dispatch=useDispatch()

    useEffect(()=>
    {
        if(searchparams.search)
        {   
            //param= searchparams.search.split("=")[1];
            dispatch(setSearch(searchparams.search.split("=")[1]));
        }
    },[]);

    return(
        <div id='showAllContainer'>
            <div id="optionsContainer">
                <div id="filterShell">
                    <Filters/>
                </div>
                <div id="orderShell">
                    <Order/>
                </div>
            </div>
            <div id='videogamesWholeContainer'>
                <Videogames/>
            </div>
        </div>
    )
}