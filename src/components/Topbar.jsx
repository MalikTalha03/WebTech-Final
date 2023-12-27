import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
        <div className='navbar'>
            <h1>Space Travelers' Hub</h1>
            <div className='links'>
                <Link to='/'>Rockets</Link>
                <Link to='/missions'>Missions</Link>
                <Link to='/profile'>My Profile</Link>
            </div>
        </div>
    </div>
  )
}

export default Navbar