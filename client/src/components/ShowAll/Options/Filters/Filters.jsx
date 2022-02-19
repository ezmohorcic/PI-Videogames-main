import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { FILTER_TYPE_DBOAPI, FILTER_TYPE_GENRES } from '../../../../consts';
import { getAllGenres, setFilter, setFilterDbOApi, setFilterGenres, setPage, setVideogamesPorBuscando } from '../../../../redux/actions';

import './Filters.css'

export function Filters() //Solo se encarga de 
{

    const dispatch=useDispatch()
    const genres=useSelector((state)=>state.genres);

    useEffect(()=>{if(genres.length===0){dispatch(getAllGenres())}},[])
    
    const [typeFilter,setTypeFilter]= useState(['','']);

    function handleFilter(e)
    {
        dispatch(setVideogamesPorBuscando());
        dispatch(setPage(0))
        dispatch(setFilterGenres({type:"genero",payload:e.target.value}));

    }

    function handleOrder(e)
    {
        dispatch(setVideogamesPorBuscando());
        dispatch(setPage(0));
        dispatch(setFilterDbOApi({type:"dbOapi",payload:e.target.value}))
    }

    let dropDownFilterGenre='';
    let dropDownFilterDbOApi='';
    if(typeFilter[1]===FILTER_TYPE_GENRES)
    {
        let tempOptions=[ <option key={"empty_option"}> </option>,genres.map((element,index)=><option key={"option_"+index}>{element.name}</option>)]
        dropDownFilterGenre = <select id='filterSelect' value={""} onChange={(e)=>{handleFilter(e)}}>{tempOptions}</select>
    }
    if(typeFilter[0]===FILTER_TYPE_DBOAPI)
    {
        dropDownFilterDbOApi = <select id='filterSelect' value={""} onChange={(e)=>{handleOrder(e)}}>
                <option key={"option_"} value={""}>{""}</option>
                <option key={"option_DB"} value={"db"}>{"db"}</option>
                <option key={"option_API"} value={"api"}>{"api"}</option>
            </select>
    }

    function handleNone()
    {
        dispatch(setVideogamesPorBuscando());
        setTypeFilter(['','']);
        dispatch(setFilter({}));
    }

    console.log(typeFilter)

    return(
        <div id="filterInnerCont">
            <h3 id='h3Filter'>FILTERS owo!</h3>
            <div id="allFilters">
                <div className="filterShell"><label htmlFor="" className='filterLabel'>DB o Api</label><input type="radio" className='filterTypeRadio'  name="tipoFiltro" id={FILTER_TYPE_DBOAPI} onChange={(e)=>setTypeFilter([FILTER_TYPE_DBOAPI,typeFilter[1]])} /></div>
                <div id="filterDropDownShell">{dropDownFilterDbOApi}</div>

                <div className="filterShell"><label htmlFor="" className='filterLabel'>Genero</label><input type="radio" className='filterTypeRadio' name="tipoFiltro" id={FILTER_TYPE_GENRES} onChange={(e)=>setTypeFilter([typeFilter[0],FILTER_TYPE_GENRES])} /></div>
                <div id="filterDropDownShell">{dropDownFilterGenre}</div>

                <div className="filterShell"><label htmlFor="" className='filterLabel'>Ninguna</label><input type="radio" className='filterTypeRadio' name="tipoFiltro" id="noneFiltro" onChange={(e)=>handleNone()} /></div>
                
            </div>

        </div>
    )
}