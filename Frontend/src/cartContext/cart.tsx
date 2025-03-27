import React from 'react';
import { useCart } from '../cartContext/CartContext';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';

interface CartProps {
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ onClose }) => {
  const { cart, removeFromCart, updateQuantity, clearCart, totalItems } = useCart();

  const totalPrice = cart.reduce(
    (sum, item) => sum + (item.price * item.quantity),
    0
  );

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg p-6 w-full max-w-md max-h-[80vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Your Cart ({totalItems})</h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>
        
        {cart.length === 0 ? (
          <p className="text-gray-500 text-center py-8">Your cart is empty</p>
        ) : (
          <>
            <div className="space-y-4">
              {cart.map(item => (
                <div key={item._id} className="border-b pb-4">
                  <div className="flex justify-between">
                    <h3 className="font-medium">{item.name}</h3>
                    <button 
                      onClick={() => removeFromCart(item._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                        className="w-8 h-8 p-0"
                      >
                        -
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                        className="w-8 h-8 p-0"
                      >
                        +
                      </Button>
                    </div>
                    <span className="font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="outline">{item.color}</Badge>
                    <Badge variant="outline">{item.storage}</Badge>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 border-t pt-4">
              <div className="flex justify-between font-bold text-lg mb-4">
                <span>Total:</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={clearCart}
                  className="flex-1"
                >
                  Clear Cart
                </Button>
                <Button className="flex-1 bg-green-600 hover:bg-green-700">
                  Checkout
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;