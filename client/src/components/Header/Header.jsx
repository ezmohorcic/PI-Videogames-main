import React, {useState} from 'react';
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
/*import {connect} from 'react-redux' */
import { getVideogames, setOrderAndFilter, setPage, setSearch, setVideogamesPorBuscando } from '../../redux/actions';

import './Header.css';

export function Header()
{
    const dispatch=useDispatch();

    const [innersearch,setInnerSearch]=useState("");

    const searching = function()
    {
        /*
            setOrderAndFilter({filter:null,order:null});
            setSearch(innersearch);
            setPage(0);
            setVideogamesPorBuscando();
        */
        dispatch(setOrderAndFilter({filter:null,order:null}));
        dispatch(setSearch(innersearch))
        dispatch(setPage(0));
        dispatch(setVideogamesPorBuscando())
    }

    function headerImgClick()
    {
        /*
        setVideogamesPorBuscando()
        getVideogames({page:0})
         */
        dispatch(setVideogamesPorBuscando())
        dispatch(getVideogames({page:0}));
    }
    
    let button;
    if(innersearch.length>3){button=<Link className='dataSearch' to={"/showAll?search="+innersearch} onClick={searching}>owo!</Link>}
    else{button="owo!";}

    return(
        <div id='headerContainer'>
            <div id="headerImgShell"><Link to={"/showAll"} id="linkLogoShell" onClick={()=>headerImgClick()}><img id='headerLogoShell' src="/kisspng_joystick.png"/></Link></div>
            <div id="inputHeaderShell">
                <div id="searchTextContainer">
                    <input type="text" name="searchText" id="searchText" value={innersearch} placeholder={"Busqueda"} onChange={(e)=>setInnerSearch(e.target.value)}/>
                </div>
                <div id="searchButContainer">
                    <button id="searchBut">{button}</button>
                </div>
            </div>
            <div id='dataBaseHeader'>
                <div className="goToLinkHeader leftGoTo"><Link className='dataBaseLink' to={"/CreateVG"}> database owo! </Link></div>
                <div className="goToLinkHeader rightGoTo"><Link className='dataBaseLink' to={"/ShowGenres"}>owo Genres! </Link></div>
            </div>
        </div>
    )
}

/*

class Header extends React.Component
{
    constructor(props)
    {
        super(props)
        this.headerImgClick=this.headerImgClick.bind(this)
        this.searching=this.searching.bind(this)
        this.innersearch={innersearch:""}
    }

    function searching ()
    {
        props.setOrderAndFilter({filter:null,order:null});
        setSearch(innersearch);
        setPage(0);
        setVideogamesPorBuscando();
    
    function headerImgClick()
    {
        setVideogamesPorBuscando()
         getVideogames({page:0})
    }

    let button;
    if(innersearch.length>3){button=<Link className='dataSearch' to={"/showAll?search="+innersearch} onClick={()=>this.searching()}>owo!</Link>}
    else{button="owo!";}

    render()
    {
        return(
            <div id='headerContainer'>
                <div id="headerImgShell"><Link to={"/showAll"} id="linkLogoShell" onClick={()=>this.headerImgClick()}><img id='headerLogoShell' src="/kisspng_joystick.png"/></Link></div>
                <div id="inputHeaderShell">
                    <div id="searchTextContainer">
                        <input type="text" name="searchText" id="searchText" value={this.innersearch.innersearch} placeholder={"Busqueda"} onChange={(e)=>this.setState({innersearch:e.target.value})}/>
                    </div>
                    <div id="searchButContainer">
                        <button id="searchBut">{button}</button>
                    </div>
                </div>
                <div id='dataBaseHeader'>
                    <div className="goToLinkHeader leftGoTo"><Link className='dataBaseLink' to={"/CreateVG"}> database owo! </Link></div>
                    <div className="goToLinkHeader rightGoTo"><Link className='dataBaseLink' to={"/ShowGenres"}>owo Genres! </Link></div>
                </div>
            </div>
    }  

}

const mapStateToProps = {setOrderAndFilter,setSearch,setPage,setVideogamesPorBuscando}
export default connect(mapStateToProps,null)(Header);
*/