import React, { Component } from 'react';
import axios from 'axios'
import './App.css';
import HeaderComponent from './components/Header/Header.component';
import Form from './components/Forms/Form.component';
import Dashboard from './components/Dashboard/Dashboard.component';
import { Switch, Route } from 'react-router-dom';

function App() {
 
  // setCurrentProduct = (prdct) =>{
  //   this.setState({
  //     currentProduct:prdct
  //   })
  // }
  // render(){
    return (
      <div className="App">
        <HeaderComponent/>
        <Switch>
          <Route exact path='/' component={Dashboard}/>
          <Route exact path='/add' component={Form}/>
          <Route exact path='/edit/:id' component={Form}/>
        </Switch>
      </div>
    );
  // }
}

export default App;
