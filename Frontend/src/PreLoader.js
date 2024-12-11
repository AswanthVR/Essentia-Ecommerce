// LogoPreloader.js
import React from 'react';
import logo from './Images/logo.png'


const LogoPreloader = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-white z-50">
      {/* Your logo goes here */}
      <img
        src={logo}
        alt="Logo"
        className="max-w-1/4 max-h-1/4 mr-8"
      />
      {/* Preloader animation */}
      <div className="border-4 border-solid border-gray-300 border-t-blue-500 rounded-full w-8 h-8 animate-spin"></div>
    </div>
  );
};

export default LogoPreloader;
