import React, { Component } from 'react';
import axios from 'axios'
import './App.css';
import HeaderComponent from './components/Header/Header.component';
import Form from './components/Forms/Form.component';
import Dashboard from './components/Dashboard/Dashboard.component';

class App extends Component {
  constructor(){
    super()
    this.state={
      inventory:[],
      currentProduct:{id:'',name:'',price:'',imgurl:''}
    }
  }

  componentDidMount =()=>{
    axios.get('/api/inventory').then(res => this.setState({inventory:res.data})).catch(err => alert(err.errMessage))
  }
  setCurrentProduct = (prdct) =>{
    this.setState({
      currentProduct:prdct
    })
  }
  render(){
    return (
      <div className="App">
        <HeaderComponent/>
        <div className='main-content'>
          <Dashboard 
            refreshInventory={this.componentDidMount} 
            setCurrentProduct={this.setCurrentProduct} 
            inventory={this.state.inventory}
          />
          <Form currentProduct={this.state.currentProduct} refreshInventory={this.componentDidMount}/>
        </div>
      </div>
    );
  }
}

export default App;
