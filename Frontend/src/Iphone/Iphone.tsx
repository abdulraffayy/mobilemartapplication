// // import { useEffect, useState } from "react";
// // import axios from "axios";
// // import videoimage from "../assets/iphonevideo.mp4";
// // import {
// //   Card,
// //   CardContent,
// //   CardFooter,
// //   CardHeader,
// //   CardTitle,
// // } from "../components/ui/card";
// // import { Button } from "../components/ui/button";
// // import { Badge } from "../components/ui/badge";
// // import { Skeleton } from "../components/ui/skeleton";
// // import AddPopup from "../Iphone/AddPopUp/AddPopup"; // Adjust the import path as needed

// // interface Product {
// //   _id: string;
// //   name: string;
// //   price: number;
// //   color: string;
// //   storage: string;
// //   inStock: boolean;
// //   url: string;
// //   updatedAt: string;
// //   createdAt: string;
// //   description?: string;

// // }
// // const Iphone: React.FC = () => {
// //   const [scrollY, setScrollY] = useState<number>(0);
// //   const [products, setProducts] = useState<Product[]>([]);
// //   const [isLoading, setIsLoading] = useState<boolean>(true);
// //   const [isAddPopupOpen, setIsAddPopupOpen] = useState<boolean>(false);

// //   const handleScroll = () => {
// //     setScrollY(window.scrollY);
// //   };

// //   useEffect(() => {
// //     window.addEventListener("scroll", handleScroll);
// //     return () => {
// //       window.removeEventListener("scroll", handleScroll);
// //     };
// //   }, []);

// //   useEffect(() => {
// //     const fetchProducts = async () => {
// //       try {
// //         setIsLoading(true);
// //         const response = await axios.get<Product[]>("http://localhost:5000/api/products");
// //         setProducts(response.data);
// //       } catch (error) {
// //         console.error("Error fetching products:", error);
// //       } finally {
// //         setIsLoading(false);
// //       }
// //     };

// //     fetchProducts();
// //   }, []);
// //   const handleSave = async (data: any) => {
// //     try {
// //       const response = await axios.post("http://localhost:5000/api/products/", data);
// //       console.log("Product saved successfully:", response.data);
// //       // Refresh the products list after adding a new product
// //       const updatedResponse = await axios.get<Product[]>("http://localhost:5000/api/products");
// //       setProducts(updatedResponse.data);
// //     } catch (error) {
// //       console.error("Error saving product:", error);
// //     } finally {
// //       setIsAddPopupOpen(!isAddPopupOpen);
// //     }
// //   };
// //   const videoStyle: React.CSSProperties = {
// //     width: `${Math.max(50, 100 - Math.min(scrollY / 5, 50))}%`,
// //     borderRadius: `${Math.min(scrollY / 10, 20)}px`,
// //     transition: "width 0.3s ease, border-radius 0.3s ease",
// //   };

// //   return (
// //     <div className="w-full min-h-screen flex flex-col items-center bg-gradient-to-b from-gray-50 to-gray-100">
// //       {/* Hero Video Section */}
// //       <section className="w-full flex items-center justify-center py-12 px-4">
// //         <video
// //           style={videoStyle}
// //           className="object-cover rounded-xl shadow-2xl"
// //           autoPlay
// //           loop
// //           muted
// //         >
// //           <source src={videoimage} type="video/mp4" />
// //           Your browser does not support the video tag.
// //         </video>
// //       </section>
// //       {/* Products Section */}
// //       <section className="w-full max-w-7xl px-4 py-8">
// //         <h1 className="text-3xl font-bold text-center mb-2">iPhone Collection</h1>
// //         <p className="text-gray-500 text-center mb-8">Explore our latest iPhone models</p>
// //         {isLoading ? (
// //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //             {[...Array(6)].map((_, index) => (
// //               <Card key={index}>
// //                 <CardHeader>
// //                   <Skeleton className="h-6 w-3/4" />
// //                   <Skeleton className="h-4 w-1/2 mt-2" />
// //                 </CardHeader>
// //                 <CardContent className="space-y-4">
// //                   <Skeleton className="h-48 w-full rounded-lg" />
// //                   <Skeleton className="h-4 w-1/3" />
// //                   <Skeleton className="h-4 w-1/4" />
// //                 </CardContent>
// //                 <CardFooter className="flex flex-col gap-2">
// //                   <Skeleton className="h-10 w-full" />
// //                   <div className="flex gap-2 w-full">
// //                     <Skeleton className="h-10 w-1/2" />
// //                     <Skeleton className="h-10 w-1/2" />
// //                   </div>
// //                 </CardFooter>
// //               </Card>
// //             ))}
// //           </div>
// //         ) : (
// //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //             {products.map((product) => (
// //               <Card
// //                 key={product._id}
// //                 className="group hover:shadow-lg transition-shadow duration-300 overflow-hidden"
// //               >
// //                 <CardHeader className="pb-0">
// //                   <div className="relative">
// //                     <img
// //                       src={product.url}
// //                       alt={product.name}
// //                       className="w-full h-48 object-contain transition-transform duration-500 group-hover:scale-105"
// //                     />
// //                     <Badge
// //                       variant={product.inStock ? "default" : "destructive"}
// //                       className="absolute top-2 right-2"
// //                     >
// //                       {product.inStock ? "In Stock" : "Out of Stock"}
// //                     </Badge>
// //                   </div>
// //                 </CardHeader>
// //                 <CardContent className="pt-4">
// //                   <CardTitle className="text-lg">{product.name}</CardTitle>
// //                   <div className="flex items-center gap-2 mt-2">
// //                     <Badge variant="outline" className="text-xs">
// //                       {product.color}
// //                     </Badge>
// //                     <Badge variant="outline" className="text-xs">
// //                       {product.storage}
// //                     </Badge>
// //                   </div>
// //                   <p className="text-2xl font-bold mt-3 text-primary">
// //                     ${product.price.toLocaleString()}
// //                   </p>
// //                 </CardContent>
// //                 <CardFooter className="flex flex-col gap-2">

// //                   <div className="flex gap-2 w-full flex-col">
// //                     <AddPopup
// //                       product={product}
// //                       onSave={handleSave}
// //                       trigger={
// //                         <Button
// //                           className="w-full"
// //                           disabled={!product.inStock}
// //                         >
// //                           Add to Cart
// //                         </Button>
// //                       }
// //                     />

// //                   </div>
// //                 </CardFooter>
// //               </Card>
// //             ))}
// //           </div>
// //         )}

// //         {products.length === 0 && !isLoading && (
// //           <div className="text-center py-12">
// //             <p className="text-gray-500">No products available</p>
// //           </div>
// //         )}
// //       </section>
// //     </div>
// //   );
// // };

// // export default Iphone;







// import { useEffect, useState } from "react";
// import axios from "axios";
// import videoimage from "../assets/iphonevideo.mp4";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "../components/ui/card";
// import { Button } from "../components/ui/button";
// import { Badge } from "../components/ui/badge";
// import { Skeleton } from "../components/ui/skeleton";

// interface Product {
//   _id: string;
//   name: string;
//   price: number;
//   color: string;
//   storage: string;
//   inStock: boolean;
//   url: string;
//   updatedAt: string;
//   createdAt: string;
//   description?: string;
// }

// const Iphone: React.FC = () => {
//   const [scrollY, setScrollY] = useState<number>(0);
//   const [products, setProducts] = useState<Product[]>([]);
//   const [isLoading, setIsLoading] = useState<boolean>(true);

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
//     const fetchProducts = async () => {
//       try {
//         setIsLoading(true);
//         const response = await axios.get<Product[]>("http://localhost:5000/api/products");
//         setProducts(response.data);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   const handleAddToCart = (product: Product) => {
//     // You can add a console log here if you want to verify the click
//     console.log("Add to cart clicked for:", product.name);
//     // Or you can implement actual cart functionality here
//   };

//   const videoStyle: React.CSSProperties = {
//     width: `${Math.max(50, 100 - Math.min(scrollY / 5, 50))}%`,
//     borderRadius: `${Math.min(scrollY / 10, 20)}px`,
//     transition: "width 0.3s ease, border-radius 0.3s ease",
//   };

//   return (
//     <div className="w-full min-h-screen flex flex-col items-center bg-gradient-to-b from-gray-50 to-gray-100">
//       {/* Hero Video Section */}
//       <section className="w-full flex items-center justify-center py-12 px-4">
//         <video
//           style={videoStyle}
//           className="object-cover rounded-xl shadow-2xl"
//           autoPlay
//           loop
//           muted
//         >
//           <source src={videoimage} type="video/mp4" />
//           Your browser does not support the video tag.
//         </video>
//       </section>

//       {/* Products Section */}
//       <section className="w-full max-w-7xl px-4 py-8">
//         <h1 className="text-3xl font-bold text-center mb-2">iPhone Collection</h1>
//         <p className="text-gray-500 text-center mb-8">Explore our latest iPhone models</p>
        
//         {isLoading ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {[...Array(6)].map((_, index) => (
//               <Card key={index}>
//                 <CardHeader>
//                   <Skeleton className="h-6 w-3/4" />
//                   <Skeleton className="h-4 w-1/2 mt-2" />
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                   <Skeleton className="h-48 w-full rounded-lg" />
//                   <Skeleton className="h-4 w-1/3" />
//                   <Skeleton className="h-4 w-1/4" />
//                 </CardContent>
//                 <CardFooter className="flex flex-col gap-2">
//                   <Skeleton className="h-10 w-full" />
//                   <div className="flex gap-2 w-full">
//                     <Skeleton className="h-10 w-1/2" />
//                     <Skeleton className="h-10 w-1/2" />
//                   </div>
//                 </CardFooter>
//               </Card>
//             ))}
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {products.map((product) => (
//               <Card
//                 key={product._id}
//                 className="group hover:shadow-lg transition-shadow duration-300 overflow-hidden"
//               >
//                 <CardHeader className="pb-0">
//                   <div className="relative">
//                     <img
//                       src={product.url}
//                       alt={product.name}
//                       className="w-full h-48 object-contain transition-transform duration-500 group-hover:scale-105"
//                     />
//                     <Badge
//                       variant={product.inStock ? "default" : "destructive"}
//                       className="absolute top-2 right-2"
//                     >
//                       {product.inStock ? "In Stock" : "Out of Stock"}
//                     </Badge>
//                   </div>
//                 </CardHeader>
//                 <CardContent className="pt-4">
//                   <CardTitle className="text-lg">{product.name}</CardTitle>
//                   <div className="flex items-center gap-2 mt-2">
//                     <Badge variant="outline" className="text-xs">
//                       {product.color}
//                     </Badge>
//                     <Badge variant="outline" className="text-xs">
//                       {product.storage}
//                     </Badge>
//                   </div>
//                   <p className="text-2xl font-bold mt-3 text-primary">
//                     ${product.price.toLocaleString()}
//                   </p>
//                 </CardContent>
//                 <CardFooter className="flex flex-col gap-2">
//                   <div className="flex gap-2 w-full flex-col">
//                     <Button
//                       className="w-full"
//                       disabled={!product.inStock}
//                       onClick={() => handleAddToCart(product)}
//                     >
//                       Add to Cart
//                     </Button>
//                   </div>
//                 </CardFooter>
//               </Card>
//             ))}
//           </div>
//         )}

//         {products.length === 0 && !isLoading && (
//           <div className="text-center py-12">
//             <p className="text-gray-500">No products available</p>
//           </div>
//         )}
//       </section>
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
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Skeleton } from "../components/ui/skeleton";
import { useCart } from "../cartContext/CartContext";
import Cart from "../cartContext/cart";

interface Product {
  _id: string;
  name: string;
  price: number;
  color: string;
  storage: string;
  inStock: boolean;
  url: string;
  updatedAt: string;
  createdAt: string;
  description?: string;
}

const Iphone: React.FC = () => {
  const [scrollY, setScrollY] = useState<number>(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const { addToCart, totalItems } = useCart();

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
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get<Product[]>("http://localhost:5000/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const videoStyle: React.CSSProperties = {
    width: `${Math.max(50, 100 - Math.min(scrollY / 5, 50))}%`,
    borderRadius: `${Math.min(scrollY / 10, 20)}px`,
    transition: "width 0.3s ease, border-radius 0.3s ease",
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-gradient-to-b from-gray-50 to-gray-100 pb-16">
      {/* Cart Button */}
      <button 
        onClick={() => setIsCartOpen(true)}
        className="fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg z-40 hover:bg-blue-700 transition-colors"
      >
        🛒
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </button>

      {isCartOpen && <Cart onClose={() => setIsCartOpen(false)} />}

      {/* Hero Video Section */}
      <section className="w-full flex items-center justify-center py-12 px-4">
        <video
          style={videoStyle}
          className="object-cover rounded-xl shadow-2xl"
          autoPlay
          loop
          muted
        >
          <source src={videoimage} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </section>

      {/* Products Section */}
      <section className="w-full max-w-7xl px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-2">iPhone Collection</h1>
        <p className="text-gray-500 text-center mb-8">Explore our latest iPhone models</p>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <Card key={index}>
                <CardHeader>
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2 mt-2" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <Skeleton className="h-48 w-full rounded-lg" />
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-4 w-1/4" />
                </CardContent>
                <CardFooter className="flex flex-col gap-2">
                  <Skeleton className="h-10 w-full" />
                  <div className="flex gap-2 w-full">
                    <Skeleton className="h-10 w-1/2" />
                    <Skeleton className="h-10 w-1/2" />
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card
                key={product._id}
                className="group hover:shadow-lg transition-shadow duration-300 overflow-hidden"
              >
                <CardHeader className="pb-0">
                  <div className="relative">
                    <img
                      src={product.url}
                      alt={product.name}
                      className="w-full h-48 object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                    <Badge
                      variant={product.inStock ? "default" : "destructive"}
                      className="absolute top-2 right-2"
                    >
                      {product.inStock ? "In Stock" : "Out of Stock"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline" className="text-xs">
                      {product.color}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {product.storage}
                    </Badge>
                  </div>
                  <p className="text-2xl font-bold mt-3 text-primary">
                    ${product.price.toLocaleString()}
                  </p>
                  {product.description && (
                    <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                      {product.description}
                    </p>
                  )}
                </CardContent>
                <CardFooter className="flex flex-col gap-2">
                  <div className="flex gap-2 w-full flex-col">
                    <Button
                      className="w-full"
                      disabled={!product.inStock}
                      onClick={() => addToCart(product)}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {products.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <p className="text-gray-500">No products available</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Iphone;