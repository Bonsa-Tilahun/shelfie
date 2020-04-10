import React from 'react'
import { Component } from 'react';
import imgPlaceHolder from '../../assets/img_placeholder.jpeg'
import axios from 'axios'
import {Link} from 'react-router-dom'

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
    componentDidMount=()=>{
        if(this.props.match.params.hasOwnProperty){
            axios.get(`/api/product/${this.props.match.params.id}`).then(res =>{
                console.log("to be updated product: ", res.data)
                const {name, price, imgurl} = res.data[0]
                
                this.setState({
                    name,
                    price,
                    imgurl,
                    editMode:true
                })
            })
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
            axios.put(`/api/product/${this.props.match.params.id}`, newPrdct).then(res => {
                // this.props.refreshInventory()
                console.log('Product added: ', res.data)
            }).catch(err => alert(`ERROR: ${err}`))
        }else{
            axios.post('/api/product', newPrdct).then(res => {
                // this.props.refreshInventory()
                console.log('Product added: ', res.data)
            }).catch(err => alert(`ERROR: ${err}`))
        }
        this.handleOnCancle()
    }

    componentDidUpdate=(prevProps)=>{
        console.log("this prop: ", this.props)
        console.log("prevProp: ", prevProps)
        if(prevProps.currentProduct === null || prevProps.match.params.id !== this.props.match.params.id){
            this.setState({
                name:'',
                price:'',
                imgurl:'',
                editMode: false
            })
        }
    }
    render(){
        console.log(this.props.match.params)
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
                    <Link to='/'>
                        <button onClick={()=>this.handleOnCancle()} className='btn red'>CANCLE</button>
                    </Link>
                    {this.state.editMode ? 
                        <Link to='/'>
                            <button onClick={()=>this.handleSubmitProduct()} className='btn red'>SAVE CHANGES</button>
                        </Link>:
                        <Link to='/'>
                            <button onClick={()=>this.handleSubmitProduct()} className='btn red'>ADD TO INVETORY</button>
                        </Link>
                    }
                </div>

            </div>
        )
    }
}

export default Form