import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";

import { Order } from './Options/Order/Order.jsx';
import {Filters} from './Options/Filters/Filters.jsx'
import { Videogames } from './Videogames/Videogames.jsx';
import { useLocation } from 'react-router-dom';
import { setSearch } from '../../redux/actions.js';
import { PageButtons } from './PageButtons/PageButtons.jsx';

export function ShowAll() //Solo se encarga de ?search= NADIE FUERA DE VIDEOGAMES MANDA PETICION GETVIDEOGAMES
{
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
            <PageButtons/>
        </div>
    )
}