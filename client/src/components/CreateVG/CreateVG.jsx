import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';

import { addVideogames, getAllGenres, getVideogameById } from '../../redux/actions';

export function CreateVG(props)
{
    const dispatch=useDispatch()
    const genres=useSelector((state)=>state.genres);
    const addedId=useSelector(state=>state.addedvideogame);
    if(genres.length===0){dispatch(getAllGenres())}
    
    useEffect(()=>{dispatch(getAllGenres())},[])

    const [newGame,setNewGame]=useState({name:"",description:"",releaseDate:"",rating:0,platforms:[],genres:[]});
    const [addingPlat,setAddingPlat]=useState("");
    const [addingGen,setAddingGen]=useState("");
    const [errors,setErrors]=useState([]);

    function handleSend()
    {
        console.log("handing send")
        let flag=true;
        let rawErrors=[]
        if(/([#$%^&*{}])/.test(newGame.name) || newGame.name==="")
        {
            console.log(/([#$%^&*{}])/.test(newGame.name))
            flag=false;
            rawErrors=[...rawErrors,'Error en name']
            console.log(rawErrors)
        }
        if(newGame.description==="")
        {
            flag=false;
            rawErrors=[...rawErrors,'Error en description']
            console.log(rawErrors)
        }
        if(newGame.rating<0 || newGame.rating>5)
        {
            flag=false;
            rawErrors=[...rawErrors,'Error en rating']
            console.log(rawErrors)
        }
        if(newGame.platforms.length<1)
        {
            flag=false;
            rawErrors=[...rawErrors,'Error en platforms']
            console.log(rawErrors)
        }
        if(newGame.genres.length<1)
        {
            flag=false;
            rawErrors=[...rawErrors,'Error en genres']
            console.log(rawErrors)
        }
        setErrors(rawErrors);
        if(flag){
            setErrors([...errors,'Enviando a db!'])
            dispatch(addVideogames(newGame))
        }
    }

    const arrGenres= genres.map((element,index)=><option key={"option_"+index}>{element.name}</option>)
    const arrPlatforms=newGame.platforms.map((element,index)=><p key={"showPlat_"+index}>{element}</p>)
    const arrGenre=newGame.genres.map((element,index)=><p key={"showGen_"+index}>{element}</p>)
    const arrErros= errors.map((element,index)=><p key={"showError_"+index}>{element}</p>)
    let linkTo='';
    console.log(addedId)
    if(addedId){
        console.log("addedID")
        linkTo=<Link to={"/videogame/"+addedId} onClick={()=>{dispatch(getVideogameById(addedId))}}>Juego agregado!</Link>}
    return(
        <div id='createContainer'>
            <div id="createNameShell"><input value={newGame.name} onChange={(e)=>setNewGame({...newGame,name:e.target.value})} type="text" name="name" id="createName" placeholder='Name' /></div>
            <div id="createDescriptionShell"><textarea value={newGame.description} onChange={(e)=>setNewGame({...newGame,description:e.target.value})} name="description" id="createDescription" cols="30" rows="10" placeholder='Description' ></textarea></div>
            <div id="createRatingShell"><input value={newGame.rating} onChange={(e)=>setNewGame({...newGame,rating:e.target.value})} type="number" min={"1"} max={"5"} step={"any"}  name="rating" id="createRating" placeholder='Rating' /></div>
            <div id="createPlatformsShell"><input value={addingPlat} onChange={(e)=>{ setAddingPlat(e.target.value)}}  type="text" name="platforms" id="createPlatforms" placeholder='Add Platform' /></div>
            <button id="addPlatform" onClick={()=>
                {
                    if(!newGame.platforms.includes(addingPlat))
                    {
                        setNewGame({...newGame,platforms:[...newGame.platforms,addingPlat]})
                        setAddingPlat("");
                    }
                }}>Add platform</button>
            {arrPlatforms}
            <div id="createReleaseDateShell"><input value={newGame.releaseDate} onChange={(e)=>setNewGame({...newGame,releaseDate:e.target.value})} type="text" name="createReleaseDate" id="createReleaseDate" placeholder='Release Date' /></div>
            <div id="createGenresDateShell">
                <select name="genres" id="createGenres" onChange={(e)=>setAddingGen(e.target.value)}>{arrGenres}</select>
            </div>
            <button id="addGenreBut" onClick={()=>
                {
                    if(!newGame.genres.includes(addingGen))
                    {
                        setNewGame({...newGame,genres:[...newGame.genres,addingGen]})
                        setAddingPlat("");
                    }
                }
            }>add genre</button>
            {arrGenre}
            <div>{arrErros}</div>
            <div id="createShell">
                <button id="CreateGame" onClick={()=>{handleSend()}}>Create!</button>
            </div>
            {linkTo}
        </div>
    )
}