const { Router } = require('express');
const res = require('express/lib/response');
const YOUR_API_KEY='0d0560168f704159886770370807e888';
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Videogame,genre } = require('../db.js');

const router = Router();

async function getVideogames(name,page)
{
    let raw=Videogame.findAll({limit:page*15,where:{name:'%'+name+'%'}}); //busco los juegos en db
    if(raw.length<page*15){raw=[];} //si hay menos que la pagina, es que mostre todos
    else{raw=raw.slice((page*15)-1,(page+1)*15)} //sino no mostre todos, elimino los que ya mostre
    if(raw.length==15){return raw}
    let apiRaw = await fetch(`https://api.rawg.io/api/games/?search=${name}&key=${YOUR_API_KEY}`) //fetcheo a api
    if(raw.length>0) //si hay juegos de db, significa que es la primera vez que muestro juegos de api
    {
        apiRaw=apiRaw.slice(0,15-raw.length); //busco para rellenar 15
        return raw.concat(apiRaw); //concateno y devuelvo
    }
    else
    {
        return apiRaw.slice((page*15)-1,(page+1)*15)  //corto de atras por cantidad de paginas, y adelante para dejar 15 
    }
}

async function getVideogameByID(idVideogame)
{
    if(typeof idVideogame =="number") //es de api
    {
        const resp = await fetch(`https://api.rawg.io/api/games/${idVideogame}?key=${YOUR_API_KEY}`);
        const raw=await resp.json();
        const out= await raw.map((element,index)=>
        {
            return{
                ID:element.results.id,
                name:element.results[0].name,
                description:element.results[0].reviews_text_count,
                releaseDate:element.results[0].released,
                rating:element.results[0].rating,
                platforms:results.results[0].platforms,//ver como funciona
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
