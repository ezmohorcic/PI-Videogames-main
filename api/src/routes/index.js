const { Router } = require('express');
const res = require('express/lib/response');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Videogame,genre } = require('../db.js');

const router = Router();

async function getVideogames(name,page)
{
    
}

async function getVideogameByID(idVideogame)
{
    if(typeof idVideogame =="number") //es de api
    {
        const resp = await fetch(`https://api.rawg.io/api/games/${idVideogame}?key=${YOUR_API_KEY}`)
        const raw=await resp.json();
        const out= await raw.map((element,index)=>
        {
            return{
                ID:element.results.id,
                name:element.results.name,
                description:element.results.reviews_text_count,
                releaseDate:element.results.released,
                rating:element.results.rating,
                platforms:results.results.platforms,//ver como funciona
                background_image:element.results.background_image,
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
