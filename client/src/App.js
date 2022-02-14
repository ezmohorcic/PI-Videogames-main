import React from 'react';
import { Provider } from 'react-redux';
import {BrowserRouter,Routes,Route} from "react-router-dom";

import store from './redux/store.js';
import { StartView } from './components/StartView/StartView';
import { Header } from './components/Header/Header';
import { ShowAll } from './components/ShowAll/ShowAll';
import { DetailVG } from './components/DetailedVG/DetailVG';
import { CreateVG } from './components/CreateVG/CreateVG';
import { ShowGenres } from './components/ShowGenres/ShowGenres';

import './App.css';

function App() {
  const dummy="xd"
  return (
    <div className="App">
      <h1>Henry Videogames</h1>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<><Header/><StartView/></>}/>   
            <Route exact path="/showAll" element={<><Header/><ShowAll/></>}/>
            <Route path={"/videogame/:id"} element={<><Header/><DetailVG/></>}/>
            <Route exact path={"/CreateVG"} element={<><Header/><CreateVG/></>}/>
            <Route exact path={"/ShowGenres"} element={<><Header/><ShowGenres/></>}/>
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
