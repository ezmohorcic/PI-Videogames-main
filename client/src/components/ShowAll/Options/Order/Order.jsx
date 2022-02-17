import React from 'react';
import { useDispatch } from "react-redux";
import { setOrder } from '../../../../redux/actions';

import './Order.css'


export function Order(props)
{

    const dispatch=useDispatch();

    return(
        <div id="orderInnerCont">
            <h3 id='h3Filter'>ORDER!</h3>
            <select id='filterSelect' value={""} onChange={(e)=>{dispatch(setOrder({type:e.target.value}))}}>
                <option value="" > </option>
                <option value="alfabetico">alfabetico</option>
                <option value="rating">rating</option>
            </select>
        </div>
    )
}