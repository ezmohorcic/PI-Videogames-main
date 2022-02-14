import React, { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { getVideogames, setOrderAndFilter, setPage } from '../../redux/actions';

export function Header(props)
{
    const filterAndOrder = useSelector((state)=>state.filterAndOrder);
    const page = useSelector((state)=>state.page);
    const dispatch=useDispatch();

    const [search,setSearch]=useState("");

    const searching = function()
    {
        dispatch(setOrderAndFilter({filter:null,order:null}));
        dispatch(setPage(0));
        dispatch(getVideogames({query:search,page:0,filter:null,order:null}))
    }
    
    let button;
    if(search.length>3){button=<Link to={"/showAll?search="+search} onClick={searching}>owo!</Link>}
    else{button="owo!";}

    return(
        <div id='headerContainer'>
            <div id="headerImgShell"><p>owo img!</p></div>
            <div id="inputHeaderShell">
                <div id="searchTextContainer">
                    <input type="text" name="searchText" id="searchText" value={search} onChange={(e)=>setSearch(e.target.value)}/>
                </div>
                <div id="searchButContainer">
                    <button id="searchBut">{button}</button>
                </div>
            </div>
        </div>
    )
}