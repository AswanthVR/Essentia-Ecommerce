import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getToken } from '../../Security/TokenManager';
import { useLocation, useParams } from 'react-router-dom';
import Navbar12 from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer';
import ProductCards from './ProductCards';
import NoProducts from './NoProducts';
import { Toaster } from 'react-hot-toast';

function DemoPro() {
  const [type, setType] = useState("all");

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('query') || ''; // Set a default value if 'query' is null
  const { id } = useParams();
  
  const [product, setProduct] = useState([]); 
  const [url, setUrl] = useState('');
  const [productLoaded, setProductLoaded] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  useEffect(() => {
    if (searchQuery !== undefined && searchQuery !== null && searchQuery.length>1) {
      setType("search");
    } else if(id>=0) {
      setType("id");
    } else {
      setType("all");
    }
  
    console.log("Type set to:", type); // Log the type for debugging purposes
  }, [searchQuery, id]);

  useEffect(() => {
    let apiUrl = '';
  
    if (type === "search") {
      apiUrl = `http://localhost:8080/api/product/search?query=${searchQuery}`;
    } else if (type === "id") {
      apiUrl = `http://localhost:8080/byCategory/${id}`;
    } else {
      apiUrl = 'http://localhost:8080/api/product/getProducts';
    }
  
    setUrl(apiUrl);
  }, [type, id, searchQuery]);

  
  useEffect(() => {
    console.log("URL set to:", url);
    console.log("ID set to:", id);
    console.log("Type set to:", type);
  
    if (!url) return;
  
    axios.get(url, {
      headers: { 'Authorization': `Bearer ${getToken('token')}` }
    })
      .then((res) => {
        setProduct(res.data);
        setProductLoaded(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [url, id, type]);
  

useEffect(() => {
  if (id) {
    axios.get(`http://localhost:8080/subcategory/getByCategoryId/${id}`, {
      headers: { 'Authorization': `Bearer ${getToken('token')}` }
    })
    .then((res) => {
      setSubCategories(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
  }
}, [id]);

const handleSubCategoryChange = (subCategoryId) => {
  setSelectedSubCategories(prevSelectedSubCategories => {
    if (prevSelectedSubCategories.includes(subCategoryId.toString())) {
      return prevSelectedSubCategories.filter(id => id !== subCategoryId.toString());
    } else {
      return [...prevSelectedSubCategories, subCategoryId.toString()];
    }
  });
};


const filteredProducts = product.filter(item => {
  const subCategoryFilter =
    !selectedSubCategories.length ||
    (item.subCategory && selectedSubCategories.includes(item.subCategory.id.toString()));

  const priceFilter =
    (!minPrice || item.productPrice >= minPrice) &&
    (!maxPrice || item.productPrice <= maxPrice);

  return subCategoryFilter && priceFilter;
});


const sortedProducts = [...filteredProducts].sort((a, b) => {
  if (sortOption === 'Title, DESC') {
    return b.productName.localeCompare(a.productName);
  }
  if (sortOption === 'Title, ASC') {
    return a.productName.localeCompare(b.productName);
  }
  if (sortOption === 'Price, DESC') {
    return b.productPrice - a.productPrice;
  }
  if (sortOption === 'Price, ASC') {
    return a.productPrice - b.productPrice;
  }
  return 0;
});


 
    
    

    if (productLoaded && product.length === 0) {
      return <div><NoProducts/></div>;
       
    }

  return (
    <div>
        <Navbar12/>
        <Toaster/>
      {!productLoaded ? (
        <div class="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 ">
        <div class="border-t-transparent border-solid animate-spin  rounded-full border-yellow-200 border-8 h-40 w-40"></div>
    </div>
      ):(

    <section className=''>
      <div class="mx-auto   max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <header className='flex justify-between'>
          <div>
          <h2 class="text-xl font-bold text-gray-900 sm:text-3xl">
            Product Collection
          </h2>
          </div>
          <div className='w-[300px]'>
          <div class="mb-3">

</div>
          </div>
  
        </header>
        
    
        <div class="mt-8 block lg:hidden">
          <button
            class="flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 text-gray-900 transition hover:border-gray-600"
          >
            <span class="text-sm font-medium"> Filters & Sorting </span>
    
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-4 w-4 rtl:rotate-180"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>
    
        <div class="mt-4 lg:mt-8 lg:grid lg:grid-cols-4 lg:items-start lg:gap-8">
          <div class="hidden space-y-4 lg:block">
            <div>
              <label for="SortBy" class="block text-xs font-medium text-gray-700">
                Sort By
              </label>
              <select
              id="SortBy"
              class="mt-1 rounded border-gray-300 text-sm py-2 px-2"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              >
              <option value="">Sort By</option>
              <option value="Title, DESC">Title, DESC</option>
              <option value="Title, ASC">Title, ASC</option>
              <option value="Price, DESC">Price, DESC</option>
              <option value="Price, ASC">Price, ASC</option>
              </select>
            </div>
    
            <div>
              <p class="block text-xs font-medium text-gray-700">Filters</p>
    
              <div class="mt-1 space-y-2">
                <details
                  class="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary
                    class="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition"
                  >
                    <span class="text-sm font-medium"> Availability </span>
    
                    <span class="transition group-open:-rotate-180">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="h-4 w-4"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    </span>
                  </summary>
    
                  <div class="border-t border-gray-200 bg-white">
                    <header class="flex items-center justify-between p-4">
                      <span class="text-sm text-gray-700"> 0 Selected </span>
    
                      <button
                     onClick={()=>{setSelectedSubCategories("")}}
                        type="button"
                        class="text-sm text-gray-900 underline underline-offset-4"
                      >
                        Reset
                      </button>
                    </header>
    
                    <ul class="space-y-1 border-t border-gray-200 p-4">
    {subCategories.map(subCategory => (
      <li key={subCategory.id}>
        <label for={`FilterSubCategory${subCategory.id}`} class="inline-flex items-center gap-2">
          <input
            type="checkbox"
            id={`FilterSubCategory${subCategory.id}`}
            class="h-5 w-5 rounded border-gray-300"
            checked={selectedSubCategories.includes(subCategory.id.toString())}
            onChange={() => handleSubCategoryChange(subCategory.id)}
          />
          <span class="text-sm font-medium text-gray-700">
            {subCategory.name}
          </span>
        </label>
      </li>
    ))}
  </ul>
                  </div>
                </details>
    
                <details
                  class="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary
                    class="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition"
                  >
                    <span class="text-sm font-medium"> Price </span>
    
                    <span class="transition group-open:-rotate-180">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="h-4 w-4"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    </span>
                  </summary>
    
                  <div class="border-t border-gray-200 bg-white">
                    <header class="flex items-center justify-between p-4">
                      <span class="text-sm text-gray-700">
                        The highest price is ₹ 100000
                      </span>
    
                      <button
                      onClick={()=>{setMaxPrice(0);setMinPrice(0)}}
                        type="button"
                        class="text-sm text-gray-900 underline underline-offset-4"
                      >
                        Reset
                      </button>
                    </header>
    
                    <div class="border-t border-gray-200 p-4">
                      <div class="flex justify-between gap-4">
                        <label
                          for="FilterPriceFrom"
                          class="flex items-center gap-2"
                        >
                          <span class="text-sm text-gray-600">₹</span>
    
                          <input
  type="number"
  id="FilterPriceFrom"
  placeholder="From"
  class="w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
  value={minPrice}
  onChange={(e) => setMinPrice(Number(e.target.value))}
/>
                        </label>
    
                        <label for="FilterPriceTo" class="flex items-center gap-2">
                          <span class="text-sm text-gray-600">₹</span>
    
                          <input
  type="number"
  id="FilterPriceTo"
  placeholder="To"
  class="w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
  value={maxPrice}
  onChange={(e) => setMaxPrice(Number(e.target.value))}
/>
                        </label>
                      </div>
                    </div>
                  </div>
                </details>
    
            
              </div>
            </div>
          </div>
    
          <div class="lg:col-span-3"> 
            <ul class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
             
            { sortedProducts.map((product) => (
      <ProductCards key={product.productId} product={product} />
    ))}
    
            </ul>
          </div>
        </div>
      </div>
    </section>

      )

      } 
<Footer/>
    </div>
  )
}

export default DemoPro