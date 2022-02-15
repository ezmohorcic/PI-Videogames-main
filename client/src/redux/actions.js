import { ALL_GENRES, ADD_GENRE, SHOW_VIDEOGAMES_PAGE, DETAIL_VIDEOGAME, CHANGE_ORDER, CHANGE_FILTER, CHANGE_FILT_ORD, NEW_PAGE, NEW_SEARCH, ADDED_ID } from "../consts";

export function dummy (payload)
{
    return({type:"DUMMY",payload})
}

//----genres----

export function getAllGenres()
{
    return async function(dispatch)
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

//----genres----

//vamos mari, vos podes, te queda tan poco, y pasaste tanto, ya casi lo tenes hecho, es increible lo que podes lograr con tiempo y dedicacion 
//----Videogames----

export function getVideogames({query=null,page=null,filter=null,order=null})
{
    return async function(dispatch)
    {
        try
        {
            let q= "?page="+page.toString();
            if(query){q= q+"&name="+query;}
            if(filter)
            {
                q= q+'&filterType='+filter.type;
                if(filter.payload){q = q+'&filterGenres='+filter.payload;}
            }
            if(order){q= q+'&order='+order.type;}
            const response = await fetch("http://localhost:3001/videogames"+q); //+q+p+filterType+filterGenres,orderType
            const json= await response.json();
            dispatch({type:SHOW_VIDEOGAMES_PAGE,payload:json});
        }
        catch(e){console.log(e)}
    }
}
//----Videogames----


//----Detailed Videogames----

export function getVideogameById(id)
{
    return async function(dispatch)
    {
        try
        {
            console.log("mandando id a server: "+id)
            const response = await fetch("http://localhost:3001/videogames/"+id);
            const json= await response.json();
            dispatch({type:DETAIL_VIDEOGAME,payload:json});
        }
        catch(e){console.log(e)}
    }
}

//----Detailed Videogames----


//----Add Videogames----

export function addVideogames(payload)
{
    return async function(dispatch)
    {
        try
        {
            const response = await fetch("http://localhost:3001/videogame",
            {
                method: "POST",
                body: JSON.stringify(payload),
                headers: {
                  "Content-type": "application/json; charset=UTF-8",
                },
            });
            const json= await response.json();
            console.log(json)
            dispatch({type:ADDED_ID,payload:json.id});
        }
        catch(e){console.log(e)}
    }
}

//----Add Videogames----

//----Filters And Order----

export function setOrder(payload)
{
 return{type:CHANGE_ORDER,payload}
}

export function setFilter(payload)
{
 return{type:CHANGE_FILTER,payload}
}

export function setOrderAndFilter(payload)
{
 return{type:CHANGE_FILT_ORD,payload}
}

//----Filters And Order----


//----Page----

export function setPage(payload)
{
    return {type:NEW_PAGE,payload}
}

//----Page----


//----Search----

export function setSearch(payload)
{
    return {type:NEW_SEARCH,payload}
}

//----Search----