import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NUMBER_200 } from '../../../consts';
import { lastPage, nextPage, setPage, setVideogamesPorBuscando } from '../../../redux/actions';
import { Link } from 'react-router-dom';


import './PageButtons.css'

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

    function handleMiddlePage(e,page)
    {
        dispatch(setVideogamesPorBuscando());
        dispatch(setPage(page))
    }

    let lastPageShow='';
    let nextPageShow='';
    let middlePage='';

    if(page!=0 && videogames.number===NUMBER_200){lastPageShow=<button className='pageButs' id="lastPageShell" onClick={()=>{handleLastPage()}}>{"<"}</button>}
    if(videogames.videogames.length===15 && videogames.number===NUMBER_200){nextPageShow=<button className='pageButs' id="nextPageShell" onClick={()=>{handleNextPage()}}>{">"}</button>}
    
    /*
    if(videogames.pageBounds==0)
    {
        middlePage= <div>
        <div><button>0</button></div> 
        <div><button onClick={(e)=>handleMiddlePage(e,1)}>1</button></div> 
    </div>
    }
    if(videogames.pageBounds==1)
    {
        middlePage= <div>
        <div><button onClick={(e)=>handleMiddlePage(e,(page-1))}>{page-1}</button></div> 
        <div><button >{page}</button></div> 
        <div><button onClick={(e)=>handleMiddlePage(e,(page+1))}>{page+1}</button></div>
    </div>
    }
    if(videogames.pageBounds==2)
    {
        middlePage= <div>
            <div><button onClick={(e)=>handleMiddlePage(e,(page-1))}>{page-1}</button></div> 
            <div><button >{page}</button></div> 
        </div>
    }*/
    
    const dispatch=useDispatch()
    return(
        <div id='pageButsContainer'>
            <div className="pageButsShell leftPageShell">{lastPageShow}</div>
            {middlePage}
            <div className="pageButsShell rightPageShell">{nextPageShow}</div>
            
        </div>
    )
}