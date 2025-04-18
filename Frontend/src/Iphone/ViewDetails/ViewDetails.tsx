import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
import { toast } from "react-hot-toast";

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

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const apiUrl = `http://localhost:5000/api/products/${id}`;
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Product not found in the database");
          } else if (response.status === 500) {
            throw new Error("Server error occurred");
          } else {
            throw new Error(`Failed to fetch product: ${response.statusText}`);
          }
        }

        const data = await response.json();
        if (!data) {
          throw new Error("No product data received");
        }
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
        setError(error instanceof Error ? error.message : "Unknown error occurred");
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
      toast.success(`${product.name} added to cart!`, {
        duration: 2000,
        position: "top-center",
        style: {
          background: "#4CAF50",
          color: "#fff",
          padding: "16px",
          borderRadius: "8px",
        },
      });
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


