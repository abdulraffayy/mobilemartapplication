// import React from 'react';
// import { useCart } from '../cartContext/CartContext';
// import { Button } from '../components/ui/button';
// import { Badge } from '../components/ui/badge';

// interface CartProps {
//   onClose: () => void;
// }

// const Cart: React.FC<CartProps> = ({ onClose }) => {
//   const { cart, removeFromCart, updateQuantity, clearCart, totalItems } = useCart();

//   const totalPrice = cart.reduce(
//     (sum, item) => sum + (item.price * item.quantity),
//     0
//   );

//   return (
//     <div 
//       className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
//       onClick={onClose}
//     >
//       <div 
//         className="bg-white rounded-lg p-6 w-full max-w-md max-h-[80vh] overflow-y-auto"
//         onClick={e => e.stopPropagation()}
//       >
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-2xl font-bold">Your Cart ({totalItems})</h2>
//           <button 
//             onClick={onClose} 
//             className="text-gray-500 hover:text-gray-700 text-2xl"
//           >
//             ×
//           </button>
//         </div>
        
//         {cart.length === 0 ? (
//           <p className="text-gray-500 text-center py-8">Your cart is empty</p>
//         ) : (
//           <>
//             <div className="space-y-4">
//               {cart.map(item => (
//                 <div key={item._id} className="border-b pb-4">
//                   <div className="flex justify-between">
//                     <h3 className="font-medium">{item.name}</h3>
//                     <button 
//                       onClick={() => removeFromCart(item._id)}
//                       className="text-red-500 hover:text-red-700"
//                     >
//                       ×
//                     </button>
//                   </div>
//                   <div className="flex items-center justify-between mt-2">
//                     <div className="flex items-center gap-2">
//                       <Button 
//                         size="sm" 
//                         variant="outline"
//                         onClick={() => updateQuantity(item._id, item.quantity - 1)}
//                         className="w-8 h-8 p-0"
//                       >
//                         -
//                       </Button>
//                       <span className="w-8 text-center">{item.quantity}</span>
//                       <Button 
//                         size="sm" 
//                         variant="outline"
//                         onClick={() => updateQuantity(item._id, item.quantity + 1)}
//                         className="w-8 h-8 p-0"
//                       >
//                         +
//                       </Button>
//                     </div>
//                     <span className="font-medium">
//                       ${(item.price * item.quantity).toFixed(2)}
//                     </span>
//                   </div>
//                   <div className="flex gap-2 mt-2">
//                     <Badge variant="outline">{item.color}</Badge>
//                     <Badge variant="outline">{item.storage}</Badge>
//                   </div>
//                 </div>
//               ))}
//             </div>
            
//             <div className="mt-6 border-t pt-4">
//               <div className="flex justify-between font-bold text-lg mb-4">
//                 <span>Total:</span>
//                 <span>${totalPrice.toFixed(2)}</span>
//               </div>
              
//               <div className="flex gap-2">
//                 <Button 
//                   variant="outline" 
//                   onClick={clearCart}
//                   className="flex-1"
//                 >
//                   Clear Cart
//                 </Button>
//                 <Button className="flex-1 bg-green-600 hover:bg-green-700">
//                   Checkout
//                 </Button>
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Cart;





import React, { useState, useEffect } from 'react';
import { useCart } from '../cartContext/CartContext';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { X, Trash2, ShoppingCart } from 'lucide-react';
import axios from 'axios';

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
        const products = await Promise.all(
          cart.map(async (item) => {
            const response = await axios.get<Product>(`http://localhost:5000/api/products/${item._id}`);
            return {
              ...response.data,
              quantity: item.quantity
            };
          })
        );
        setCartProducts(products);
      } catch (error) {
        console.error("Error fetching cart products:", error);
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
    <div className="fixed inset-0 bg-opacity-50 z-50">
      <div className="absolute inset-0" onClick={onClose}></div>
      
      <div className="absolute right-0 top-0 h-full bg-white shadow-xl w-full max-w-md flex flex-col transform transition-transform duration-300">
        {/* Cart Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <div className="flex items-center gap-3">
            <ShoppingCart className="w-6 h-6" />
            <h2 className="text-2xl font-bold">Your Shopping Cart</h2>
            <span className="bg-gray-800 text-white text-sm rounded-full w-6 h-6 flex items-center justify-center">
              {totalItems}
            </span>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Cart Content */}
        {loading ? (
          <div className="flex-grow flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        ) : cartProducts.length === 0 ? (
          <div className="flex-grow flex flex-col items-center justify-center p-6 text-center">
            <ShoppingCart className="w-16 h-16 text-gray-300 mb-4" />
            <h3 className="text-xl font-medium text-gray-700 mb-2">Your cart is empty</h3>
            <p className="text-gray-500 mb-6">Add some products to get started</p>
            <Button onClick={onClose}>Continue Shopping</Button>
          </div>
        ) : (
          <>
            <div className="flex-grow overflow-y-auto p-6">
              <div className="space-y-6">
                {cartProducts.map((product) => (
                  <div key={product._id} className="flex gap-4 pb-6 border-b last:border-0">
                    {/* Product Image */}
                    <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
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
                          <h3 className="font-medium text-lg">{product.name}</h3>
                          <Badge variant={product.inStock ? "default" : "destructive"} className="mt-1">
                            {product.inStock ? "In Stock" : "Out of Stock"}
                          </Badge>
                        </div>
                        <button
                          onClick={() => removeFromCart(product._id)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Color and Storage */}
                      <div className="flex gap-2 mt-2">
                        <Badge variant="outline">{product.color}</Badge>
                        <Badge variant="outline">{product.storage}</Badge>
                      </div>

                      {/* Description */}
                      {product.description && (
                        <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                          {product.description}
                        </p>
                      )}

                      {/* Quantity and Price */}
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleQuantityChange(product._id, product.quantity - 1)}
                            disabled={product.quantity <= 1}
                            className="w-8 h-8 p-0"
                          >
                            -
                          </Button>
                          <span className="w-8 text-center">{product.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleQuantityChange(product._id, product.quantity + 1)}
                            className="w-8 h-8 p-0"
                          >
                            +
                          </Button>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">${product.price.toFixed(2)} each</p>
                          <p className="font-bold">${(product.price * product.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cart Summary */}
            <div className="border-t p-6 bg-gray-50">
              <div className="space-y-4">
                <div className="flex justify-between text-lg">
                  <span>Subtotal ({totalItems} items):</span>
                  <span className="font-bold">${totalPrice.toFixed(2)}</span>
                </div>
                
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={clearCart}
                    className="flex-1 gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Clear Cart
                  </Button>
                  <Button className="flex-1 bg-green-600 hover:bg-green-700">
                    Proceed to Checkout
                  </Button>
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