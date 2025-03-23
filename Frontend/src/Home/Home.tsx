import videoimage from '../assets/home section.mp4';
import { useEffect, useState } from 'react';

const Home = () => {
  const [width, setWidth] = useState('100%');

  useEffect(() => {
    const handleScroll = () => {
      const newWidth = window.scrollY > 0 ? '80%' : '60%';
      setWidth(newWidth);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative" style={{ width: width, height: '100vh' }}>
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
        autoPlay
        loop
        muted
      >
        <source src={videoimage} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Gradient Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/60 via-black/40 to-transparent rounded-lg"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 flex flex-col items-center justify-center h-full">
        <h1 className="text-5xl font-extrabold animate-fadeIn">
          Welcome to <span className="text-blue-400">Mobile Mart</span>
        </h1>
        <p className="text-lg mt-3 opacity-90">
          Your one-stop shop for premium mobile accessories.
        </p>
        <p className="text-lg mt-1 opacity-80">
          Best deals on AirPods, Chargers, and More!
        </p>
        <p className="text-lg mt-1 opacity-80">
          Fast shipping & secure payments guaranteed.
        </p>

        {/* Call to Action Button */}
        <button className="mt-6 px-6 py-3 bg-blue-500 hover:bg-blue-600 transition-all duration-300 text-white font-semibold rounded-full shadow-lg">
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default Home;
