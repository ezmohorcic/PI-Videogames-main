import { combineReducers } from "redux";
import ALL_GENRES, { ADD_GENRE } from "../consts.js";

function dummy(state={},action)
{
    if(action.type=="DUMMY")
    {
        return action.payload;
    }
    else return state
}

function genres(state=[],action)
{
    if(action.type==ALL_GENRES){return action.payload}
    else if(action.type==ADD_GENRE){return [...state,action.payload];}
    else return state;
}

const rootReducer=combineReducers(
{
    dummy,
    genres,
});

export default rootReducer;