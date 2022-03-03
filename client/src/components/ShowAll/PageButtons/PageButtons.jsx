import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NUMBER_200 } from '../../../consts';
import { lastPage, nextPage, setVideogamesPorBuscando } from '../../../redux/actions';

import './PageButtons.css'

export function PageButtons()
{
    const page=useSelector(state=>state.page)
    const videogames=useSelector(state=>state.videogames)

    function handleLastPage()
    {
        if(page!==0)
        {
            dispatch(setVideogamesPorBuscando());
            dispatch(lastPage())
        }
    }

    function handleNextPage()
    {
        if(videogames.videogames.length===15)
        {
            dispatch(setVideogamesPorBuscando());
            dispatch(nextPage())
        }
    }

    let lastPageShow='';
    let nextPageShow='';
    let middlePage='';

    if(page!==0 && videogames.number===NUMBER_200){lastPageShow=<button className='pageButs' id="lastPageShell" onClick={()=>{handleLastPage()}}>{"<"}</button>}
    if(videogames.videogames.length===15 && videogames.number===NUMBER_200){nextPageShow=<button className='pageButs' id="nextPageShell" onClick={()=>{handleNextPage()}}>{">"}</button>}

    
    const dispatch=useDispatch()
    return(
        <div id='pageButsContainer'>
            <div className="pageButsShell leftPageShell">{lastPageShow}</div>
            {middlePage}
            <div className="pageButsShell rightPageShell">{nextPageShow}</div>
            
        </div>
    )
}