const { Router } = require('express');
const res = require('express/lib/response');
const api_key='0d0560168f704159886770370807e888';
const fetch = require("node-fetch");
//const { Sequelize } = require('sequelize/types');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Videogame,Genre } = require('../db.js');

const router = Router();

async function reSize(page,out,apiRaw,dbRaw,name)
{
    if(out.length==15){return out}
    else
    {
        rawOut=[...dbRaw,...apiRaw]; //genero el array original de db+api.page1 sin cortar
        var apiPage=2;  //la siguiente pagina es la 2, arranco de ahi
        var lastPage=false; //flag de ultima pagina de la api (para caso limite)
        while(rawOut.length<=((page+1)*15) && lastPage==false) //mientras que el array total sea menor que el numero del ultimo item de la pag ((page+1)*15)
        {
            let newPage=[]; //nuevo array para agregar a rawOut
            if(name){newPage= await fetch(`https://api.rawg.io/api/games?search=${name}&key=${api_key}&page=${apiPage}`)} //fetchea de la siguiente pagina con search
            else{newPage= await fetch(`https://api.rawg.io/api/games?key=${api_key}&page=${apiPage}`)} //fetchea de la siguiente pagina sin search
            newPage= await newPage.json(); //json..
            newPage= newPage.results; //aca estan los juegos 
            if(!newPage){lastPage=true} //Me fijo si ya no hay mas items en la api, si no hay results, no hay mas paginas
            else    //si no es asi
            {
                rawOut=[...rawOut,...newPage]; //agrega a rawOut
                apiPage++; //aumento para el llamado a la siguiente pagina
            }
        }
        return rawOut.slice(page*15,(page+1)*15); //devuelvo cortado los 15 especificos
    }
}

function compareName( a, b ) {
    //console.log(a.name)
    //console.log(b.name)
    if ( a.name < b.name ){
      return -1;
    }
    if ( a.name > b.name ){
      return 1;
    }
    return 0;
  }

function compareRatings( a, b ) {
  if ( a.rating > b.rating ){
    return -1;
  }
  if ( a.rating < b.rating ){
    return 1;
  }
  return 0;
}

async function getVideogames(name,page=0,filter,order)
{
    //--me traigo todo de la db y api--
    let dbRaw = await Videogame.findAll(); //busco los juegos en db
    //let dbRaw=[];
    var apiRaw =[];

    if(name) //--Caso:  /videogames?name="..." --
    {
        apiRaw=await fetch(`https://api.rawg.io/api/games?search=${name}&key=${api_key}`) //fetcheo a api con search
        apiRaw= await apiRaw.json(); //json...
        apiRaw=apiRaw.results // el .results es el array de videojuegos
        dbRaw=dbRaw.filter(vdg => vdg.name.toLowerCase().includes(name.toLowerCase()));//filtro por nombre en base de datos
        apiRaw=apiRaw .filter(vdg => vdg.name.toLowerCase().includes(name.toLowerCase()));//filtro por nombre en api
        //console.log(apiRaw);
    }
    else //--Caso: /videogames --
    {
        apiRaw= await fetch(`https://api.rawg.io/api/games?key=${api_key}`) //fetcheo a api sin search
        apiRaw= await apiRaw.json();    //json..
        apiRaw=apiRaw.results   //el .results estan los videojuegos
    }
    let out = [...dbRaw,...apiRaw].slice(page*15,(page+1)*15);// || page=0 => 0*15 a (1*15)-1 == 0 a 14 || page=1 => 1*15 a ((1+1)*15)-1 == 15 a 29 || 
    out= await reSize(page,out,apiRaw,dbRaw,name); //lo mando aca para asegurarme que out sea 15, si es menos, fetchea las siguientes paginas de api y rellena 
    return out;


    
}

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
                dbRaw=dbRaw.filter(vd => vd.genres.includes(filter.payload)); //revisar esto, ver como filtrar DB
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
router.get('/videogames',async function(req,res)
{
    try
    {
        let {name}=req.query;
        let {page,filter,order}=req.body
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
