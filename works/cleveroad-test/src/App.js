import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header'
import Adding from './components/Adding/Adding';
import CatalogContainer from './components/Catalog/CatalogContainer';
import EditingContainer from './components/Editing/EditingContainer';
import Login from './components/Login/Login';


const App = () => {
  return (
    <div className="app-wrapper">
      
      <Header />
      
      <div className="app-wrapper_content">
        <Route path='/adding' render={() => <Adding />} />
        <Route path='/catalog' render={() => <CatalogContainer />} />
        <Route path='/editing' render={() => <EditingContainer/>} />
        <Route path='/login' render={() => <Login/>} />
        <Route exact path="/" render={() => <Redirect to="/catalog" />}
      />
      </div>

    </div>
  )
};

export default App;
