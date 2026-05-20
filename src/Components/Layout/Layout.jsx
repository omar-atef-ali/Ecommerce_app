
import React from 'react'
import style from "./Layout.module.css"
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import Cart from '../Cart/Cart'


export default function Layout() {
  return <>
    <Navbar />
    <Cart />
    <Outlet></Outlet>
    <Footer/>

  </>
}
