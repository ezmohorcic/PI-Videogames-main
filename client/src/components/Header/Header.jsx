import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { getVideogames, setOrderAndFilter, setPage, setSearch } from '../../redux/actions';

export function Header(props)
{
    //const filterAndOrder = useSelector((state)=>state.filterAndOrder);
    const search = useSelector((state)=>state.search)
    //const page = useSelector((state)=>state.page);
    const dispatch=useDispatch();

    const [innersearch,setInnerSearch]=useState("");

    const searching = function()
    {
        dispatch(setOrderAndFilter({filter:null,order:null}));
        dispatch(setSearch(innersearch))
        dispatch(setPage(0));
    }
    
    let button;
    if(innersearch.length>3){button=<Link to={"/showAll?search="+innersearch} onClick={searching}>owo!</Link>}
    else{button=<p>owo!</p>;}

    return(
        <div id='headerContainer'>
            <div id="headerImgShell"><p>owo img!</p></div>
            <div id="inputHeaderShell">
                <div id="searchTextContainer">
                    <input type="text" name="searchText" id="searchText" value={innersearch} onChange={(e)=>setInnerSearch(e.target.value)}/>
                </div>
                <div id="searchButContainer">
                    <button id="searchBut">{button}</button>
                </div>
            </div>
            <Link to={"/CreateVG"}>Add game to database owo!</Link>
        </div>
    )
}