import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { FILTER_TYPE_DBOAPI, FILTER_TYPE_GENRES } from '../../../../consts';
import { getAllGenres, setFilter } from '../../../../redux/actions';


export function Filters(props) //Solo se encarga de 
{

    const dispatch=useDispatch()
    const genres=useSelector((state)=>state.genres);

    useEffect(()=>{if(genres.length==0){dispatch(getAllGenres())}},[])
    
    const [typeFilter,setTypeFilter]= useState('');

    let dropDownFilter='';
    if(typeFilter==FILTER_TYPE_GENRES)
    {
        let tempOptions=[ <option key={"empty_option"}> </option>,genres.map((element,index)=><option key={"option_"+index}>{element.name}</option>)]
        dropDownFilter = <select id='filterSelect' value={""} onChange={(e)=>{dispatch(setFilter({type:"genero",payload:e.target.value}))}}>{tempOptions}</select>
    }

    return(
        <div id="filterInnerCont">
            <h3>FILTER!</h3>
            <label htmlFor="">DB o Api<input type="radio"  name="tipoFiltro" id={FILTER_TYPE_DBOAPI} onChange={(e)=>setTypeFilter(FILTER_TYPE_DBOAPI)} /></label>
            <label htmlFor="">Genero<input type="radio"  name="tipoFiltro" id={FILTER_TYPE_GENRES} onChange={(e)=>setTypeFilter(FILTER_TYPE_GENRES)} /></label>
            <label htmlFor="">Ninguna<input type="radio"  name="tipoFiltro" id="noneFiltro" onChange={(e)=>setTypeFilter('')} /></label>
            {dropDownFilter}
        </div>
    )
}