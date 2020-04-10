import React from 'react'
import Product from '../Product/Product.component'
import axios from 'axios'
import { useState,useEffect } from 'react'

import './dashboard.styles.css'


const Dashboard = (props) =>{
    let [inventory, setInventory]=useState([])
    useEffect(()=>{
        axios.get('/api/inventory').then(res => setInventory(inventory=res.data)).catch(err => alert(err.errMessage))
    })
    
    const deleteProduct=(id)=>{
        axios.delete(`/api/product/${id}`).then(()=>{}).catch(err =>alert(err))
    }
    const inventoryList = inventory.map(product => <Product 
                                                        key={product.id} 
                                                        product={product}
                                                        deleteProduct={deleteProduct}
                                                        setCurrentProduct={props.setCurrentProduct}
                                                    />
                                        )
    return(
        <div className='dashboard-container'>
            {inventoryList}
        </div>
    )
}

export default Dashboard