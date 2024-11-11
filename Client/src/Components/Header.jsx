import React from 'react'
import Button from './Button.jsx'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Logo from './Logo.jsx';

function Header() {
    const location=useLocation();
    const navigate=useNavigate();
  return (
    <div>
        <div className='bg-white shadow flex items-center justify-between border dark:border-gray-500 dark:bg-gray-900 py-2 md:px-10 px-7'>
            <Logo/>
            {location.pathname==='/'?
            <Link to={'/signup'}><Button>
              SIGN UP
            </Button></Link>:
            <Button onClick={()=>navigate(-1)}>Back</Button>}
        </div>
      </div>
  )
}

export default Header