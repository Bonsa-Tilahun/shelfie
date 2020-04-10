import React from 'react'
import Product from '../Product/Product.component'
import axios from 'axios'


const Dashboard = (props) =>{
    console.log("dashboard props: ", props)
    const deleteProduct=(id)=>{
        axios.delete(`/api/product/${id}`).then(()=>props.refreshInventory()).catch(err =>alert(err))
    }
    const inventory = props.inventory.map(product => <Product 
                                                        key={product.id} 
                                                        product={product}
                                                        deleteProduct={deleteProduct}
                                                        setCurrentProduct={props.setCurrentProduct}
                                                    />
                                        )
    return(
        <div className='dashboard-container'>
            {inventory}
        </div>
    )
}

export default Dashboard