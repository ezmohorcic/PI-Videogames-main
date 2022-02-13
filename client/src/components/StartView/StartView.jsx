import React, { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';


export function StartView(props)
{
    return (
        <div id='startViewBackground'>
            <Link id='startViewLink' to={"/showMain"}></Link>
        </div>
    )
}