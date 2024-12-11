import React from 'react'
import { AiOutlineHeart } from 'react-icons/ai' 
import { useState } from 'react'; 
import { fetchWishListCount } from '../../API/Server';

export default function WishListIcon() {

    const [Count, setCount] = useState(0);
 
    fetchWishListCount()
      .then(count => {
        setCount(count);
        console.log(count);
      })
      .catch(error => {
        console.error(error.message);
      });
   
  return (
<div className="text-white flex  cursor-pointer">
    <div className='relative'>
    <svg className="fill-stroke" width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M20.8401 4.60987C20.3294 4.09888 19.7229 3.69352 19.0555 3.41696C18.388 3.14039 17.6726 2.99805 16.9501 2.99805C16.2276 2.99805 15.5122 3.14039 14.8448 3.41696C14.1773 3.69352 13.5709 4.09888 13.0601 4.60987L12.0001 5.66987L10.9401 4.60987C9.90843 3.57818 8.50915 2.99858 7.05012 2.99858C5.59109 2.99858 4.19181 3.57818 3.16012 4.60987C2.12843 5.64156 1.54883 7.04084 1.54883 8.49987C1.54883 9.95891 2.12843 11.3582 3.16012 12.3899L4.22012 13.4499L12.0001 21.2299L19.7801 13.4499L20.8401 12.3899C21.3511 11.8791 21.7565 11.2727 22.033 10.6052C22.3096 9.93777 22.4519 9.22236 22.4519 8.49987C22.4519 7.77738 22.3096 7.06198 22.033 6.39452C21.7565 5.72706 21.3511 5.12063 20.8401 4.60987V4.60987Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>   </div>
        <div className='ml-[-8px] mt-[-5px] z-10'>
        <div className=' bg-yellow-300 text-black rounded-full  px-1.5 py-0.5 hover:animate-pulse  '>
        <p className='text-[12px]'>{Count}</p>
      </div>
      </div>
 
</div>
  )
}
