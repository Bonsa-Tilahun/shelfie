import React from 'react'
import {Link} from 'react-router-dom'
import './header.styles.css'

const Header = ()=>{
    return(
        <div className='header-container'>
            <div className="logo-container">
                <div className='logo'></div>
                <div className='logo-name'>
                    <h1>SHELFIE</h1>
                </div>
            </div>
            <Link to='/'>
                <p className='navigation'>Dashboard</p>
            </Link>
            <Link to='/add'>
                <p className='navigation'>Add Inventory</p>
            </Link>
        </div>
    )
}
export default Header