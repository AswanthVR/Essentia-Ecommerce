
import React from 'react'
import Navbar12 from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer'
import success from '../../Images/icons/success.gif'
import { getOrders } from '../../API/Server'
import { useState } from 'react'
import { useEffect } from 'react'
import rightarrow from '../../Images/icons/rightarror.gif'
import { Link } from 'react-router-dom'



function UserOrders() {

    const [orders , setOrders] = useState([])
    const [more , setmore] = useState(false)
   
    useEffect(() => {
        const fetchOrders = async () => {
          try {
            const uid = localStorage.getItem('uid');
            console.log(uid);
            const ordersData = await getOrders(uid);
      
            if (ordersData.length !== 0) {
              if(ordersData.length>3){
                setmore(true)
              }
              setOrders(ordersData);
            }
      
            console.log(ordersData);
          } catch (error) {
            console.log(error);
          }
        };
      
        fetchOrders();
      }, []);
      

      const formattedDate = (orderPlacedDate) => {
        const date = new Date(orderPlacedDate);
        return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
      };
  return (
    <div className='bg-gray-200 max-h-full min-h-screen pb-10'>
    <Navbar12/>
    <div className='md:mx-20 mx-4 mt-4' >
            <div id='head'>
                <h1 className='md:font-bold md:text-3xl text-xl'>My Orders</h1>
                <div className='text-yellow-500 bg-yellow-500 h-1 w-32'></div>
                <p className='font-light text-gray-600 md:text-base text-xs'>Check the status of recent orders, manage returns, and discover similar products.</p>
            </div>
      
   {orders.length>0 ? (
   <div className=''>

{[...orders].reverse().map((order) => (
    <div className='mb-5'>
        <div className='flex w-full bg-white rounded-tr-md rounded-tl-md p-3 border-b-[1.5px] border-gray-400' id='main'>
            <div id='header'  className='flex flex-row justify-between w-full'>
                <div className='flex w-1/2 justify-evenly'>
                    <div className='flex flex-col'>
                        <span>Order number</span>
                        <span className='text-gray-500 font-light'>#{order.oid}</span>
                    </div>
                    <div className='flex flex-col'>
                        <span>Order Placed</span>
                        <span className='text-gray-500 font-light'>{formattedDate(order.orderDate)}</span>
                    </div>
                    <div className='flex flex-col'>
                        <span>Total Amount</span>
                        <span className='text-gray-500 font-light'>₹ {order.orderTotal}</span>
                    </div>
                </div>
                <div className='sm:flex flex-row w-1/2 justify-end space-x-4 hidden'>
                    
                    <div><button className='py-2 px-3 inline-flex items-center gap-x-2 text-sm  rounded-lg border border-yellow-500 text-yellow-500 hover:border-yellow-400 hover:text-yellow-400 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
                    >View Details</button></div>
                    <div><button className='py-2 px-3 inline-flex items-center gap-x-2 text-sm  rounded-lg border border-red-500 text-red-500 hover:border-red-400 hover:text-red-400 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
                    >Cancel Order</button></div>
                </div>

            </div>

        </div>

        <div className='flex flex-col w-full bg-white rounded-bl-md rounded-br-md p-3' id='main'>
           
            <div id='header' className='flex flex-row  justify-evenly w-full h-28'>
                <div className='flex md:space-x-12 mx-10'>
                <img src={order.products[0].imageURL[0]} className='h-2/3'/>
                <div className='w-full'>
                <h3  className='text-yellow-400 font-normal text-sm'>{order.products[0].brand}</h3>
                    <h6>{order.products[0].productName}</h6>
                    <p className='text-sm text-gray-400 font-light max-w-[400px] w-auto h-10  text-ellipsis overflow-hidden ...'>
                       {order.products[0].productDescription}
                        </p>
                </div>
                </div>

                <div>
                    <h1>₹{order.products[0].productPrice}</h1>
                </div>
             
            </div>

            <div className='mx-10 flex text-sm justify-between' >
                {order.orderStatus == 'DELIVERED'  && <div className='flex'>
                <img src={success} className='h-5 w-5'/>
                <h1>Delivered on July 12, 2021</h1>
                </div>}
                {order.orderStatus == 'SHIPPED'  && <div className='flex'>
                <img src={success} className='h-5 w-5'/>
                <h1>Shipped on July 12, 2021</h1>
                </div>}
                {order.orderStatus == 'OUT-FOR-DELIVERY'  && <div className='flex'>
                <img src={success} className='h-5 w-5'/>
                <h1>Out For Delivary on July 12, 2021</h1>
                </div>}
                {order.orderStatus == 'PLACED'||'placed'  && <div className='flex'>
                <img src={success} className='h-5 w-5'/>
                <h1>Placed on July 12, 2021</h1>
                </div>}
                <div className='flex'>
                {more && order.products.length-1 !=0 &&
                <>
                <h1>+{order.products.length-1} products</h1>
                <img src={rightarrow} className='h-5 w-4 ml-2'/>
                </>
                }
                </div>
            </div>

        </div>
    </div>
    ))}
   
    </div>
   ):(
<div className='flex items-center justify-center h-auto mt-15'>
            <div className='text-center'>
                <img src='https://images.bewakoof.com/sizeguide/no-orders.png' className='h-52 w-40 mx-auto'/>
              <p className='text-2xl font-semibold mb-4'>Sadly, you haven't placed any orders till now.</p>
              <p className='text-gray-500'>Start shopping to see your order history.</p>

              <Link to={"/product/All-products"}  class="mt-10 relative inline-flex items-center px-12 py-3 overflow-hidden text-lg font-medium text-yellow-600 border-2 border-yellow-600 rounded-full hover:text-white group hover:bg-gray-50">
<span class="absolute left-0 block w-full h-0 transition-all bg-yellow-600 opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
<span class="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
</span>
<span class="relative">Continue Shopping</span>
</Link>
            </div>
          </div>
   )}
    </div>
    {/* <Footer/> */}
    </div>
  )
}

export default UserOrders