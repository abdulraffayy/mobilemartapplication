import { Card, CardContent } from "../../components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import BackgoundImage from "../../assets/rafayraja.avif"
import { Button } from "../../components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";

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

const Iphone = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products/');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (product: Product) => {
    setProductToDelete(product);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!productToDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/products/${productToDelete._id}`);
      setProducts(products.filter(product => product._id !== productToDelete._id));
      setDeleteDialogOpen(false);
      setProductToDelete(null);
      toast.success('Product deleted successfully');
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product');
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setProductToDelete(null);
  };

  return (
    <div 
      className="min-h-screen w-full relative"
      style={{
        backgroundImage: `url(${BackgoundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-white">iPhone Products</h1>
          <Button className="bg-green-600 hover:bg-green-700 h-8">
            <Plus className="mr-2 h-3 w-3" />
            Add Product
          </Button>
        </div>

        <Card className="bg-black/20 backdrop-blur-md border border-white/20 max-w-4xl mx-auto">
          <CardContent className="p-4">
            <Table className="w-full">
              <TableHeader>
                <TableRow className="hover:bg-transparent h-8">
                  <TableHead className="text-white w-20 py-1">Image</TableHead>
                  <TableHead className="text-white w-40 py-1">Name</TableHead>
                  <TableHead className="text-white w-24 py-1">Price</TableHead>
                  <TableHead className="text-white w-24 py-1">Color</TableHead>
                  <TableHead className="text-white w-24 py-1">Storage</TableHead>
                  <TableHead className="text-white w-24 py-1">Stock</TableHead>
                  <TableHead className="text-white w-16 py-1">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow className="h-12">
                    <TableCell colSpan={7} className="text-center text-white py-1">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : products.length === 0 ? (
                  <TableRow className="h-8">
                    <TableCell colSpan={7} className="text-center text-white py-1">
                      No products found
                    </TableCell>
                  </TableRow>
                ) : (
                  products.map((product) => (
                    <TableRow key={product._id} className="hover:bg-black/10 h-8">
                      <TableCell className="py-1">
                        <img 
                          src={product.url} 
                          alt={product.name} 
                          className="w-10 h-10 object-contain rounded"
                        />
                      </TableCell>
                      <TableCell className="text-white py-1">{product.name}</TableCell>
                      <TableCell className="text-white py-1">${product.price}</TableCell>
                      <TableCell className="text-white py-1">{product.color}</TableCell>
                      <TableCell className="text-white py-1">{product.storage}</TableCell>
                      <TableCell className="py-1">
                        <span className={`px-1.5 py-0.5 rounded-full text-xs ${
                          product.inStock 
                            ? 'bg-green-500/20 text-green-400' 
                            : 'bg-red-500/20 text-red-400'
                        }`}>
                          {product.inStock ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </TableCell>
                      <TableCell className="py-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-500 hover:text-red-600 hover:bg-red-500/10 h-5 w-5"
                          onClick={() => handleDeleteClick(product)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md bg-black/90 border border-white/20">
          <DialogHeader>
            <DialogTitle className="text-white">Delete Product</DialogTitle>
            <DialogDescription className="text-white/70">
              Are you sure you want to delete {productToDelete?.name}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleDeleteCancel}
              className="border-white/20 text-white hover:bg-white/10"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteConfirm}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Iphone;