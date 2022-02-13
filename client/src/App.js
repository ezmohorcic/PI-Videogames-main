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
        <Header/>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<StartView/>}/>   
            <Route exact path="/showAll" element={<ShowAll/>}/>
            <Route path={"/"+dummy} element={<DetailVG/>}/>
            <Route path={"/CreateVG"} element={<CreateVG/>}/>
            <Route path={"/ShowGenres"} element={<ShowGenres/>}/>
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
