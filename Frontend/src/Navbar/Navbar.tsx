import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaApple, FaMobile, FaLaptop, FaHeadphones, FaShoppingCart, FaUserAlt, FaBars } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // State to toggle mobile menu
  const [cartCount] = useState(0); // Cart count state

  // Navigation items
  const navItems = [
    { name: 'Home', icon: <FaHome />, to: '/home' },
    { name: 'iPhone', icon: <FaApple />, to: '/iphone' },
    { name: 'Android', icon: <FaMobile />, to: '/android' },
    { name: 'Laptops', icon: <FaLaptop />, to: '/laptops' },
    { name: 'Accessories', icon: <FaHeadphones />, to: '/accessories' },
  ];

  return (
    <nav className="bg-white text-gray-800 shadow-lg transition-colors duration-200">
      {/* Main Navbar */}
      <div className="flex items-center justify-between p-2">
        {/* Logo on the left */}
        <div className="flex-shrink-0 text-2xl font-bold ml-4">Mobile Mart</div>

        {/* Center Navigation (Desktop) */}
        <div className="hidden md:flex items-center justify-center flex-grow">
          <ul className="flex space-x-4">
            {navItems.map((item, index) => (
              <li key={index} className="flex items-center">
                <Link
                  to={item.to}
                  className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-green-500 transition-colors duration-200"
                >
                  {item.icon}
                  <span className="ml-1">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Login/Logout Buttons (Desktop) */}
        <div className="hidden md:flex items-center space-x-2 mr-4">
          {/* Login Button */}
          <button className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-green-500 transition-colors duration-200">
            <FaUserAlt className="mr-1" />
            Login
          </button>
          {/* Logout Button */}
          <button className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-green-500 transition-colors duration-200">
            <FaUserAlt className="mr-1" />
            Logout
          </button>
        </div>

        {/* Hamburger Menu (Mobile) */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)} // Toggle mobile menu
            className="p-2 text-gray-700 hover:text-green-500 focus:outline-none"
          >
            <FaBars className="text-2xl" /> {/* Hamburger Icon */}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col space-y-2 py-4">
          {/* Navigation Links */}
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.to}
              className="flex items-center space-x-2 px-4 py-2 hover:text-green-500"
              onClick={() => setIsOpen(false)} // Close menu on link click
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}

          {/* Cart and Login/Logout Buttons */}
          <div className="flex flex-col items-start px-4 py-2 border-t space-y-2">
            {/* Cart Icon */}
            <div className="relative cursor-pointer">
              <FaShoppingCart className="text-xl" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartCount}
                </span>
              )}
            </div>

            {/* Login/Logout Buttons */}
            <div className="flex space-x-2">
              {/* Login Button */}
              <button className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-green-500 transition-colors duration-200">
                <FaUserAlt className="mr-1" />
                Login
              </button>
              {/* Logout Button */}
              <button className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-green-500 transition-colors duration-200">
                <FaUserAlt className="mr-1" />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;


