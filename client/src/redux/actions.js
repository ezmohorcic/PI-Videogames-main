import { ALL_GENRES, ADD_GENRE } from "../consts";

export function dummy (payload)
{
    return({type:"DUMMY",payload})
}

//----genres----

export function getAllGenres()
{
    return async function()
    {
        try
        {
            const response = await fetch("http://localhost:3001/genres")
            const json= await response.json();
            dispatch({type:ALL_GENRES,payload:json});
        }
        catch(e){console.log(e)}
    }
}

export function addGenre(payload)
{
    return ({type:ADD_GENRE,payload})
}