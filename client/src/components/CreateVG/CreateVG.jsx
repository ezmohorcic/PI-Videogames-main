import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';

import { addVideogames, getAllGenres, getVideogameById } from '../../redux/actions';

import './CreateVG.css'

export function CreateVG()
{

    const dispatch=useDispatch()
    const genres=useSelector((state)=>state.genres);
    const addedId=useSelector(state=>state.addedvideogame);
    if(genres.length===0){dispatch(getAllGenres())}
    
    useEffect(()=>
    {
        dispatch(getAllGenres())
        document.title= "owo || Add New!"; 
    
    },[])

    const [newGame,setNewGame]=useState({name:"",description:"",releaseDate:"",rating:0,platforms:[],genres:[]});
    const [addingPlat,setAddingPlat]=useState("");
    const [addingGen,setAddingGen]=useState("");
    const [errors,setErrors]=useState([]);

    function handleSend()
    {
        let flag=true;
        let rawErrors=[]
        if(/([^a-zA-Z0-9 ])/.test(newGame.name) || newGame.name==="")
        {
            flag=false;
            rawErrors=[...rawErrors,'Error en name']
        }
        if(newGame.description==="")
        {
            flag=false;
            rawErrors=[...rawErrors,'Error en description']
        }
        if(newGame.rating<0 || newGame.rating>5)
        {
            flag=false;
            rawErrors=[...rawErrors,'Error en rating']
        }
        if(newGame.platforms.length<1)
        {
            flag=false;
            rawErrors=[...rawErrors,'Error en platforms']
        }
        if(newGame.genres.length<1)
        {
            flag=false;
            rawErrors=[...rawErrors,'Error en genres']
            
        }
        setErrors(rawErrors);

        if(flag){
            setErrors(['Enviando a db!'])
            dispatch(addVideogames(newGame))
        }
    }

    function handleAddPlatform()
    {
        if(!newGame.platforms.includes(addingPlat.toUpperCase()) && addingPlat!=="")
        {
            setNewGame({...newGame,platforms:[...newGame.platforms,addingPlat.toUpperCase()]})
            setAddingPlat("");
        }
    }

    function handleAddGenres()
    {
        if(!newGame.genres.includes(addingGen) && addingGen!=="")
        {
            setNewGame({...newGame,genres:[...newGame.genres,addingGen]})
            setAddingPlat("");
        }
    }

    function handleEliminatePlat(e)
    {
        setNewGame({...newGame,platforms:[...newGame.platforms.filter(plat=>plat!==e.target.value)]})
    }

    function handleEliminateGenre(e)
    {
        setNewGame({...newGame,genres:[...newGame.genres.filter(genre=>genre!==e.target.value)]})
        
    }

    const arrGenres= [<option className='genresOption' key={""}>{""}</option>,...genres.map((element,index)=><option className='genresOption' key={"option_"+index}>{element.name}</option>)]
    const arrPlatforms=newGame.platforms.map((element,index)=><div key={"showPlat_"+index} className="PlatformShow"><p >{element}</p> <button value={element} onClick={(e)=>handleEliminatePlat(e)} className='eliminatePlatform'>X</button></div>)
    const arrGenre=newGame.genres.map((element,index)=><div key={"showGen_"+index} className="PlatformShow"><p>{element}</p><button value={element} onClick={(e)=>handleEliminateGenre(e)} className='eliminatePlatform'>X</button></div>)
    const arrErros= errors.map((element,index)=><p className='notesCreation' key={"showError_"+index}>{element}</p>)
    let linkTo='';

    if(addedId){
        console.log("addedID")
        linkTo=<Link to={"/videogame/"+addedId} id="linkToId" onClick={()=>{dispatch(getVideogameById(addedId))}}>Juego agregado!</Link>}
    return(
        <div id='createContainer'>
            <div id="createNameShell"><input value={newGame.name} onChange={(e)=>setNewGame({...newGame,name:e.target.value})} type="text" name="name" id="createName" placeholder='Name' /></div>
            <div id="createDescriptionShell"><textarea value={newGame.description} onChange={(e)=>setNewGame({...newGame,description:e.target.value})} name="description" id="createDescription" cols="30" rows="10" placeholder='Description' ></textarea></div>

            <div id="RatingReleaseShell">
                <div id="createReleaseDateShell"><input value={newGame.releaseDate} onChange={(e)=>setNewGame({...newGame,releaseDate:e.target.value})} type="text" name="createReleaseDate" id="createReleaseDate" placeholder='Release Date' /></div>
                <div id="createRatingShell"><input value={newGame.rating} placeholder={"Rating"} onChange={(e)=>setNewGame({...newGame,rating:e.target.value})} type="number" min={"1"} max={"5"} step={"any"}  name="rating" id="createRating" placeholder='Rating' /></div>
            </div>
           
           
            <div id="createPlatformsShell">
                <input value={addingPlat} onChange={(e)=>{ setAddingPlat(e.target.value)}}  type="text" name="platforms" id="createPlatforms" placeholder='Add Platform' />
                <button id="addPlatform" onClick={()=>handleAddPlatform()}>Add platform</button>
            </div>
            <div id='allPlatsShell'>{arrPlatforms}</div>
            
            
            <div id="createGenresDateShell">
                <select name="genres" id="createGenres" placeholder='Select Genres' onChange={(e)=>setAddingGen(e.target.value)}>{arrGenres}</select>
                <button id="addGenreBut" onClick={()=>handleAddGenres()}>add genre</button> 
            </div>
            <div id="allGenresShell">{arrGenre}</div>
                      
            <div id="createShell">
                <button id="CreateGame" onClick={()=>{handleSend()}}>Create!</button>
            </div>
            <div id='notesShell'>{arrErros}</div>
            {linkTo}
        </div>
    )
}