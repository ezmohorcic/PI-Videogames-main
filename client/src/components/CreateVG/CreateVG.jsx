import React, { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';

export function CreateVG(props)
{
    return(
        <div id='createContainer'>
            <input type="text" name="name" id="createName" placeholder='Name'/>
            <textarea name="description" id="createDescription" cols="30" rows="10" placeholder='Description'></textarea>
            <input type="text" name="rating" id="createRating" placeholder='Rating'/>
            
        </div>
    )
}