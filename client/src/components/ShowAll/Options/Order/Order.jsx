import React from 'react';
import { useDispatch } from "react-redux";
import { setOrder, setPage } from '../../../../redux/actions';

import './Order.css'


export function Order(props)
{

    const dispatch=useDispatch();

    function handleOrder(e)
    {
        dispatch(setPage(0));
        dispatch(setOrder({type:e.target.value}))
    }

    return(
        <div id="orderInnerCont">
            <h3 id='h3Filter'>ORDER!</h3>
            <select id='filterSelect' value={""} onChange={(e)=>{handleOrder(e)}}>
                <option value="" > </option>
                <option value="alfabetico">alfabetico</option>
                <option value="rating">rating</option>
            </select>
        </div>
    )
}