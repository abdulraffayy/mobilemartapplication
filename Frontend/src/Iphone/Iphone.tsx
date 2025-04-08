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

import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();
  const handleViewDetails = (product: Product) => {
    if (product && product._id) {
      navigate(`/viewdetails/${product._id}`);
    } else {
      console.error("Invalid product ID");
    }
  };
  

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-gradient-to-b from-gray-50 to-gray-100 pb-16">
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
                      onClick={() => handleViewDetails(product)}
                    >
                      View Details
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
// export default Iphone;