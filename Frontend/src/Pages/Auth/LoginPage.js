import React, { useState,useEffect } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import { Link } from 'react-router-dom';
import Cover_img from '../../Images/login2.jpg';
import PhoneLogin from '../../components/PhoneLogin';
import {AiFillCloseCircle} from 'react-icons/ai';
import {FaMobileAlt} from 'react-icons/fa'; 
import {login,logout} from '../../features/User'; 
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer';
import axios from 'axios';
import  {setToken,getToken} from '../../Security/TokenManager'

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [phone , usePhone] = useState(false);
  const [loggedIn , setIsLoggedIn] = useState(false); 
  const navigate = useNavigate();

  function checkLogin(){
    navigate('/');
    console.log('Login Failed')
  }
  
  
  const HandleLogin = () => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
   
    if (!email.match(emailPattern)) {
     
      setErrorMessage('Please enter a valid email address.');
      


    } else {

      axios.post('http://localhost:8080/api/v1/auth/login', {
        email: email,
        password: password
    }).then((response) => {
        const token = response.data.token;
        console.log(token);
        setToken(token);

        const token1 = getToken('token');
        localStorage.setItem('email', email);
        localStorage.setItem('uid', response.data.uid);

        console.log(localStorage.getItem('uid'));
        setIsLoggedIn(true);

        // Navigate to home page after 2 seconds
        setTimeout(() => {
          if(response.data.role === "USER")
          navigate('/admin_dashboard');
        else
        navigate("/admin_dashboard")
        }, 2000);

    }).catch((error) => {
        console.log(error);
    });
 
    }
  };


  
 const HandlePhoneLogin = (e) => {
  usePhone(e);
 }
 
 
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
 
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    
    <div>
      {loggedIn&&<div className='animate-[fadeInDown_1s]   '>
      <div class="bg-yellow-500 px-4 py-1 text-white zoomIn">
  <p class="text-center text-sm font-medium">
    Login Successful
    
  </p>
</div>
</div>}
     

    <div className="w-full h-screen flex items-start ">
     
       {isMobile ? (
       <div></div>
      ) : (
        <div className="relative w-full h-full flex flex-col ">
        <img src={Cover_img} className="w-full h-full object-cover" alt="Cover" />
     
      </div>
      )}
     

      <div className="w-full h-full bg-[#e7e6e6] flex flex-col p-5 justify-between items-center">
        <h1 className="text-[30px] text-[#0606060] font-serif">ESSENTIA</h1>

        <div className="w-fil flex flex-col w-[55%]">
          <div className="w-flex flex flex-col mb-5">
            <h3 className="text-3xl font-semibold mb-2">Login</h3>
            <p className="text-base mb-2">Welcome Back to Essentia - Your Home, Your Way</p>
          </div>

          <div className="w-full flex flex-col">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
            />
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
            />
          </div>

          <div className="w-full flex intems-center justify-between">
            <div className="w-full flex">
              <input type="checkbox" className="w-4 h-4 mr-2" />
              <p className="text-sm">Remember Me</p>
            </div>

            <p className="text-sm font-medium whitespace-nowrap cursor-pointer underline-offset-2">Forgot password?</p>
          </div>

          <div className="w-full flex flex-col my-4">
            <button
              onClick={HandleLogin}
              className="w-full bg-[#060606] my-2 text-white font-semibold border-2 rounded-md p-4 text-center flex items-center justify-center hover:text-black hover:bg-white border-black"
            >
              Login
            </button>
             
             
         
          </div>

          <div className="w-full flex items-center justify-center relative py-2">
            <div className="w-full h-[1px] bg-black"></div>
            <p className="text-lg absolute  text-black/80 bg-[#E0E0E0]"></p>
          </div>
          <div className='flex flex-col items-center justify-center mt-[20px] '>
            <GoogleOAuthProvider  clientId="664769984430-sao2ahhk31m130m7r2ohlltrcjqnipof.apps.googleusercontent.com">
              <GoogleLogin 
               
                onSuccess={credentialResponse => {
                  var decoded = jwt_decode(credentialResponse.credential);
                  console.log(decoded.name);
                  dispatch(login({name:decoded.name}));
                  navigate('/');
                }}
                onError={() => {
                  console.log('Login Failed');
                  
                }}
             />
            </GoogleOAuthProvider>
            
          <button onClick={()=>HandlePhoneLogin(true)} className=" bg-white   border-white my-3 text-[#060606] font-semibold rounded-sm  text-center flex items-center justify-around h-[38px] w-[229px] overflow-hidden  hover:bg-[#060606]   hover:text-white">
           Login Using Phone
            <FaMobileAlt/>
          </button>
              {
                phone && (
                  <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-filter backdrop-blur-md">
                    <PhoneLogin />
                    <AiFillCloseCircle  onClick={() => HandlePhoneLogin(false)}  className="absolute  text-white  bg-transparent rounded-full  cursor-pointer   top-2" size={70} />
                </div>
                )
              }
              </div>
        </div>

   


        <div className="justify-center items-center">
          <Link to="/register">
            <p className="text-sm font-normal text-[#060606] pb-10">Don't have an account? <span className="font-semibold underline ring-offset-2 cursor-pointer">Sign up for free</span></p></Link>
        </div>
      </div>
    </div>
      <Footer/>
      </div>
  );
}

export default LoginPage;