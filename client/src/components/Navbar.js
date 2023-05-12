import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
     <Link to="/"><h2>Home</h2></Link>
     <Link to="/footer"><h2>Footer</h2></Link>
    </div>
  )
}

export default Navbar