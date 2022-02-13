const { Router } = require('express');
const res = require('express/lib/response');
const api_key='0d0560168f704159886770370807e888';
const fetch = require("node-fetch");
//const { Sequelize } = require('sequelize/types');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Videogame,Genre } = require('../db.js');

const router = Router();

async function ALTERgetVideogames(name,page=0,filter,order)
{
    //--me traigo todo de la db y api--
    let dbRaw = await Videogame.findAll(); //busco los juegos en db
    if(name){dbRaw=dbRaw.filter(vdg => vdg.name.toLowerCase().includes(name.toLowerCase()));}//filtro por nombre en base de datos}

    var apiRaw =[];
    for(let i=1;i<6;i++) //Traigo 100 juegos por indicado en ReadMe
    {
        let temp={};
        if(name){ temp = await fetch(`https://api.rawg.io/api/games?search=${name}&key=${api_key}&page=${i}`);} //si hay que filtrar por nombre
        else {temp= await fetch(`https://api.rawg.io/api/games?key=${api_key}&page=${i}`);}   //si no hay que filtrar por nombre
        temp = await temp.json();
        temp=temp.results;
        if(!temp){temp=[];}
        apiRaw=[...apiRaw,...temp];
    }

    //--code con order/filtro
    
    if(filter) // genero || db O api  
    {
        switch (filter.type) {
            case "genero":
                dbRaw = await Videogame.findAll(
                    {
                        include:[{
                            model: Genre,
                            where:{name:filter.payload},
                            attributes:['name']
                        }]
                    });
                console.log(dbRaw)
                //dbRaw=dbRaw.filter(vd => vd.genres.includes(filter.payload)); //revisar esto, ver como filtrar DB
                apiRaw = apiRaw.filter(vd=>
                    {
                        let flag=false;
                        console.log(vd.name)
                        vd.genres.forEach(element => 
                        {
                            if(element.name==filter.payload)
                            {
                                flag=true;
                            }
                        });
                        return flag;
                    });
            break;
        
            case "dbOapi":
                    if(filter.payload=="db"){apiRaw=[];}
                    else if(filter.payload=="api"){dbRaw=[];}
            break;

            default:
            break;
        }
    }

    let outRaw = [...dbRaw,...apiRaw];
    let logg= outRaw.map(vg=>vg.name);
    //console.log(logg)

    if(order) // alfabetico || rating
    {
        switch (order.type) {
            case 'alfabetico':
                outRaw.sort(function(a,b)
                {
                    if(a.name < b.name){return -1;}
                    if(a.name > b.name){return 1;}
                    return 0;
                });
            break;

            case 'rating':
                outRaw.sort((a,b)=>b.rating-a.rating);
            break;
        
            default:
            break;
        }
    }


    let out = outRaw.slice(page*15,(page+1)*15);// || page=0 => 0*15 a (1*15)-1 == 0 a 14 || page=1 => 1*15 a ((1+1)*15)-1 == 15 a 29 || 
    return out;
}

async function getVideogameByID(idVideogame)
{
    console.log(typeof idVideogame)
    if(idVideogame.length<20) //es de api
    {
        const resp = await fetch(`https://api.rawg.io/api/games/${idVideogame}?key=${api_key}`); //fetcheo el id
        const raw=await resp.json(); //json...
        return raw; 
    }
    else    //es de database, agregado a mano
    {
        console.log("es una id de database");
        try
        {
            
            const videogames= await Videogame.findByPk(idVideogame); //findByPk == busqueda por primary key
            console.log(videogames);
            return videogames;
        }
        catch(e){()=>console.log("fuego en database de getVideogameByID: "+e)}
    }
}

async function getGenres()
{
    try
    {
        let genres=await Genre.findAll(); //busco los generos en database
        if (genres.length){
            console.log("generos en base de datos")
            return genres;} //si estan los generos en database, los devuelve
        
        //--Esto se hace una vez y trae a database desde api los generos--
        console.log("Trayendo generos desde api")
        genres= await fetch(`https://api.rawg.io/api/genres?key=${api_key}`); //fetcheo los generos
        genres= await genres.json();
        genres=genres.results;
        genres.forEach(async g => { //Por cada genero, mando una peticion de creacion a database
            await Genre.findOrCreate({ //si no encuentra, lo crea
                where: { //manda los datos internos de cada genero
                    id: g.id,  
                    name: g.name,
                }
            })
        })

        return genres;
    }
    catch(e){()=>console.log("fuego en getGenres")}
}

async function AddVideogame(name,description,releaseDate,rating,platforms,genres)
{
    platforms=platforms.join(',') //hago el join, asi lo subo como un string de platforms
    try
    {
        const gameAdded = await Videogame.findOrCreate( //si no existe, lo crea
        {
            where:
            {
                name,
                description,
                releaseDate,
                rating,
                platforms,
            }
        });
        console.log(gameAdded)
        await gameAdded[0].setGenres(genres); //relaciona el id de genres con el juego creado (el id es el name)
        return gameAdded[0]; 
    }
    catch(e){console.log(e)}
}

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/",function(req,res)
{
    
});

router.get('/videogames',async function(req,res)
{
    try
    {
        let name=req.query.name;
        let filter={type:req.query.filterType,payload:req.query.filterGenres}
        let page=parseInt(req.query.page);
        let order = req.query.order;
        let videogames = await ALTERgetVideogames(name,page,filter,order);
        return res.json(videogames);
    }
    catch(e){console.log(e);}

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
    let {name,description,releaseDate,rating,platforms,genres} = req.body; //tomo lo enviado desde el front 
    let newVideogame= await AddVideogame(name,description,releaseDate,rating,platforms,genres);
    res.json(newVideogame); //devuelvo el creado;
});

module.exports = router;
