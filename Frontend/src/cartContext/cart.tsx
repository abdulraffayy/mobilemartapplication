import React, { useState, useEffect } from 'react';
import { useCart } from '../cartContext/CartContext';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { X, Trash2, ShoppingCart } from 'lucide-react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Product {
  _id: string;
  name: string;
  price: number;
  color: string;
  storage: string;
  inStock: boolean;
  url: string;
  description?: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface CartProps {
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ onClose }) => {
  const { cart, removeFromCart, updateQuantity, clearCart, totalItems } = useCart();
  const [cartProducts, setCartProducts] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCartProducts = async () => {
      try {
        setLoading(true);
        // Use the cart items directly since they now contain complete product information
        setCartProducts(cart.map(item => ({
          ...item,
          quantity: item.quantity
        })));
      } catch (error) {
        console.error("Error processing cart products:", error);
        setCartProducts([]);
      } finally {
        setLoading(false);
      }
    };

    if (cart.length > 0) {
      fetchCartProducts();
    } else {
      setCartProducts([]);
      setLoading(false);
    }
  }, [cart]);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(id, newQuantity);
  };

  const totalPrice = cartProducts.reduce(
    (sum, item) => sum + (item.price * item.quantity),
    0
  );

  return (
    <div className="fixed inset-0 bg-opacity-50 z-50 overflow-hidden">
      <div
        className="absolute inset-0"
        onClick={onClose}
        aria-label="Close cart"
      ></div>

      <div className="absolute right-0 top-0 h-full bg-white shadow-xl w-full sm:max-w-sm md:max-w-md flex flex-col">
        {/* Cart Header */}
        <div className="flex justify-between items-center p-4 sm:p-6 border-b">
          <div className="flex items-center gap-2 sm:gap-3">
            <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
            <h2 className="text-xl sm:text-2xl font-bold">Your Cart</h2>
            <span className="bg-gray-800 text-white text-xs sm:text-sm rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center">
              {totalItems}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" />
          </button>
        </div>

        {/* Cart Content */}
        {loading ? (
          <div className="flex-grow flex items-center justify-center">
            <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        ) : cartProducts.length === 0 ? (
          <div className="flex-grow flex flex-col items-center justify-center p-4 sm:p-6 text-center">
            <ShoppingCart className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mb-3 sm:mb-4" />
            <h3 className="text-lg sm:text-xl font-medium text-gray-700 mb-1 sm:mb-2">Your cart is empty</h3>
            <p className="text-sm sm:text-base text-gray-500 mb-4 sm:mb-6">Add some products to get started</p>
            <Button onClick={onClose} className="w-full sm:w-auto">Continue Shopping</Button>
          </div>
        ) : (
          <>
            <div className="flex-grow overflow-y-auto p-4 sm:p-6">
              <div className="space-y-4 sm:space-y-6">
                {cartProducts.map((product) => (
                  <div key={product._id} className="flex gap-3 sm:gap-4 pb-4 sm:pb-6 border-b last:border-0">
                    {/* Product Image */}
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                      <img
                        src={product.url}
                        alt={product.name}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/100';
                        }}
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-grow">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-medium text-base sm:text-lg line-clamp-1">{product.name}</h3>
                          <Badge variant={product.inStock ? "default" : "destructive"} className="mt-1 text-xs sm:text-sm">
                            {product.inStock ? "In Stock" : "Out of Stock"}
                          </Badge>
                        </div>
                        <button
                          onClick={() => removeFromCart(product._id)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                          aria-label="Remove item"
                        >
                          <X className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                      </div>

                      {/* Color and Storage */}
                      <div className="flex gap-1 sm:gap-2 mt-1 sm:mt-2">
                        <Badge variant="outline" className="text-xs sm:text-sm">{product.color}</Badge>
                        <Badge variant="outline" className="text-xs sm:text-sm">{product.storage}</Badge>
                      </div>

                      {/* Description */}
                      {product.description && (
                        <p className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-2 line-clamp-2">
                          {product.description}
                        </p>
                      )}

                      {/* Quantity and Price */}
                      <div className="flex items-center justify-between mt-3 sm:mt-4">
                        <div className="flex items-center gap-1 sm:gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleQuantityChange(product._id, product.quantity - 1)}
                            disabled={product.quantity <= 1}
                            className="w-6 h-6 sm:w-8 sm:h-8 p-0"
                            aria-label="Decrease quantity"
                          >
                            -
                          </Button>
                          <span className="w-6 sm:w-8 text-center text-sm sm:text-base">{product.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleQuantityChange(product._id, product.quantity + 1)}
                            className="w-6 h-6 sm:w-8 sm:h-8 p-0"
                            aria-label="Increase quantity"
                          >
                            +
                          </Button>
                        </div>
                        <div className="text-right">
                          <p className="text-xs sm:text-sm text-gray-500">${product.price.toFixed(2)} each</p>
                          <p className="font-bold text-sm sm:text-base">${(product.price * product.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cart Summary */}
            <div className="border-t p-4 sm:p-6 bg-gray-50">
              <div className="space-y-3 sm:space-y-4">
                <div className="flex justify-between text-base sm:text-lg">
                  <span>Subtotal ({totalItems} items):</span>
                  <span className="font-bold">${totalPrice.toFixed(2)}</span>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <Button
                    variant="outline"
                    onClick={clearCart}
                    className="gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Clear Cart
                  </Button>
                      <Link to="/paymentMethod">
                        <Button className="bg-green-600 hover:bg-green-700">
                          Proceed to Checkout
                        </Button>
                      </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;













