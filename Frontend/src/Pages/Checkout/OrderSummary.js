import React from "react";
import { getAuthorizationHeaders, getToken } from '../../Security/TokenManager';
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link, json, useParams } from "react-router-dom"; 
import Footer from "../../components/Footer";
import Navbar12 from "../../components/Navbar/Navbar";
import jsPDF from "jspdf"; 
import 'jspdf-autotable';

import QRCode from 'qrcode';

const Ordersum = () => {
    const [orderDetails, setOrderDetails] = useState([]);

    const {id} = useParams();

    useEffect(() => {
        axios.get(`http://localhost:8080/orders/getById/${id}`,getAuthorizationHeaders())
            .then(response => {
                console.log(response.data)
                setOrderDetails(response.data)
                console.log(orderDetails)
            })
            .catch(error => {
                console.error('Error fetching details:', error);
            });
    }, []); 

    const formatDateTime = (dateTimeString) => {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
        return new Date(dateTimeString).toLocaleDateString('en-US', options);
    }


    const downloadInvoice = async () => {
        const pdf = new jsPDF();
      
        // Set font size and style
        pdf.setFontSize(12);
        pdf.setFont('lexend', 'normal');
      
        // Add content to the PDF with neat alignment
      
        // Add a table for order details
        const orderDetailsData = [
          ['Order ID', orderDetails.oid],
          ['Order Date', formatDateTime(orderDetails.orderDate)],
        ];
      
        pdf.autoTable({
          body: orderDetailsData,
          theme: 'plain',
        });
      
        // Explicitly set startY for the second autoTable to prevent overlap
        const productTableStartY = pdf.autoTable.previous.finalY + 20;
      
        // Add a table for product details
        const productColumns = ['Product', 'Description', 'Price'];
        const productData = orderDetails.products.map((product) => [
          product.productName,
          product.productDescription,
          `₹ ${product.productPrice}`,
        ]);
      
        pdf.autoTable({
          head: [productColumns],
          body: productData,
          theme: 'plain',
          startY: productTableStartY,
        });
      
        // Add order summary
        const summaryY = pdf.autoTable.previous.finalY + 10;
        pdf.text(`Subtotal: ₹ ${orderDetails.orderTotal}`, 20, summaryY);
        pdf.text(`Shipping: ₹ 0`, 20, summaryY + 20);
      
        // Add total
        const totalY = pdf.autoTable.previous.finalY + 20;
        pdf.text(`Total: ₹ ${orderDetails.orderTotal}`, 20, totalY);
      
        // Generate QR code and add it to the PDF
        const qrCodeY = 10; // Adjust Y-coordinate for the QR code
        const qrCodeX = pdf.internal.pageSize.width - 70; // Adjust X-coordinate for the QR code
      
        const qrCodeContent = `"orderId":${orderDetails.oid} "Total":${orderDetails.orderTotal} "Order Date" : ${orderDetails.orderDate} "order Address" :${orderDetails.orderAddress}`;
        const qrCodeDataURL = await QRCode.toDataURL(JSON.stringify(qrCodeContent), { width: 30 });
      
        // Add the QR code as an image to the PDF
        pdf.addImage(qrCodeDataURL, 'PNG', qrCodeX, qrCodeY, 40, 40);
      
        pdf.save('invoice.pdf');
      };

    return (
        <>
        <Navbar12/>
       <div className="right-0 justify-end items-end flex"> <button
            onClick={downloadInvoice}
            className="hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2
               focus:ring-gray-800 py-2 w-40 bg-yellow-500 text-base font-medium leading-4 text-white"
          >
            Download Invoice
          </button>
          </div>
            {orderDetails && (
        <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
            <div className="flex justify-start item-start space-y-2 flex-col ">
                <h1 className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9  text-gray-800">Order #{orderDetails.oid}</h1>
                <p className="text-base font-medium leading-6 text-gray-600">{formatDateTime(orderDetails.orderDate)}</p>
            </div>
            <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch  w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">

                <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                   
                   
                        <p className="text-lg md:text-xl font-semibold leading-6 xl:leading-5 text-gray-800">Products</p>
                        {orderDetails && orderDetails.products && (
                    <div className="overflow-scroll flex flex-col justify-start items-start bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full h-[300px]">

                      {orderDetails.products.map((product, index) => (   
                        <div className=" mt-4 md:mt-6 flex  flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full ">
                            <div className="pb-4 md:pb-8 w-full md:w-40">
                                <img className="w-full hidden md:block" src={product.imageURL[0]} alt="dress" /> 
                            </div>
                            <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full  pb-8 space-y-4 md:space-y-0 ">
                                <div className="w-full flex flex-col justify-start items-start space-y-8">
                                    <h3 className="text-xl xl:text-2xl font-semibold leading-6 text-gray-800">{product.productName}</h3>
                                    <div className="flex justify-start items-start flex-col space-y-2">
                                        <p className="text-sm leading-none text-gray-400">
                                       {product.productDescription}
                                        </p>
                                         
                                    </div>
                                </div>
                                <div className="flex justify-between space-x- items-start w-full">
                                 
                                    <p className="text-base xl:text-lg leading-6 text-gray-800">01</p>
                                    <p className="text-base xl:text-lg font-semibold leading-6 text-gray-800">₹ {product.productPrice}</p>
                                </div>
                            </div>
                        </div>
                      ))}
                    </div>
                    )}



                    <div className="flex justify-center md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                        <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6   ">
                            <h3 className="text-xl font-semibold leading-5 text-gray-800">Summary</h3>
                            <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                                <div className="flex justify-between  w-full">
                                    <p className="text-base leading-4 text-gray-800">Subtotal</p>
                                    <p className="text-base leading-4 text-gray-600">₹ {orderDetails.orderTotal}</p>
                                </div>
                                <div className="flex justify-between items-center w-full">
                                    <p className="text-base leading-4 text-gray-800">
                                        Discount 
                                    </p>
                                    <p className="text-base leading-4 text-gray-600">-</p>
                                </div>
                                <div className="flex justify-between items-center w-full">
                                    <p className="text-base leading-4 text-gray-800">Shipping</p>
                                    <p className="text-base leading-4 text-gray-600">₹ 0</p>
                                </div>
                            </div>
                            <div className="flex justify-between items-center w-full">
                                <p className="text-base font-semibold leading-4 text-gray-800">Total</p>
                                <p className="text-base font-semibold leading-4 text-gray-600">₹ {orderDetails.orderTotal}</p>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6   ">
                            <h3 className="text-xl font-semibold leading-5 text-gray-800">Shipping</h3>
                            <div className="flex justify-between items-start w-full">
                                <div className="flex justify-center items-center space-x-4">
                                    <div class="w-8 h-8">
                                        <img class="w-full h-full" alt="logo" src="https://i.ibb.co/L8KSdNQ/image-3.png" />
                                    </div>
                                    <div className="flex flex-col justify-start items-center">
                                        <p className="text-lg leading-6 font-semibold text-gray-800">
                                            DPD Delivery
                                            <br />
                                            <span className="font-normal">Delivery within 5 - 7 Business Days</span>
                                        </p>
                                    </div>
                                </div> 
                            </div>
                            <div className="w-full flex justify-center items-center">
                               <button  className="hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2
                                 focus:ring-gray-800 py-5 w-96 md:w-full bg-yellow-500 text-base font-medium leading-4 text-white"><Link to={"/your-orders"}> Track Order </Link> </button>
                                 
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-50 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col ">
                    <h3 className="text-xl font-semibold leading-5 text-gray-800">Customer</h3>
                    <div className="flex  flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0 ">
                        <div className="flex flex-col justify-start items-start flex-shrink-0">
                            <div className="flex justify-center  w-full  md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                            <img width="26" height="16" src="https://img.icons8.com/office/16/gender-neutral-user.png" alt="gender-neutral-user"/>
                                <div className=" flex justify-start items-start flex-col space-y-2">
                                    <p className="text-base font-semibold leading-4 text-left text-gray-800">{orderDetails.name}</p>
                                    {/* <p className="text-sm leading-5 text-gray-600">10 Previous Orders</p> */}
                                </div>
                            </div>

                            <div className="flex justify-center  md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z" stroke="#1F2937" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M3 7L12 13L21 7" stroke="#1F2937" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <p className="cursor-pointer text-sm leading-5 text-gray-800">{orderDetails.email}</p>
                            </div>
                        </div>
                        <div className="flex justify-between xl:h-full  items-stretch w-full flex-col mt-6 md:mt-0">
                            <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row  items-center md:items-start ">
                                <div className="flex justify-center md:justify-start  items-center md:items-start flex-col space-y-4 xl:mt-8">
                                    <p className="text-base font-semibold leading-4 text-center md:text-left text-gray-800">Shipping Address</p>
                                    <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">{orderDetails.orderAddress}</p>
                                </div>
                                
                            </div>
                            <div className="flex w-full justify-center items-center md:justify-start md:items-start">
                                <button className="mt-6 md:mt-0 py-5 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-gray-800 font-medium w-96 2xl:w-full text-base leading-4 text-gray-800">Edit Details</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
                )}
        
       <Footer/>
        </>
    );
};

export default Ordersum;
