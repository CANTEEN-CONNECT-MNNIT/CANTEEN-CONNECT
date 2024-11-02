import React from 'react'
import Header from '../Components/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../Components/Footer'

function Layout() {
  return (
    <div className='h-full bg-slate-100 dark:bg-slate-900 '>
        <Header/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Layout