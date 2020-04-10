import React from 'react'

import './product.styles.css'

const Product = (props) =>{
    return(
        <div className='product-container'>
            <img className='product-img' src={props.product.imgurl} alt="Produc"/>
            <div className='product-detail-cotainer'>
                <div className='product-info'>
                    <p className='product-title'>{props.product.name}</p>
                    <p className='product-price'>${props.product.price}</p>
                </div>
                <div className='product-action-container'>
                    <button onClick={()=>props.deleteProduct(props.product.id)} className='btn green'>DELETE</button>
                    <button onClick={()=>props.setCurrentProduct(props.product)} className='btn green'>EDIT</button>
                </div>
            </div>
        </div>
    )
}

export default Product