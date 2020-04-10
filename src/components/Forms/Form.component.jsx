import React from 'react'
import { Component } from 'react';
import imgPlaceHolder from '../../assets/img_placeholder.jpeg'
import axios from 'axios'

import './form.styles.css'

class Form extends Component{
    constructor(){
        super()
        this.state={
            name:'',
            price:0,
            imgurl:'',
            editMode: false
        }
    }

    handleOnChange =(e) =>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleOnCancle = () =>{
        this.setState({
            name:'',
            price:0,
            imgurl:'',
            editMode: false
        })
    }

    handleSubmitProduct=()=>{
        const newPrdct = {
            name:this.state.name,
            price:this.state.price,
            imgurl:this.state.imgurl,
        }
        if(this.state.editMode){
            axios.put(`/api/product/${this.props.currentProduct.id}`, newPrdct).then(res => {
                console.log('Product added: ', res.data)
            }).catch(err => alert(`ERROR: ${err}`))
        }else{
            axios.post('/api/product', newPrdct).then(res => {
                console.log('Product added: ', res.data)
            }).catch(err => alert(`ERROR: ${err}`))
        }
        this.handleOnCancle()
        this.props.refreshInventory()
        // setTimeout(this.props.refreshInventory(),1000)
        
    }

    componentDidUpdate=(prevProps)=>{
        if(prevProps.currentProduct === null || prevProps.currentProduct.id !== this.props.currentProduct.id){
            this.setState({
                name:this.props.currentProduct.name,
                price:this.props.currentProduct.price,
                imgurl:this.props.currentProduct.imgurl,
                editMode: true
            })
        }
    }
    render(){
        return(
            <div className='form-container'>
                <div className='form-image-container'>
                    <img className='form-img' src={this.state.imgurl || imgPlaceHolder} alt="product"/>
                </div>
                <div className="form-input-container">
                    <label htmlFor="imgurl"> Image URL:
                        <input id='imgurl' name='imgurl' type="text" value={this.state.imgurl} onChange={this.handleOnChange}/>
                    </label>
                    <label htmlFor="name"> Product Name:
                        <input id='name' name='name' type="text" value={this.state.name} onChange={this.handleOnChange}/>
                    </label>
                    <label htmlFor="price"> Price:
                        <input id='price' name='price' type="text" value={this.state.price} onChange={this.handleOnChange}/>
                    </label>
                </div>
                <div className="form-action-container">
                    <button onClick={()=>this.handleOnCancle()} className='btn red'>CANCLE</button>
                    {this.state.editMode ? 
                        <button onClick={()=>this.handleSubmitProduct()} className='btn red'>SAVE CHANGES</button>:
                        <button onClick={()=>this.handleSubmitProduct()} className='btn red'>ADD TO INVETORY</button>
                    }
                </div>

            </div>
        )
    }
}

export default Form