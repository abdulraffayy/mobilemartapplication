import { useState } from 'react';
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

interface NavbarProps {
  onLogout: () => void;
}

const Navbar = ({ onLogout }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cart, totalItems } = useCart();

  const navItems = [
    { name: 'Home', icon: <FaHome />, to: '/home' },
    { name: 'iPhone', icon: <FaApple />, to: '/iphone' },
    { name: 'Android', icon: <FaMobile />, to: '/android' },
    { name: 'Laptops', icon: <FaLaptop />, to: '/laptops' },
    { name: 'Accessories', icon: <FaHeadphones />, to: '/accessories' },
  ];

  return (
    <nav className="bg-white text-gray-800 shadow-lg transition-colors duration-200 relative">
      <div className="flex items-center justify-between p-2">
        <div className="flex-shrink-0 text-2xl font-bold ml-4">Mobile Mart</div>

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

        <div className="hidden md:flex items-center space-x-4 mr-4">
          <div className="relative">
            <button
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="relative flex items-center p-2 rounded-md hover:bg-gray-100"
            >
              <FaShoppingCart className="text-xl" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {totalItems}
                </span>
              )}
            </button>

            {isCartOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg z-50 border border-gray-200">
                <div className="p-4">
                  <div className="flex justify-between items-center border-b pb-2">
                    <h3 className="font-semibold">Your Cart ({totalItems})</h3>
                    <button onClick={() => setIsCartOpen(false)}>
                      <FaTimes className="text-gray-500" />
                    </button>
                  </div>

                  {totalItems === 0 ? (
                    <p className="py-4 text-gray-500">Your cart is empty</p>
                  ) : (
                    <div className="max-h-60 overflow-y-auto">
                      {cart.map((item, index) => (
                        <div key={index} className="flex items-center py-3 border-b">
                          <img
                            src={item.url}
                            alt={item.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div className="ml-3">
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-gray-600">
                              ${item.price} × {item.quantity} = ${(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {totalItems > 0 && (
                    <div className="mt-3 pt-3 border-t">
                      <div className="flex justify-between font-bold mb-2">
                        <span>Total:</span>
                        <span>
                          ${cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}
                        </span>
                      </div>
                      <button className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700">
                        Checkout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <button
            onClick={onLogout}
            className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-green-500 transition-colors duration-200"
          >
            <FaUserAlt className="mr-1" />
            Logout
          </button>
        </div>

        <div className="md:hidden flex items-center space-x-4">
          <button
            onClick={() => setIsCartOpen(!isCartOpen)}
            className="relative p-2"
          >
            <FaShoppingCart className="text-xl" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {totalItems}
              </span>
            )}
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-gray-700 hover:text-green-500 focus:outline-none"
          >
            <FaBars className="text-2xl" />
          </button>
        </div>
      </div>

      {/* Mobile menu items */}
      {isOpen && (
        <div className="md:hidden flex flex-col space-y-2 py-4">
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.to}
              className="flex items-center space-x-2 px-4 py-2 hover:text-green-500"
              onClick={() => setIsOpen(false)}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}

          <div className="flex flex-col items-start px-4 py-2 border-t space-y-2">
            <button
              onClick={onLogout}
              className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-green-500 transition-colors duration-200"
            >
              <FaUserAlt className="mr-1" />
              Logout
            </button>
          </div>
        </div>
      )}

      {/* Mobile cart drawer */}
      {isCartOpen && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-end">
          <div className="bg-white w-4/5 h-full overflow-y-auto">
            <div className="p-4">
              <div className="flex justify-between items-center border-b pb-2">
                <h3 className="font-semibold">Your Cart ({totalItems})</h3>
                <button onClick={() => setIsCartOpen(false)}>
                  <FaTimes className="text-gray-500" />
                </button>
              </div>

              {totalItems === 0 ? (
                <p className="py-4 text-gray-500">Your cart is empty</p>
              ) : (
                <div className="py-4">
                  {cart.map((item, index) => (
                    <div key={index} className="flex items-center py-3 border-b">
                      <img
                        src={item.url}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="ml-3">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-600">
                          ${item.price} × {item.quantity} = ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {totalItems > 0 && (
                <div className="mt-3 pt-3 border-t">
                  <div className="flex justify-between font-bold mb-2">
                    <span>Total:</span>
                    <span>
                      ${cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}
                    </span>
                  </div>
                  <button className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700">
                    Checkout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;