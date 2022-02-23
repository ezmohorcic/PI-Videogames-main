import React from 'react';
import { useDispatch } from "react-redux";
import { setOrder, setPage, setVideogamesPorBuscando } from '../../../../redux/actions';

import './Order.css'


export function Order(props)
{

    const dispatch=useDispatch();

    function handleOrder(e)
    {
        dispatch(setVideogamesPorBuscando()); //no se si dejarlo o no
        dispatch(setPage(0));
        dispatch(setOrder({type:e.target.value}))
    }

    return(
        <div id="orderInnerCont">
            <h3 id='h3Filter'>ORDER!</h3>
            <select id='filterSelect'  onChange={(e)=>{handleOrder(e)}}>
                <option value="" > </option>
                <option value="alfabetico">alfabetico A-Z</option>
                <option value="invAlfabetico">alfabetico Z-A</option>
                <option value="rating">rating 5-0</option>
                <option value="ratingInv">rating 0-5</option>
            </select>
        </div>
    )
}