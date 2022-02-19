import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { FILTER_TYPE_DBOAPI, FILTER_TYPE_GENRES } from '../../../../consts';
import { getAllGenres, setFilter, setPage, setVideogamesPorBuscando } from '../../../../redux/actions';

import './Filters.css'

export function Filters() //Solo se encarga de 
{

    const dispatch=useDispatch()
    const genres=useSelector((state)=>state.genres);

    useEffect(()=>{if(genres.length===0){dispatch(getAllGenres())}},[])
    
    const [typeFilter,setTypeFilter]= useState('');

    function handleFilter(e)
    {
        dispatch(setVideogamesPorBuscando());
        dispatch(setPage(0))
        dispatch(setFilter({type:"genero",payload:e.target.value}));

    }

    function handleOrder(e)
    {
        dispatch(setVideogamesPorBuscando());
        dispatch(setFilter({type:"dbOapi",payload:e.target.value}))
    }

    let dropDownFilter='';
    if(typeFilter===FILTER_TYPE_GENRES)
    {
        let tempOptions=[ <option key={"empty_option"}> </option>,genres.map((element,index)=><option key={"option_"+index}>{element.name}</option>)]
        dropDownFilter = <select id='filterSelect' value={""} onChange={(e)=>{handleFilter(e)}}>{tempOptions}</select>
    }
    else if(typeFilter===FILTER_TYPE_DBOAPI)
    {
        dropDownFilter = <select id='filterSelect' value={""} onChange={(e)=>{handleOrder(e)}}>
                <option key={"option_"} value={""}>{""}</option>
                <option key={"option_DB"} value={"db"}>{"db"}</option>
                <option key={"option_API"} value={"api"}>{"api"}</option>
            </select>
    }

    function handleNone()
    {
        setTypeFilter('');
        dispatch(setFilter({}));
    }

    return(
        <div id="filterInnerCont">
            <h3 id='h3Filter'>FILTERS owo!</h3>
            <div id="allFilters">
                <div className="filterShell"><label htmlFor="" className='filterLabel'>DB o Api</label><input type="radio" className='filterTypeRadio'  name="tipoFiltro" id={FILTER_TYPE_DBOAPI} onChange={(e)=>setTypeFilter(FILTER_TYPE_DBOAPI)} /></div>
                <div className="filterShell"><label htmlFor="" className='filterLabel'>Genero</label><input type="radio" className='filterTypeRadio' name="tipoFiltro" id={FILTER_TYPE_GENRES} onChange={(e)=>setTypeFilter(FILTER_TYPE_GENRES)} /></div>
                <div className="filterShell"><label htmlFor="" className='filterLabel'>Ninguna</label><input type="radio" className='filterTypeRadio' name="tipoFiltro" id="noneFiltro" onChange={(e)=>handleNone()} /></div>
                <div id="filterDropDownShell">{dropDownFilter}</div>
            </div>

        </div>
    )
}