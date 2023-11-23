import React from 'react'
import { Link } from 'react-router-dom'


const NotFound = () => {
    return (
        <div className='not-found'>
            <p>404 - The page you are looking for does not exist!</p>
            <Link className='link' to={'/'}>Go to Home Page</Link>
        </div>
    )
}

export default NotFound