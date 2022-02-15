import React, { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { FILTER_TYPE_GENRES, ORDER_ALFABETICO, ORDER_RATING } from '../../consts';
import { getAllGenres, getVideogames } from '../../redux/actions';


export function StartView(props)
{
    const dispatch=useDispatch();
    const getInit = function()
    {
        dispatch(getAllGenres());
    }
    return (
        <div id='startViewBackground'>
            <Link id='startViewLink' to={"/showAll"} onClick={getInit}>Enter!</Link>
        </div>
    )
}