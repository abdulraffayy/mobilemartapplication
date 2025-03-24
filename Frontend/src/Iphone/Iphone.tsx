// import { useEffect, useState } from "react";
// import axios from "axios";
// import videoimage from "../assets/iphonevideo.mp4";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "../components/ui/card";
// import { Button } from "@/components/ui/button";

// interface Product {
//   _id: string;
//   name: string;
//   price: number;
//   color: string;
//   storage: string;
//   inStock: boolean;
//   url: string;
//   updatedAt: string;
//   description?: string;
// }

// const Iphone: React.FC = () => {
//   const [scrollY, setScrollY] = useState<number>(0);
//   const [products, setProducts] = useState<Product[]>([]);
//   const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

//   const handleScroll = () => {
//     setScrollY(window.scrollY);
//   };

//   useEffect(() => {
//     window.addEventListener("scroll", handleScroll);
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   useEffect(() => {
//     axios
//       .get<Product[]>("http://localhost:5000/api/products")
//       .then((response) => {
//         setProducts(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching products:", error);
//       });
//   }, []);

//   const handleAddToCart = (product: Product) => {
//     console.log("Added to cart:", product);
//   };

//   const handleDelete = (productId: string) => {
//     setProducts(products.filter((product) => product._id !== productId));
//   };

//   const videoStyle: React.CSSProperties = {
//     width: `${Math.max(50, 100 - Math.min(scrollY / 5, 50))}%`,
//     borderRadius: `${Math.min(scrollY / 10, 20)}px`,
//     transition: "width 0.3s ease, border-radius 0.3s ease",
//   };

//   return (
//     <div className="w-full min-h-screen flex flex-col items-center bg-gray-100">
//       {/* Video Container */}
//       <div className="w-full flex items-center justify-center py-10">
//         <video
//           style={videoStyle}
//           className="object-cover rounded-lg"
//           autoPlay
//           loop
//           muted
//         >
//           <source src={videoimage} type="video/mp4" />
//           Your browser does not support the video tag.
//         </video>
//       </div>

//       {/* Cards Section */}
//       <div className="w-full flex flex-wrap justify-center gap-6 pb-10">
//         {products.length > 0 ? (
//           products.map((product) => (
//             <Card
//               key={product._id}
//               className="w-96 bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-200 cursor-pointer"
//               onClick={() => setSelectedProduct(product)}
//             >
//               <CardHeader className="text-center bg-gray-100 py-4">
//                 <CardTitle className="text-lg font-semibold">{product.name}</CardTitle>
//                 <CardDescription className="text-gray-600">{product.storage} | {product.color}</CardDescription>
//               </CardHeader>
//               <CardContent className="flex flex-col items-center p-4">
//                 <img src={product.url} alt={product.name} className="w-full h-auto object-cover rounded-lg shadow-md" />
//                 <p className="mt-4 text-lg font-bold text-gray-800">Price: ${product.price}</p>
//                 <p className={`mt-2 ${product.inStock ? "text-green-600" : "text-red-600"}`}>{product.inStock ? "In Stock" : "Out of Stock"}</p>
//               </CardContent>
//               <CardFooter className="flex justify-between p-4 bg-gray-100">
//                 <Button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700" onClick={(e) => { e.stopPropagation(); handleAddToCart(product); }}>Add to Cart</Button>
//                 <Button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700" onClick={(e) => { e.stopPropagation(); handleDelete(product._id); }}>Delete</Button>
//               </CardFooter>
//             </Card>
//           ))
//         ) : (
//           <p>Loading products...</p>
//         )}
//       </div>

//       {/* Product Details Modal */}
//       {selectedProduct && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2">
//             <h2 className="text-xl font-bold mb-4">{selectedProduct.name}</h2>
//             <img src={selectedProduct.url} alt={selectedProduct.name} className="w-full h-auto object-cover rounded-lg mb-4" />
//             <p className="text-gray-700">{selectedProduct.description || "No description available."}</p>
//             <p className="text-lg font-bold mt-2">Price: ${selectedProduct.price}</p>
//             <p className={selectedProduct.inStock ? "text-green-600" : "text-red-600"}>{selectedProduct.inStock ? "In Stock" : "Out of Stock"}</p>
//             <div className="flex justify-end mt-4">
//               <Button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700" onClick={() => setSelectedProduct(null)}>Close</Button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Iphone;



















import { useEffect, useState } from "react";
import axios from "axios";
import videoimage from "../assets/iphonevideo.mp4";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";

interface Product {
  _id: string;
  name: string;
  price: number;
  color: string;
  storage: string;
  inStock: boolean;
  url: string;
  updatedAt: string;
  description?: string;
  createdAt?: string;  // ✅ Optional `createdAt`
 
}

const Iphone: React.FC = () => {
  const [scrollY, setScrollY] = useState<number>(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    axios
      .get<Product[]>("http://localhost:5000/api/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const handleAddToCart = (product: Product) => {
    console.log("Added to cart:", product);
  };

  const handleDelete = (productId: string) => {
    setProducts(products.filter((product) => product._id !== productId));
  };

  const videoStyle: React.CSSProperties = {
    width: `${Math.max(50, 100 - Math.min(scrollY / 5, 50))}%`,
    borderRadius: `${Math.min(scrollY / 10, 20)}px`,
    transition: "width 0.3s ease, border-radius 0.3s ease",
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Video Container */}
      <div className="w-full flex items-center justify-center py-10">
        <video
          style={videoStyle}
          className="object-cover rounded-lg shadow-2xl"
          autoPlay
          loop
          muted
        >
          <source src={videoimage} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Cards Section */}
      <div className="w-full px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pb-10 max-w-7xl">
        {products.length > 0 ? (
          products.map((product) => (
            <Card
              key={product._id}
              className={`relative bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                hoveredProduct === product._id ? "ring-2 ring-blue-500" : ""
              }`}
              onClick={() => setSelectedProduct(product)}
              onMouseEnter={() => setHoveredProduct(product._id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              {/* Badge for stock status */}
              <Badge
                variant={product.inStock ? "default" : "destructive"}
                className="absolute top-2 right-2 z-10"
              >
                {product.inStock ? "In Stock" : "Out of Stock"}
              </Badge>

              <CardHeader className="text-center bg-gradient-to-r from-gray-50 to-gray-100 py-4 border-b">
                <CardTitle className="text-xl font-bold text-gray-800">
                  {product.name}
                </CardTitle>
                <CardDescription className="text-gray-600 flex justify-center gap-2">
                  <span className="bg-gray-200 px-2 py-1 rounded-full text-xs">
                    {product.storage}
                  </span>
                  <span className="bg-gray-200 px-2 py-1 rounded-full text-xs">
                    {product.color}
                  </span>
                </CardDescription>
              </CardHeader>
              
              <CardContent className="flex flex-col items-center p-4 relative">
                <div className="w-full aspect-square overflow-hidden rounded-lg bg-gray-100">
                  <img
                    src={product.url}
                    alt={product.name}
                    className="w-full h-full object-contain transition-transform duration-500 hover:scale-105"
                  />
                </div>
                
                {/* Hover overlay */}
                {hoveredProduct === product._id && (
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center transition-opacity duration-300">
                    <Button 
                      variant="secondary"
                      className="bg-white text-gray-800 hover:bg-gray-100"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProduct(product);
                      }}
                    >
                      Quick View
                    </Button>
                  </div>
                )}
              </CardContent>
              
              <CardFooter className="flex flex-col p-4 bg-gray-50 gap-3">
                <div className="w-full flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">
                    ${product.price.toLocaleString()}
                  </span>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(product);
                      }}
                    >
                      Add to Cart
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(product._id);
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="col-span-full flex justify-center py-20">
            <p className="text-gray-500 text-lg">Loading products...</p>
          </div>
        )}
      </div>

{/* Product Details Modal */}
{selectedProduct && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
    <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="flex flex-col">
          <img
            src={selectedProduct.url}
            alt={selectedProduct.name}
            className="w-full h-auto object-contain rounded-lg mb-4 max-h-96"
          />
          <div className="flex flex-wrap gap-2 justify-center">
            <Badge variant="outline" className="text-sm">
              {selectedProduct.storage}
            </Badge>
            <Badge variant="outline" className="text-sm">
              {selectedProduct.color}
            </Badge>
            <Badge
              variant={selectedProduct.inStock ? "default" : "destructive"}
              className="text-sm"
            >
              {selectedProduct.inStock ? "In Stock" : "Out of Stock"}
            </Badge>
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-bold mb-2 text-gray-800">
            {selectedProduct.name}
          </h2>
          <p className="text-3xl font-bold text-gray-900 mb-6">
            ${selectedProduct.price.toLocaleString()}
          </p>
          
          <div className="space-y-4 mb-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Color</h3>
                <p className="text-sm text-gray-900 capitalize">{selectedProduct.color}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Storage</h3>
                <p className="text-sm text-gray-900">{selectedProduct.storage}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Availability</h3>
                <p className={`text-sm ${selectedProduct.inStock ? 'text-green-600' : 'text-red-600'}`}>
                  {selectedProduct.inStock ? 'In Stock' : 'Out of Stock'}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Product ID</h3>
                <p className="text-sm text-gray-900 font-mono">{selectedProduct._id}</p>
              </div>
            </div>
            
            {selectedProduct.createdAt && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Created At</h3>
                  <p className="text-sm text-gray-900">
                    {new Date(selectedProduct.createdAt).toLocaleString()}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Last Updated</h3>
                  <p className="text-sm text-gray-900">
                    {new Date(selectedProduct.updatedAt).toLocaleString()}
                  </p>
                </div>
              </div>
            )}
            
            {selectedProduct.description && (
              <div>
                <h3 className="text-sm font-medium text-gray-500">Description</h3>
                <p className="text-sm text-gray-900">{selectedProduct.description}</p>
              </div>
            )}
          </div>
          
          <div className="flex flex-wrap gap-4 mt-6">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 flex-1 min-w-[200px]"
              onClick={() => handleAddToCart(selectedProduct)}
            >
              Add to Cart
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="flex-1 min-w-[200px]"
              onClick={() => setSelectedProduct(null)}
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default Iphone;