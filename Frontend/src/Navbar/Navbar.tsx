import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FaHome,
  FaApple,
  FaMobile,
  FaLaptop,
  FaHeadphones,
  FaShoppingCart,
  FaUserAlt,
  FaBars,
  FaTimes
} from 'react-icons/fa';
import { useCart } from '../cartContext/CartContext';
import Cart from '../cartContext/cart';

interface NavbarProps {
  onLogout: () => void;
}

const Navbar = ({ onLogout }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', icon: <FaHome />, to: '/home' },
    { name: 'iPhone', icon: <FaApple />, to: '/iphone' },
    { name: 'Android', icon: <FaMobile />, to: '/android' },
    { name: 'Laptops', icon: <FaLaptop />, to: '/laptops' },
    { name: 'Accessories', icon: <FaHeadphones />, to: '/accessories' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 bg-white text-gray-800 shadow-lg transition-all duration-300 min-h-[56px] ${isScrolled ? 'p-2' : 'py-2'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0 text-2xl font-bold">
            <Link to="/home" className="flex items-center">
              <span className="text-green-600">Mobile</span>
              <span className="text-gray-800">Mart</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center flex-1 mx-4 ">
            <ul className="flex space-x-1 lg:space-x-2">
              {navItems.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.to}
                    className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-green-600 transition-colors duration-200 text-sm lg:text-base"
                  >
                    <span className="mr-1">{item.icon}</span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center justify-between">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
              aria-label="Cart"
            >
              <FaShoppingCart className="text-xl text-gray-700" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {totalItems}
                </span>
              )}
            </button>

            <button
              onClick={onLogout}
              className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-green-600 transition-colors duration-200 text-sm lg:text-base"
              aria-label="Logout"
            >
              <FaUserAlt className="mr-1" />
              Logout
            </button>
          </div>

          {/* Mobile Actions */}
          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-full hover:bg-gray-100"
              aria-label="Cart"
            >
              <FaShoppingCart className="text-xl text-gray-700" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {totalItems}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-full hover:bg-gray-100 focus:outline-none"
              aria-label="Menu"
            >
              {isOpen ? (
                <FaTimes className="text-2xl text-gray-700" />
              ) : (
                <FaBars className="text-2xl text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white shadow-lg rounded-b-lg">
            <ul className="flex flex-col space-y-1 py-2">
              {navItems.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.to}
                    className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-green-600 transition-colors duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.name}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  onClick={() => {
                    onLogout();
                    setIsOpen(false);
                  }}
                  className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-green-600 transition-colors duration-200"
                >
                  <FaUserAlt className="mr-3" />
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Cart Modal */}
      {isCartOpen && <Cart onClose={() => setIsCartOpen(false)} />}
    </nav>
  );
};

export default Navbar;