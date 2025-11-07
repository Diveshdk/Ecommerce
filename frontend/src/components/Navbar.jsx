import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { IoCart } from "react-icons/io5";
import logo from "../assets/png-transparent-retail-computer-icons-e-commerce-sales-mega-offer-miscellaneous-service-logo.png"
import { TiThMenu } from "react-icons/ti";
import { IoCloseSharp } from "react-icons/io5";

function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <div className='w-full flex justify-center bg-[#0F4C75] text-white'>
            <div className='flex md:w-8/12 w-9/12 justify-between py-3'>
                <NavLink to="/">
                    <div className='flex items-center gap-2'>
                        <img src={logo} alt="Store Logo" className='w-8 h-8 rounded-full object-cover'/>
                        <span className='text-red-500 font-bold text-xl'>E-Com Store</span>
                    </div>
                </NavLink>

                <div className={`md:flex md:flex-row md:w-fit md:h-fit h-full w-full flex-col md:static
                 md:z-auto fixed bg-[#0F4C75] md:bg-opacity-100 bg-opacity-50 
                 ${open ? "top-0 left-[50%] right-[50%] z-30" : "-right-10 hidden"} 
                md:gap-5 md:text-lg md:text-white text-red-500 text-2xl font-semibold items-center transition-all duration-1000 ease-in-out`}>

                    <NavLink to="/">
                        <p className='md:m-0 md:mt-0 mt-20 m-3 hover:text-blue-300'>Products</p>
                    </NavLink>

                    <NavLink to="/cart">
                        <div className='md:m-0 m-3 w-fit relative hover:text-blue-300'>
                            <IoCart className='text-2xl'/>
                            <span className='ml-2 md:inline hidden'>Cart</span>
                        </div>
                    </NavLink>
                </div>

                <div className='md:hidden flex items-center static right-10 top-5 z-50'>
                    {open ? 
                        (<button onClick={() => setOpen(!open)} className='fixed'><IoCloseSharp/></button>):
                        (<button onClick={() => setOpen(!open)}><TiThMenu/></button>)}
                </div>
            </div>
        </div>
    )
}

export default Navbar