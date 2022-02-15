import { combineReducers } from "redux";
import  {ALL_GENRES, ADD_GENRE, SHOW_VIDEOGAMES_PAGE, DETAIL_VIDEOGAME, CHANGE_FILT_ORD, CHANGE_FILTER, CHANGE_ORDER, NEW_PAGE, NEW_SEARCH, ADDED_ID, LAST_PAGE, NEXT_PAGE } from "../consts.js";

function dummy(state={},action)
{
    if(action.type==="DUMMY"){return action.payload;}
    else return state
}

function genres(state=[],action)
{
    if(action.type===ALL_GENRES){return action.payload}
    else if(action.type===ADD_GENRE){return [...state,action.payload];}
    else return state;
}

function videogames (state=[],action)
{
    if(action.type===SHOW_VIDEOGAMES_PAGE)
    {
        return action.payload;
    }
    else return state;
}

function detailVideogames (state={},action)
{
    if(action.type===DETAIL_VIDEOGAME)
    {
        console.log(action.payload)
        return action.payload;
    }
    else return state;
}

function filterAndOrder(state={},action)
{
    if(action.type===CHANGE_FILT_ORD){return action.payload;}
    else if(action.type===CHANGE_FILTER){return {...state,filter:action.payload};}
    else if(action.type===CHANGE_ORDER){return {...state,order:action.payload};}
    else return state;
}

function page(state=0,action)
{
    if(action.type===NEW_PAGE){return action.payload;}
    else if(action.type===LAST_PAGE){return state-1;}
    else if(action.type===NEXT_PAGE){return state+1;}
    else return state;
}

function search(state="",action)
{
    if(action===NEW_SEARCH){
        console.log(action)
        return action.payload}
    else return state;
}

function addedvideogame(state="",action)
{   
    if(action.type===ADDED_ID){
        console.log(action)
        return action.payload}
    else return state;
}

const rootReducer=combineReducers(
{
    dummy,
    genres,
    videogames,
    detailVideogames,
    filterAndOrder,
    page,
    search,
    addedvideogame,
});

export default rootReducer;