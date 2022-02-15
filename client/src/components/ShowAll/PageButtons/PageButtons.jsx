import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { lastPage, nextPage } from '../../../redux/actions';


export function PageButtons()
{
    const page=useSelector(state=>state.page)
    const videogames=useSelector(state=>state.videogames)

    function handleLastPage()
    {
        if(page!=0){dispatch(lastPage())}
    }

    function handleNextPage()
    {
        if(videogames.length==15){dispatch(nextPage())}
    }

    const dispatch=useDispatch()
    return(
        <div id='pageButsContainer'>
            <div className="pageButsShell"><button id="lastPageShell" onClick={()=>{handleLastPage()}}>{"<"}</button></div>
            <div className="pageButsShell"><button id="nextPageShell" onClick={()=>{handleNextPage()}}>{">"}</button></div>
        </div>
    )
}