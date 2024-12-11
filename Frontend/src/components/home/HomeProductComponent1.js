import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getAuthorizationHeaders } from '../../Security/TokenManager';
import { Link } from 'react-router-dom';

export default function HomeComp1() { 
 
  return (
    <div className='py-5'> 
    <div className=''> 
    <h1 className='font-bold text-center text-black text-3xl '>Bring Home Happiness</h1>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:grid-cols-4 lg:gap-4 my-5 mx-4 h-full w-screen bg-[#ececec]">
        
            <Link to="/products?query=table"> 
            <div className="w-full">
              <img
                className=""
                src="https://assets.tatacliq.com/medias/sys_master/images/49444179378206.jpg"
                alt='no image'
              />
            </div> 
            </Link>
              
            <Link to="/products?query=curtain"> 
            <div className="w-full">
              <img
                className=""
                alt='no image'
                src="https://assets.tatacliq.com/medias/sys_master/images/49444179181598.jpg"
              />
            </div>   
            </Link>
           
            <Link to="/products?query=cups"> 
            <div className="w-full">
              <img
                className=""
                alt='no image'
                src="https://assets.tatacliq.com/medias/sys_master/images/49444179116062.jpg"
              />
            </div>   
            </Link>
           
            <Link to="/products?query=Lenin"> 
            <div className="w-full">
              <img
                className=""
                alt='no image'
                src="https://assets.tatacliq.com/medias/sys_master/images/49444179050526.jpg"
              />
            </div>  
            </Link>

            {/* <div className="w-full">
              <img
                className=""
                src="https://assets.tatacliq.com/medias/sys_master/images/49444179312670.jpg"
              />
            </div>   
            <div className="w-full">
              <img
                className=""
                src="https://assets.tatacliq.com/medias/sys_master/images/49444179247134.jpg"
              />
            </div>    */}
          
       
      </div>
    
    </div>
    </div>
  );
}
