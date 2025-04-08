// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useCart } from "../../cartContext/CartContext";
// import {
//   Card,
//   CardHeader,
//   CardContent,
//   CardFooter,
//   CardTitle,
// } from "../../components/ui/card";
// import { Badge } from "../../components/ui/badge";
// import { Button } from "../../components/ui/button";
// import { Skeleton } from "../../components/ui/skeleton";

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

// const ViewDetails: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const [product, setProduct] = useState<Product | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const { addToCart } = useCart();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const apiUrl = `http://localhost:5000/api/products/${id}`;
//         console.log("Fetching from URL:", apiUrl);
  
//         const response = await fetch(apiUrl);
//         if (!response.ok) throw new Error("Failed to fetch product");
  
//         const data = await response.json();
//         console.log("Fetched product data:", data);
//         setProduct(data);
//       } catch (error) {
//         console.error("Error fetching product:", error);
//         setError(error instanceof Error ? error.message : "Unknown error");
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     if (id) {
//       console.log("Product ID:", id);
//       fetchProduct();
//     }
//   }, [id]);
  

//   const handleAddToCart = () => {
//     if (product) {
//       addToCart(product);
//       navigate("/cart");
//     }
//   };

//   if (loading) {
//     return (
//       <div className="max-w-3xl mx-auto p-4 mt-5">
//         <Card className="p-4 space-y-4">
//           <Skeleton className="h-6 w-1/2" />
//           <Skeleton className="h-64 w-full rounded-lg" />
//           <div className="flex gap-2">
//             <Skeleton className="h-4 w-16" />
//             <Skeleton className="h-4 w-16" />
//             <Skeleton className="h-4 w-16" />
//           </div>
//           <Skeleton className="h-4 w-3/4" />
//           <Skeleton className="h-10 w-32" />
//         </Card>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="max-w-3xl mx-auto p-4 mt-5">
//         <Card className="p-4 text-center">
//           <p className="text-red-500">{error}</p>
//         </Card>
//       </div>
//     );
//   }

//   if (!product) {
//     return (
//       <div className="max-w-3xl mx-auto p-4 mt-5">
//         <Card className="p-4 text-center">
//           <p>Product not found</p>
//         </Card>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-3xl mx-auto p-4 mt-5">
//       <Card className="overflow-hidden">
//         <CardHeader>
//           <CardTitle className="text-2xl font-bold">{product.name}</CardTitle>
//         </CardHeader>
//         <CardContent className="grid gap-4">
//           <div className="flex justify-center">
//             <img
//               src={product.url}
//               alt={product.name}
//               className="w-full max-h-96 object-contain rounded-md"
//             />
//           </div>
//           <div className="flex flex-wrap gap-2">
//             <Badge variant="outline">Color: {product.color}</Badge>
//             <Badge variant="outline">Storage: {product.storage}</Badge>
//             <Badge variant={product.inStock ? "default" : "destructive"}>
//               {product.inStock ? "In Stock" : "Out of Stock"}
//             </Badge>
//           </div>
//           {product.description && (
//             <div className="mt-4">
//               <h3 className="font-semibold mb-2">Description</h3>
//               <p className="text-gray-600 text-sm">{product.description}</p>
//             </div>
//           )}
//           <div className="mt-4 flex items-center justify-between">
//             <span className="text-2xl font-bold text-primary">
//               ${product.price.toLocaleString()}
//             </span>
//           </div>
//         </CardContent>
//         <CardFooter>
//           <Button
//             className="w-full py-6 text-lg"
//             onClick={handleAddToCart}
//             disabled={!product.inStock}
//           >
//             {product.inStock ? "Add to Cart" : "Out of Stock"}
//           </Button>
//         </CardFooter>
//       </Card>
//     </div>
//   );
// };

// export default ViewDetails;






import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../../cartContext/CartContext";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Skeleton } from "../../components/ui/skeleton";

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

const ViewDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const apiUrl = `http://localhost:5000/api/products/${id}`;
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Failed to fetch product");

        const data = await response.json();
        setProduct(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      navigate("/cart");
    }
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto p-4 mt-5">
        <Card className="p-4 space-y-4">
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-64 w-full rounded-lg" />
          <div className="flex gap-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
          </div>
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-10 w-32" />
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto p-4 mt-5">
        <Card className="p-4 text-center">
          <p className="text-red-500">{error}</p>
        </Card>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-3xl mx-auto p-4 mt-5">
        <Card className="p-4 text-center">
          <p>Product not found</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-2 ">
      <Card className="overflow-hidden shadow-lg rounded-lg bg-white ">
        <CardHeader className="bg-gray-100 p-4">
          <CardTitle className="text-3xl font-semibold text-center text-gray-800">
            {product.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2 p-6">
          <div className="flex justify-center items-center">
            <img
              src={product.url}
              alt={product.name}
              className="w-full max-h-96 object-contain rounded-md shadow-md"
            />
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="bg-gray-200 text-gray-800">
                Color: {product.color}
              </Badge>
              <Badge variant="outline" className="bg-gray-200 text-gray-800">
                Storage: {product.storage}
              </Badge>
              <Badge
                variant={product.inStock ? "default" : "destructive"}
                className={product.inStock ? "bg-green-200" : "bg-red-200"}
              >
                {product.inStock ? "In Stock" : "Out of Stock"}
              </Badge>
            </div>
            <div className="text-gray-600 text-sm">
              <p><strong>Price:</strong> ${product.price}</p>
              <p><strong>Created At:</strong> {new Date(product.createdAt).toLocaleDateString()}</p>
              <p><strong>Updated At:</strong> {new Date(product.updatedAt).toLocaleDateString()}</p>
            </div>
            {product.description && (
              <div className="mt-4">
                <h3 className="font-semibold text-lg mb-2">Description</h3>
                <p className="text-gray-600 text-sm">{product.description}</p>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="p-4">
          <Button
            className="w-full py-6 text-lg bg-blue-600 hover:bg-blue-700 text-white"
            onClick={handleAddToCart}
            disabled={!product.inStock}
          >
            {product.inStock ? "Add to Cart" : "Out of Stock"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ViewDetails;


