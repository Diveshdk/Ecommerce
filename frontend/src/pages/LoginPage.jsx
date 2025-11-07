import React, { useState } from 'react';
import logo from "../assets/png-transparent-retail-computer-icons-e-commerce-sales-mega-offer-miscellaneous-service-logo.png"
import { useDispatch } from 'react-redux';
import { toggel } from '../app/Slices/LoggedSlice';
import toast from 'react-hot-toast';
import { NavLink, useNavigate } from 'react-router-dom';

function LoginPage() {

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [formdata, setFormData]=useState({
        username:"", password:""
    })

    function changeHandler(event){
        const {name, value} = event.target;
        setFormData((prev)=> {
            return {
            ...prev,
            [name] : value
        }})
    }

    function submitHandler(){
        dispatch(toggel());
        toast.success(`Welcome ${formdata.username}`)
        navigate("/")
    }
  return (
    <div className='w-full flex flex-col items-center gap-3 mt-5 mb-5'>

        <div className='flex flex-col w-1/3 min-w-[300px] h-[400px] justify-evenly items-center gap-1 border rounded-xl shadow-xl py-4 px-2'>
            <div className='flex gap-1 items-center'>
                <img src={logo} className='w-20 h-20 rounded-full object-cover'/>
                <span className='text-red-500 font-bold text-3xl'>Store</span>
            </div>
            <form onSubmit={submitHandler}
            className='flex flex-col gap-3 w-full items-center px-3'
            >
                <label className='flex flex-col gap-2 w-full'>
                    <h3>UserName :</h3>
                    <input
                        className='border border-black rounded-lg w-11/12 p-1 px-2'
                        type="text"
                        required
                        placeholder='username'
                        value={formdata.username}
                        onChange={changeHandler}
                        name="username"
                    />
                </label>
                <label className='flex flex-col gap-2 w-full'>
                    <h3>Password :</h3>
                    <input
                        className='border border-black rounded-lg w-11/12 p-1 px-2'
                        type="text"
                        required
                        placeholder='password'
                        value={formdata.password}
                        onChange={changeHandler}
                        name="password"
                    />

                </label>
                <button className='w-11/12 bg-green-500 text-white font-bold text-center rounded-lg py-2 mt-2'
                >Log In</button>
            </form>
        </div>
        
        <div>
            <p>Don't have an account.<NavLink to="/signup"><span className='text-blue-500'> Sign up</span></NavLink></p>
        </div>
    </div>
  )
}

export default LoginPage