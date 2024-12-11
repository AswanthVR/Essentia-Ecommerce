import React, { useState } from 'react';
import contactus from '../Images/contactus.jpg'
import {toast, Toaster } from 'react-hot-toast'; 
import Footer from '../components/Footer';
import Navbar12 from '../components/Navbar/Navbar';
import axios from 'axios';
import { getAuthorizationHeaders } from '../Security/TokenManager';

const ContactForm = () => {
  const [name, setName] = useState(localStorage.getItem('username'));
  const [email, setEmail] = useState(localStorage.getItem('email'));
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Assuming your backend API is running at http://localhost:8080
      const response = await axios.post('http://localhost:8080/contacts', {
        email,
        query: message,
      },
      getAuthorizationHeaders());
  
      if (response.status === 201) {
        toast.success('Message sent successfully!');
        setEmail('');
        setName('');
        setMessage('');
      } else {
        toast.error('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('An error occurred. Please try again.');
    }
  };
  

  // function handleQuery(){
  //       axios.post()
  // }

  return (
    <div>
      <Navbar12/>
    <div className="flex justify-center items-center bg-gray-100 h-screen">
        <Toaster
        position="bottom-center"
        reverseOrder={false}
      />
      <div className="flex w-full max-w-screen-xl ">
        <div className="w-1/2 p-8 hover:-translate-x-2 duration-300 hover:scale-105 ease-in-out">
          <img
            src={contactus}
            alt="Contact"
            className="object-cover w-full h-full rounded-lg shadow-lg"
          />
        </div>
        <div className="w-1/2 p-8 bg-white rounded-lg shadow-lg h-[570px] mt-8 hover:-translate-x-1 duration-300 hover:scale-105 ease-in-out">
          <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block font-bold text-gray-700 mb-2">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block font-bold text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block font-bold text-gray-700 mb-2">Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg h-32 resize-none focus:outline-none focus:ring focus:border-blue-300"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
      <Footer/>
    </div>
  );
};

export default ContactForm;
