import React from 'react'
import { NavLink } from 'react-router-dom'
import { ROUTES } from '../routes/paths'

const NavBar = () => {

    /**
     * NavLink se utiliza para movernos entre rutas
     * NavLink añade "active" a className cuando la ruta es la actual (v7 de router dom)
     * isActive --> es una prop de react router dom que me dice si la ruta esta activa 
     */

    return (
        <nav className='bg-gradient-to-tr from-red-500 to-pink-500 shadow-lg p-4'>
            <div className='container mx-auto flex justify-between items-center p-4'>
                <div className='flex items-center space-x-4'>
                    <NavLink to={ROUTES.HOME} className={(isActive)=>`text-white hover:text-red-600 ${isActive ? "font-bold":""}`}>App Home Page</NavLink>
                    <NavLink to={ROUTES.SEARCH} className='text-white text-2xl font-bold'>App Search Page</NavLink>
                    <NavLink to={ROUTES.FAVORITES} className='text-white text-2xl font-bold'>App Favorites Page</NavLink>
                </div>

            </div>
        </nav>
    )
}

export default NavBar