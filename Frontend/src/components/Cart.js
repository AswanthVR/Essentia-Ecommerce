import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react'; 
import { getToken } from '../Security/TokenManager';
import { fetchCartCount } from '../API/Server';
 

function Cart() { 
  const [cartCount, setCartCount] = useState(0);


    fetchCartCount()
      .then(count => {
        setCartCount(count);
        console.log(count);
      })
      .catch(error => {
        console.error(error.message);
      });
   

  return (
    <div className="text-white flex items-center justify-between cursor-pointer space-x-[-6px] space-y-[-10px]   ">
      <div className='flex flex-col  '>
        <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path  strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
        </svg>
      </div>
      <div className='bg-yellow-300 text-black rounded-full  px-1.5 py-0.5 hover:animate-pulse  '>
        
        <p className='text-[12px]'>{cartCount}</p>
      </div>
    </div>
  );
}

export default Cart;
