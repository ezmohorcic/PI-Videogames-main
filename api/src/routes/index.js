const { Router } = require('express');
const res = require('express/lib/response');
const api_key='0d0560168f704159886770370807e888';
const fetch = require("node-fetch");
//const { Sequelize } = require('sequelize/types');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Videogame,Genre } = require('../db.js');

const router = Router();

let newsGenresNumberId=1000;

async function ALTERgetVideogames(name,page=0,filter,order)
{
    //--me traigo todo de la db y api--
    console.log("antes de findAll dbraw")
    let dbRaw = await Videogame.findAll({include:Genre}); //busco los juegos en db
    /* 
    let dbRaw =Videogame.findAll({include:Genre})
    .then(dbRaw=>
    {
        if(name){if(dbRaw)dbRaw=dbRaw.filter(vdg => vdg.name.toLowerCase().includes(name.toLowerCase()));}
        return dbRaw;
    })
    */
    
    if(name){if(dbRaw)dbRaw=dbRaw.filter(vdg => vdg.name.toLowerCase().includes(name.toLowerCase()));}//filtro por nombre en base de datos}

    var apiRaw =[];
    console.log("antes del for de la api")
    for(let i=1;i<3;i++) //Traigo 100 juegos por indicado en ReadMe
    {
        let temp={};
        if(name){ temp = await fetch(`https://api.rawg.io/api/games?search=${name}&key=${api_key}&page=${i}`);} //si hay que filtrar por nombre
        else {temp= await fetch(`https://api.rawg.io/api/games?key=${api_key}&page=${i}`);}   //si no hay que filtrar por nombre
        temp = await temp.json();
        
        temp=temp.results;
        if(!temp){temp=[];}
        apiRaw=[...apiRaw,...temp];

       /* if(name)
        {
            fetch(`https://api.rawg.io/api/games?search=${name}&key=${api_key}&page=${i}`)
            .then(r=>r.json())
            .then(r=>
            {
                const results=r.results;
                if(!results){temp=[];}
                apiRaw=[...apiRaw,...results]
            })
        }
        else
        {
            fetch(`https://api.rawg.io/api/games?key=${api_key}&page=${i}`)
            .then(r=>r.json())
            .then(r=>
            {
                const results=r.results;
                if(!results){temp=[];}
                apiRaw=[...apiRaw,...results]
            })
        }*/
    }
    console.log("despues del for")
    //--code con order/filtro
    
    if(filter) // genero || db O api  
    {
        console.log("dentro de filter")
        switch (filter.type) {
            case "genero":
                console.log("caso genero")
                /*dbRaw = await Videogame.findAll(
                    {
                        include:[{
                            model: Genre,
                            where:{name:filter.payload},
                            attributes:['name']
                        }]
                    });*/
                //dbRaw=dbRaw.filter(vd => vd.genres.includes(filter.payload)); //revisar esto, ver como filtrar DB
                
                dbRaw=dbRaw.filter(vd=>
                    {
                        let flag=false;
                        vd.genres.forEach(element => 
                        {
                            if(element.name==filter.payload)
                            {
                                flag=true;
                            }
                        });
                        return flag;
                    });
                apiRaw = apiRaw.filter(vd=>
                    {
                        let flag=false;
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
        
            /*case "dbOapi":
                console.log("caso dbOapi")
                    if(filter.payload=="db"){apiRaw=[];}
                    else if(filter.payload=="api"){dbRaw=[];}
            break;*/

            default:
            break;
        }
    }

    let outRaw = [...dbRaw,...apiRaw];

    if(order) // alfabetico || rating
    {
        console.log("dentro de order")
        switch (order) {
            case 'alfabetico':
                outRaw.sort(function(a,b)
                {
                    if(a.name.toLowerCase() < b.name.toLowerCase()){return -1;}
                    if(a.name.toLowerCase() > b.name.toLowerCase()){return 1;}
                    return 0;
                });
                console.log("saliendo de alf")
            break;

            case 'invAlfabetico':
                outRaw.sort(function(a,b)
                {
                    if(a.name.toLowerCase() > b.name.toLowerCase()){return -1;}
                    if(a.name.toLowerCase() < b.name.toLowerCase()){return 1;}
                    return 0;
                });
                console.log("saliendo de alfInv")
            break;

            case 'rating':
                console.log("ratingg")
                outRaw.sort((a,b)=>b.rating-a.rating);
            break;

            case 'ratingInv':
                console.log("ratingInv");
                outRaw.sort((a,b)=>a.rating-b.rating)
            break;
        
            default:
            break;
        }
    }

    let out =outRaw;
    /*if(filter) // || page=0 => 0*15 a (1*15)-1 == 0 a 14 || page=1 => 1*15 a ((1+1)*15)-1 == 15 a 29 ||
    {
        filter.type=="dbOapi"? out=outRaw : out=outRaw.slice(page*15,(page+1)*15);
    }
    else {out = outRaw.slice(page*15,(page+1)*15);}*/
    out = out.map((element)=>
    {
        let partial={};
        partial.id=element.id
        partial.name=element.name;
        element.background_image? partial.background_image=element.background_image : partial.background_image="./alt_img_joystick.jpg";
        typeof element.genres == "object"? partial.genres=element.genres.map(genre=>genre.name).join(',') : partial.genre="nuh"
        partial.rating=element.rating;
        return partial;
    }); 
    return out;
}

async function getVideogameByID(idVideogame)
{
    if(idVideogame.length<20) //es de api
    {
        const resp = await fetch(`https://api.rawg.io/api/games/${idVideogame}?key=${api_key}`); //fetcheo el id
        const raw=await resp.json(); //json...

        let out={};
        
        /*return fetch(`https://api.rawg.io/api/games/${idVideogame}?key=${api_key}`)
        .then(r=>r.json())
        .then(raw=>
        {
            let out={};
            out.id=raw.id;
            if(raw.description) out.description=raw.description;
            typeof raw.platforms === "object"? out.platforms=raw.platforms.map(element=>element.platform.name).join(',') : out.platforms=raw.platforms;
            if(raw.name) out.name=raw.name;
            if(raw.rating) out.rating=raw.rating;
            raw.released? out.releaseDate=raw.released : out.releaseDate=raw.releaseDate;
            if(raw.genres)out.genres=raw.genres.map(element=>element.name).join(',')
            raw.background_image? out.background_image=raw.background_image : out.background_image="./alt_img_joystick.jpg";
            //console.log("linea 177",out)
            return out;
        });;*/
        
        if(raw.hasOwnProperty("id"))
        {
            console.log("dentro de raw.length")
            out.id=raw.id;
            if(raw.description) out.description=raw.description;
            typeof raw.platforms === "object"? out.platforms=raw.platforms.map(element=>element.platform.name).join(',') : out.platforms=raw.platforms;
            if(raw.name) out.name=raw.name;
            if(raw.rating) out.rating=raw.rating;
            raw.released? out.releaseDate=raw.released : out.releaseDate=raw.releaseDate;
            if(raw.genres)out.genres=raw.genres.map(element=>element.name).join(',')
            raw.background_image? out.background_image=raw.background_image : out.background_image="./alt_img_joystick.jpg";
        }
        return out;
    }
    else    //es de database, agregado a mano
    {
        /*
        return Videogame.findOne({where:{id:idVideogame},include:{model:Genre}})
        .then(videogame=>
        {
            videogame.dataValues.background_image="/alt_img_joystick.jpg"
            videogame.dataValues.genres=videogame.dataValues.genres.map(genre=>genre.name).join(',');
            videogame.dataValues.description= "<p>"+videogame.dataValues.description+"</p>"

            return videogame;
        })
        .catch(e=>{console.log("fuego en database de getVideogameByID")})
        */
        console.log("es una id de database");
        try
        {
            const videogame= await Videogame.findOne(
                {
                    where:{id:idVideogame},
                    include:{model: Genre,}
                })
            //const videogame= await Videogame.findByPk(idVideogame); //findByPk == busqueda por primary key
            videogame.dataValues.background_image="/alt_img_joystick.jpg"
            videogame.dataValues.genres=videogame.dataValues.genres.map(genre=>genre.name).join(',');
            videogame.dataValues.description= "<p>"+videogame.dataValues.description+"</p>"

            return videogame;
        }
        catch(e){()=>console.log("fuego en database de getVideogameByID: "+e)}
    }
}

async function getGenres()
{
    
    /*return Genre.findAll()
    .then(r=>
    {
        console.log("linea 257",r.length)
        if(r.length){return r}
        else
        {
            return fetch(`https://api.rawg.io/api/genres?key=${api_key}`)
            .then(r=>r.json())
            .then(res=>
            { 
                console.log("linea 264")
                rawInner = res.results.map(g=>
                {
                   return Genre.findOrCreate({where:{id:g.id, name:g.name}})
                });
                return res.results;
            })
            
        }
    })*/



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
        //genres.forEach(element=>console.log(element.name))
        return genres;
    }
    catch(e){()=>console.log("fuego en getGenres")}
    
}

async function AddVideogame(name,description,releaseDate,rating,platforms,genres)
{

    /*platforms=platforms.join(',') //hago el join, asi lo subo como un string de platforms
    return Videogame.findOrCreate( //si no existe, lo crea
    {
        where:
        {
            name,
            description,
            releaseDate,
            rating,
            platforms,
        }
    })
    .then(gamesAdded=>
    {
        gamesAdded[0].setGenres(genres)
        console.log("linea296")
        return gamesAdded[0]
    })*/
    


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
//cambiar nomnbre y favicon de pagina


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
        if(!page){page=0;}
        console.log(name)
        let videogames = await ALTERgetVideogames(name,page,filter,order);
        //console.log(videogames)
        return res.json(videogames);
    }
    catch(e){console.log(e);}

});

router.get('/videogames/:idVideogame',async function(req,res)
{
   /* try
    {
        let videogame=await getVideogameByID(req.params.idVideogame)
        console.log(videogame)
        res.json(videogame);
        //return res.json(await getVideogamesByID(req.params.idVideogame));
    }
    catch(e){console.log(e);}*/

    getVideogameByID(req.params.idVideogame)
    .then(e=>
        {   console.log("linea342",e)
            res.json(e)})
    .catch(e=>console.log(e))

});

router.get('/genres',async function(req,res)
{
    try
    {
        let genres= await getGenres();
        res.json(genres);
    }
    catch(e){console.log(e)}

    /*getGenres()
    .then(e=>
        {   console.log(e)
            res.json(e)})
    .catch(e=>console.log(e))*/
});

router.post('/videogame',async function(req,res)
{
    console.log(req.body.name)
    let {name,description,releaseDate,rating,platforms,genres} = req.body; //tomo lo enviado desde el front 
    let newVideogame= await AddVideogame(name,description,releaseDate,rating,platforms,genres);
    res.json(newVideogame); //devuelvo el creado;
});

async function killingIDVideogame(id)
{
    try
    {
        const elem = await Videogame.destroy({
            where: {id: id}
         });
         return "Doneso";
    }
    catch(e){return "unu"}

    
}

router.delete('/videogame',async function(req,res)
{
    try
    {
        let videogame=await killingIDVideogame(req.body.id)
        console.log("despues de que deleteo",videogame)
        res.json(videogame);
        //return res.json(await getVideogamesByID(req.params.idVideogame));
    }
    catch(e){console.log(e);}

});

/*async function addingNewGenre(newGenre)
{
    newsGenresNumberId++;
    await Genre.findOrCreate({where:{name:newGenre,id:newsGenresNumberId}})
    const allGenres= await Genre.findAll();
    return allGenres;
}*/

/*router.post('/genres',async function(req,res)
{
    console.log(req.body.genre)
    const newGenre=req.body.genre;
    let all = await addingNewGenre(newGenre)
    res.json(all);
});*/

module.exports = router;
