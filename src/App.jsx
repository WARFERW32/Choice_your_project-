import React from 'react';
import Header from './components/Header/Header'
import { HashRouter as Router } from 'react-router-dom';
import AsideMenu from './components/AsideMenu/AsideMenu';

import StoreProvider from '../src/store/StoreProvider';

import './App.scss';
import Content from './components/Content/Content';


const App = () => (
 <StoreProvider>
     <Header />
     <Router>
     <div className="content-wrapper">
         <AsideMenu/>
         <Content/>
     </div>
     </Router>
     
 </StoreProvider>
);

export default App;