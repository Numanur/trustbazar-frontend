import React from 'react'
import { NavLink } from 'react-router-dom';
import ErrorLogo from "../assets/404.svg";

const Error = () => {
  return (
    <div className='w-full min-h-[85vh] flex flex-col justify-center items-center'>
      <img src={ErrorLogo} alt="error" className='w-[500px] mb-7' />
      <h2>PAGE NOT FOUND</h2>
      <NavLink
        to="/"
        style={{
          fontSize: 18,
          marginTop: "10px",
          textDecoration: "none"
        }}
      >
        Back To Home Page
      </NavLink>
    </div>
  )
}

export default Error;