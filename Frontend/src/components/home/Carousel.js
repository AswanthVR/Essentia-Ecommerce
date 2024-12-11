import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import banner1 from '../../Images/banner/banner1.png';
import banner2 from '../../Images/banner/banner2.png';

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <Slider {...settings}>
      <div>
        <img className='w-screen h-[500px] object-fill' src="https://media.royaloakindia.com/media/wysiwyg/landingPage/Component_2.png" alt="Product 1" />
      </div>
      <div>
        <img className='w-screen h-[500px] object-fill' src="https://www.canva.com/design/DAF0XLKTACY/ctPWC18iRHMfaY-fKO6C7w/edit?utm_content=DAF0XLKTACY&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton" alt="Product 1" />
      </div>
      <div>
        <img className='w-screen h-[500px] object-fill' src={banner1} alt="Product 1" />
      </div>
      <div>
        <img className='w-screen h-[500px] object-fill' src={banner2} alt="Product 1" />
      </div>
      {/* <div>
        <img className='w-screen h-[500px] object-fill' src="https://www.ecohoy.com/media/wysiwyg/under-banner/Ecohoy-sabera-awards-responsible-business-2021.jpg" alt="Product 1" />
      </div> */}
    </Slider>
  );
};

export default Carousel;
