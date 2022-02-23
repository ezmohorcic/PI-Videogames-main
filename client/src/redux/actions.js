import { ALL_GENRES, ADD_GENRE, SHOW_VIDEOGAMES_PAGE, DETAIL_VIDEOGAME, CHANGE_ORDER, CHANGE_FILTER, CHANGE_FILT_ORD, NEW_PAGE, NEW_SEARCH, ADDED_ID, NEXT_PAGE, LAST_PAGE, NUMBER_404, NUMBER_200, SET_SEARCHING_000, SEARCHING_DETAILED, NUMBER_000, CHANGE_FILTER_GENRE, CHANGE_FILTER_DBOAPI, FILTER_RATINGS_MENOR, SOLO_AS } from "../consts";

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
    console.log(filter)
    return async function(dispatch)
    {
        try
        {
            let q= "?page="+page.toString();
            if(query){q= q+"&name="+query;}
            if(filter)
            {   
                if(filter.type){q= q+'&filterType='+filter.type;}
                if(filter.payload){q = q+'&filterGenres='+filter.payload;}
            }
            if(order){if(order.type){q= q+'&order='+order.type;}}
            console.log(q)
            const response = await fetch("http://localhost:3001/videogames"+q); //+q+p+filterType+filterGenres,orderType
            let json= await response.json();
            if(filter)
            { 
                console.log("dentro de if filter")
                if(filter.dbOapi=== "dbOapi")
                //if(filter.type=== "dbOapi")
                {
                    console.log("filtro en dbOapi")
                    if(filter.dbOapiPayload==="db"){
                    //if(filter.payload==="db"){
                        console.log("filtro en db")
                        json=json.filter(vg=> typeof vg.id == "string")}
                    else if(filter.dbOapiPayload==="api"){
                    //else if(filter.payload==="api"){
                        console.log("filtro en api")
                        json=json.filter(vg=> typeof vg.id == "number")}
                    //json=json.slice(page*15,(page+1)*15);
                }
                /*if(filter.filterMenor)
                {
                    console.log("filtro rating menores a 2");
                    json= json.filter(vg=>vg.rating<=2);
                }*/
                if(filter.typeSoloA)
                {
                    console.log("filter typeSoloA")
                    json = json.filter(vg=>vg.name[0].toLowerCase()=='a')
                }
            }
            let number=NUMBER_404;
            console.log(json)
            json.length==0? number=NUMBER_404 : number=NUMBER_200;
            json=json.slice(page*15,(page+1)*15);
            dispatch({type:SHOW_VIDEOGAMES_PAGE,payload:{videogames:json,number}});
        }
        catch(e){console.log(e)}
    }
}

export function setVideogamesPorBuscando()
{
    return({type:SET_SEARCHING_000})
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
            let json= await response.json();
            let number=NUMBER_404;
            console.log(json)
            console.log(json.hasOwnProperty("id"))
            json.hasOwnProperty("id")? number=NUMBER_200: number=NUMBER_404;
            dispatch({type:DETAIL_VIDEOGAME,payload:{videogame:json,number}});
        }
        catch(e)
        {
            console.log(e);
            dispatch({type:DETAIL_VIDEOGAME,payload:{videogame:{},number:NUMBER_404}});
        }
    }
}

export function detailedSearching()
{
    return {type:SEARCHING_DETAILED, payload:{videogame:{},number:NUMBER_000}}
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
            console.log(response)
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

export function setFilterGenres(payload)
{
 return{type:CHANGE_FILTER_GENRE,payload}
}

export function setFilterDbOApi(payload)
{
 return{type:CHANGE_FILTER_DBOAPI,payload}
}

export function setFilterRatingMenor(payload)
{
    return{type:FILTER_RATINGS_MENOR,payload}
}

export function setSoloA(payload)
{
    return({type:SOLO_AS,payload})
}

//----Filters And Order----


//----Page----

export function setPage(payload)
{
    return {type:NEW_PAGE,payload}
}

export function nextPage()
{
    return {type:NEXT_PAGE,payload:1}
}

export function lastPage()
{
    return {type:LAST_PAGE,payload:1}
}
//----Page----


//----Search----

export function setSearch(payload)
{
    return {type:NEW_SEARCH,payload}
}

//----Search----