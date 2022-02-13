import React, { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';

import { Order } from '../Options/Order/Order.jsx';
import {Filters} from '../Options/Filters/Filters.jsx'


export function ShowAll(props)
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
        </div>
    )
}