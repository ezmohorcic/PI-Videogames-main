import React from 'react';
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { getAllGenres } from '../../redux/actions';

import './StartView.css';

export function StartView()
{
    const dispatch=useDispatch();
    const getInit = function()
    {
        dispatch(getAllGenres());
    }
    return (
        <div id='startViewBackground'>
            <div id="startViewLinkShell"><button id='startViewButton'><Link id='startViewLink' to={"/showAll"} onClick={getInit}>Enter!</Link></button></div>
        </div>
    )
}