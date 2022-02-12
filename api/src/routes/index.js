const { Router } = require('express');
const res = require('express/lib/response');
const api_key='0d0560168f704159886770370807e888';
const fetch = require("node-fetch");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Videogame,genre } = require('../db.js');

const router = Router();

async function reSize(page,out,apiRaw,dbRaw,name)
{
    if(out.length==15){return out}
    else
    {
        rawOut=[...dbRaw,...apiRaw]; //busco el array original de db+api.page1
        var apiPage=2;
        var lastPage=false;
        while(rawOut.length<=((page+1)*15) && lastPage==false) //mientras que el array total sea menor que el numero del ultimo item de la pag ((page+1)*15)
        {
            let newPage=[];
            if(name){newPage= await fetch(`https://api.rawg.io/api/games?search=${name}&key=${api_key}&page=${apiPage}`)} //fetchea de la siguiente pagina 
            else{newPage= await fetch(`https://api.rawg.io/api/games?key=${api_key}&page=${apiPage}`)} //fetchea de la siguiente pagina 
            newPage= await newPage.json();
            newPage= newPage.results;
            if(!newPage){lastPage=true}
            else
            {
                rawOut=[...rawOut,...newPage]; //agrega a rawOut
                apiPage++; //aumento para el llamado a la siguiente pagina
            }
        }
        return rawOut.slice(page*15,(page+1)*15); //devuelvo cortado los 15 especificos
    }
}


async function getVideogames(name,page=0)
{
    //--me traigo todo de la db y api--
    //let dbRaw=Videogame.findAll(); //busco los juegos en db
    let dbRaw=[];
    var apiRaw =[];

    if(name) //--Caso:  /videogames?name="..." --
    {
        apiRaw=await fetch(`https://api.rawg.io/api/games?search=${name}&key=${api_key}`) //fetcheo a api
        apiRaw= await apiRaw.json();
        apiRaw=apiRaw.results
        dbRaw=dbRaw.filter(vdg => vdg.name.toLowerCase().includes(name.toLowerCase()));//filtro por nombre en base de datos
        apiRaw=apiRaw .filter(vdg => vdg.name.toLowerCase().includes(name.toLowerCase()));//filtro por nombre en api
        //console.log(apiRaw);
    }
    else //--Caso: /videogames --
    {
        apiRaw= await fetch(`https://api.rawg.io/api/games?key=${api_key}`)
        apiRaw= await apiRaw.json();
        apiRaw=apiRaw.results
    }
    let out = [...dbRaw,...apiRaw].slice(page*15,(page+1)*15);// || page=0 => 0*15 a (1*15)-1 == 0 a 14 || page=1 => 1*15 a ((1+1)*15)-1 == 15 a 29 || 
    out= await reSize(page,out,apiRaw,dbRaw,name); //lo mando aca para asegurarme que out sea 15, si es menos, fetchea las siguientes paginas de api y rellena 
    return out;
}

async function getVideogameByID(idVideogame)
{
    if(typeof idVideogame =="number") //es de api
    {
        const resp = await fetch(`https://api.rawg.io/api/games/${idVideogame}?key=${YOUR_API_KEY}`);
        const raw=await resp.json();
        const out= await raw.map((element,index)=>
        {   
            /*const genres=[];
            const platforms=[];
            for(var i=0;i<element.results[0].platforms;i++)
            {
                platforms=element.results[0].platforms[i].name;
            }

            for(var i=0;i<element.results[0].genres;i++)
            {
                genres=element.results[0].genres[i].name;
            }*/
            return{
                ID:element.results.id,
                name:element.results[0].name,
                description:element.results[0].reviews_text_count,
                releaseDate:element.results[0].released,
                genres:element.results[0].genres,
                rating:element.results[0].rating,
                platforms:element.results[0].platforms,
                background_image:element.results[0].background_image,
            }
        });
        return out;
    }
    else    //es de database, agregado a mano
    {
        try
        {
            const videogames= await Videogame.findByPk(ID);
            return videogames;
        }
        catch(e){()=>console.log("fuego en database de getVideogameByID:"+e)}
    }
}

async function getGenres()
{
    try
    {
        const genres=await genre.findAll();
        return genres;
    }
    catch(e){()=>console.log("fuego en getGenres")}
}

async function AddVideogame(details)
{
    return Videogame.create({
        ID:details.ID,
        name:details.name,
        description:details.description,
        genres:details.genres,
        releaseDate:details.releaseDate,
        rating:details.rating,
        platforms:details.platforms,
    });
}

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/videogames',async function(req,res)
{
    try
    {
        let {name}=req.query;
        let {page}=req.body
        let videogames = await getVideogames(name,page);
        return res.json(videogames);
    }
    catch(e)
    {
        console.log(e);
    }

});

router.get('/videogames/:idVideogame',async function(req,res)
{
    try
    {
        let videogame=await getVideogameByID(req.params.idVideogame)
        res.json(videogame);
        //return res.json(await getVideogamesByID(req.params.idVideogame));
    }
    catch(e)
    {
        console.log(e);
    }

});

router.get('/genres',async function(req,res)
{
    try
    {
        let genres= await getGenres();
        res.json(genres);
    }
    catch(e){console.log(e)}
});

router.post('/videogame',async function(req,res)
{
    let details={ID:req.body.ID,name:req.body.name,description:req.body.description,releaseDate:req.body.releaseDate,rating:req.body.rating,platforms:req.body.platforms,genres:req.body.genres}
    let newVideogame= await AddVideogame(details);
    res.json(newVideogame);
});

module.exports = router;
