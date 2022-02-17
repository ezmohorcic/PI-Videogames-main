import React, {useState} from 'react';
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { setOrderAndFilter, setPage, setSearch } from '../../redux/actions';

import './Header.css';

export function Header()
{
    const dispatch=useDispatch();

    const [innersearch,setInnerSearch]=useState("");

    const searching = function()
    {
        dispatch(setOrderAndFilter({filter:null,order:null}));
        dispatch(setSearch(innersearch))
        dispatch(setPage(0));
    }
    
    let button;
    if(innersearch.length>3){button=<Link className='dataSearch' to={"/showAll?search="+innersearch} onClick={searching}>owo!</Link>}
    else{button="owo!";}

    return(
        <div id='headerContainer'>
            <div id="headerImgShell"><Link to={"/showAll"} id="linkLogoShell"><img id='headerLogoShell' src="/kisspng_joystick.png"/></Link></div>
            <div id="inputHeaderShell">
                <div id="searchTextContainer">
                    <input type="text" name="searchText" id="searchText" value={innersearch} onChange={(e)=>setInnerSearch(e.target.value)}/>
                </div>
                <div id="searchButContainer">
                    <button id="searchBut">{button}</button>
                </div>
            </div>
            <div id='dataBaseHeader'>
                <div className="goToLinkHeader leftGoTo"><Link className='dataBaseLink' to={"/CreateVG"}> database owo! </Link></div>
                <div className="goToLinkHeader rightGoTo"><Link className='dataBaseLink' to={"/ShowGenres"}>owo Genres! </Link></div>
            </div>
        </div>
    )
}