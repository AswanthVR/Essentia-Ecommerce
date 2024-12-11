import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getAuthorizationHeaders } from '../../Security/TokenManager';
import { Link } from 'react-router-dom';

export default function CategoryHome() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/category/getAll', getAuthorizationHeaders())
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  return (
    <>
    
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:grid-cols-8 lg:gap-8 my-5 mx-4 ">
        {categories.map(category => (
           <Link to={`/category/${category.id}`}> 
           <div
            key={category.id}
            className="flex flex-col overflow-hidden shadow-sm rounded-xl bg-gradient-to-b from-gray-200 via-neutral-100 to-gray-200"
          >
            <div className="grow items-center justify-between px-5 py-2">
              <img
                className="w-28 h-28 justify-center flex items-center mix-blend-multiply"
                src={category.image}
                alt={`Category ${category.name}`}
              />
            </div>   
            <a
              href="#"
              className="block text-center text-xs  font-light text-black hover:bg-white-100 hover:bg-opacity-75 hover:text-yellow-700 active:bg-white-50 dark:bg-white-900/50 dark:text-yellow-400 dark:hover:bg-white-900/75 dark:hover:text-yellow-300 dark:active:bg-white-900/50"
              >
              {category.name}
            </a> 
            <p className=' text-center  pb-2  text-gray-500 text-sm' >{category.discount}</p>
          </div>
          </Link>
        ))}
      </div>
    </>
  );
}
