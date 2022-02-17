import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NUMBER_200 } from '../../../consts';
import { lastPage, nextPage, setVideogamesPorBuscando } from '../../../redux/actions';


export function PageButtons()
{
    const page=useSelector(state=>state.page)
    const videogames=useSelector(state=>state.videogames)

    function handleLastPage()
    {
        if(page!=0)
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
    if(page!=0 && videogames.number===NUMBER_200){lastPageShow=<div className="pageButsShell"><button id="lastPageShell" onClick={()=>{handleLastPage()}}>{"<"}</button></div>}
    if(videogames.videogames.length===15 && videogames.number===NUMBER_200){nextPageShow=<div className="pageButsShell"><button id="nextPageShell" onClick={()=>{handleNextPage()}}>{">"}</button></div>}

    const dispatch=useDispatch()
    return(
        <div id='pageButsContainer'>
            {lastPageShow}
            {nextPageShow}
            
        </div>
    )
}