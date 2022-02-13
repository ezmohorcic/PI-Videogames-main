import { combineReducers } from "redux";
import  {ALL_GENRES, ADD_GENRE, SHOW_VIDEOGAMES_PAGE, DETAIL_VIDEOGAME } from "../consts.js";

function dummy(state={},action)
{
    if(action.type=="DUMMY"){return action.payload;}
    else return state
}

function genres(state=[],action)
{
    if(action.type==ALL_GENRES){return action.payload}
    else if(action.type==ADD_GENRE){return [...state,action.payload];}
    else return state;
}

function videogames (state=[],action)
{
    if(action.type==SHOW_VIDEOGAMES_PAGE)
    {
        return action.payload;
    }
    else return state;
}

function detailVideogames (state={},action)
{
    if(action.type==DETAIL_VIDEOGAME)
    {
        return action.payload;
    }
    else return state;
}

const rootReducer=combineReducers(
{
    dummy,
    genres,
    videogames,
    detailVideogames,
});

export default rootReducer;