import React from 'react';
import { useDispatch } from "react-redux";
import { setOrder } from '../../../../redux/actions';


export function Order(props)
{

    const dispatch=useDispatch();

    return(
        <div id="orderInnerCont">
            <h3>ORDER!</h3>
            <select id='orderSelect' value={""} onChange={(e)=>{dispatch(setOrder({type:e.target.value}))}}>
                <option value="" > </option>
                <option value="alfabetico">alfabetico</option>
                <option value="rating">rating</option>
                
            </select>
        </div>
    )
}