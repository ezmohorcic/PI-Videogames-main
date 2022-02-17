import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { FILTER_TYPE_DBOAPI, FILTER_TYPE_GENRES } from '../../../../consts';
import { getAllGenres, setFilter, setVideogamesPorBuscando } from '../../../../redux/actions';


export function Filters(props) //Solo se encarga de 
{

    const dispatch=useDispatch()
    const genres=useSelector((state)=>state.genres);

    useEffect(()=>{if(genres.length===0){dispatch(getAllGenres())}},[])
    
    const [typeFilter,setTypeFilter]= useState('');

    function handleFilter(e)
    {
        
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
            <h3>FILTER!</h3>
            <label htmlFor="">DB o Api<input type="radio"  name="tipoFiltro" id={FILTER_TYPE_DBOAPI} onChange={(e)=>setTypeFilter(FILTER_TYPE_DBOAPI)} /></label>
            <label htmlFor="">Genero<input type="radio"  name="tipoFiltro" id={FILTER_TYPE_GENRES} onChange={(e)=>setTypeFilter(FILTER_TYPE_GENRES)} /></label>
            <label htmlFor="">Ninguna<input type="radio"  name="tipoFiltro" id="noneFiltro" onChange={(e)=>handleNone()} /></label>
            {dropDownFilter}
        </div>
    )
}