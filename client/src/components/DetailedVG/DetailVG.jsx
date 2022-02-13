import React, { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';

export function DetailVG(props)
{
    return(
        <div id='detailedContainer'>
            <p>name detailed</p>
            <p>description detailed</p>
            <p>rating detailed</p>
            <p>genres detailed</p>
            <p>platforms</p>
        </div>
    )
}