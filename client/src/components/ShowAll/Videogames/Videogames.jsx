import React, { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';


export function Videogames(props)
{
    let arrVg=[<div>owo jueguito 1</div>,<div>owo jueguito 2</div>]
    return(
        <div id='videogamesInnerCont'>
            {arrVg}
        </div>
    )
}