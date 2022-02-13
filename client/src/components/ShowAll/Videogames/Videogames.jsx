import React, { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';


export function Videogames(props)
{
    let arrVg=[]
    return(
        <div id='videogamesInnerCont'>
            {arrVg}
        </div>
    )
}