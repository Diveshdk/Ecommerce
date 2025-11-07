import React, { useState } from 'react';
import logo from "../assets/png-transparent-retail-computer-icons-e-commerce-sales-mega-offer-miscellaneous-service-logo.png"
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useNavigate, NavLink } from 'react-router-dom';
import { toggel } from '../app/Slices/LoggedSlice';

function SignupPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  
  const [formdata, setFormData]=useState({
    firstName:"", lastName:"", username:"", password:"", confirmPassword:""
  })

  function changeHandler(event){
    const {name, value} = event.target;
    setFormData((prev)=> {
        return {
        ...prev,
        [name] : value
    }})
  }

  function submitHandler(event){
    if(formdata.confirmPassword === formdata.password){
      dispatch(toggel());
      toast.success(`Welcome ${formdata.firstName}`)
      navigate("/")
    }
    else{
      event.preventDefault();
      toast.error("Password did'nt match");
      
    }
      
  }

  return (
    <div className='w-full flex flex-col items-center gap-3'>

        <div className='flex flex-col w-1/3 min-w-[300px] items-center gap-5 mt-10 border rounded-xl shadow-xl py-4 px-2'>
            <div className='flex gap-1 items-center'>
                <img src={logo} className='w-20 h-20 rounded-full object-cover'/>
                <span className='text-red-500 font-bold text-3xl'>Store</span>
            </div>
            <form onSubmit={submitHandler}
            className='flex flex-col gap-3'
            >
              <div className='flex flex-wrap gap-1 w-full'>
                <label className='flex flex-col gap-2'>
                      <h3>First Name :</h3>
                      <input
                          className='border border-black rounded-lg p-1 px-2'
                          type="text"
                          required
                          placeholder='First Name'
                          value={formdata.firstName}
                          onChange={changeHandler}
                          name="firstName"
                      />
                  </label>
                  <label className='flex flex-col gap-2'>
                      <h3>Last Name :</h3>
                      <input
                          className='border border-black rounded-lg  p-1 px-2'
                          type="text"
                          required
                          placeholder='Last Name'
                          value={formdata.lastName}
                          onChange={changeHandler}
                          name="lastName"
                      />
                  </label>
              </div>
              <div>
                <label className='flex flex-col gap-2 w-full'>
                    <h3>User Name :</h3>
                      <input
                          className='border border-black w-full md:w-[198px] rounded-lg p-1 px-2'
                          type="text"
                          required
                          placeholder='username'
                          value={formdata.username}
                          onChange={changeHandler}
                          name="username"
                        />
                  </label>
              </div>

              <div className='flex flex-wrap w-full gap-1'>
                <label className='flex flex-col gap-2'>
                      <h3>Password :</h3>
                      <input
                          className='border border-black rounded-lg p-1 px-2'
                          type="password"
                          required
                          placeholder='password'
                          value={formdata.password}
                          onChange={changeHandler}
                          name="password"
                      />
                  </label>
                  <label className='flex flex-col gap-2'>
                      <h3>Confirm Password :</h3>
                      <input
                          className='border border-black rounded-lg p-1 px-2'
                          type="password"
                          required
                          placeholder='confirm password'
                          value={formdata.confirmPassword}
                          onChange={changeHandler}
                          name="confirmPassword"
                      />
                  </label>
              </div>
                
                <button className='w-full bg-green-500 text-white font-bold text-center rounded-lg py-2 mt-2'
                >Log In</button>
            </form>
        </div>
        
        <div>
            <p>Already have an account? <NavLink to="/login"><span className='text-blue-500 underline'>log in</span></NavLink></p>
        </div>
    </div>
  )
}

export default SignupPage