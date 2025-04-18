import { Card, CardContent } from "../../components/ui/card";
import { Plus, Trash2, Check, X, Pencil } from "lucide-react";
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
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

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
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);

  const areaChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'iPhone Sales',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: true,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.4,
      },
    ],
  };

  const areaChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: 'rgba(255, 255, 255, 0.9)',
          font: {
            size: 14,
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
        },
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
        },
      },
    },
    maintainAspectRatio: false,
  };

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

  const handleEditClick = (product: Product) => {
    setProductToEdit(product);
    setEditDialogOpen(true);
  };

  const handleEditCancel = () => {
    setEditDialogOpen(false);
    setProductToEdit(null);
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
        </div>

        <Card className="border border-white/20 max-w-2xl mx-auto mb-8">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-white mb-4 text-center">iPhone Sales Performance</h2>
            <div className="h-[400px] w-full">
              <Line data={areaChartData} options={areaChartOptions} />
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center justify-around mb-4 ml-200">
          <Button className="bg-black/20 backdrop-blur-md border border-white/20 hover:bg-black/30 transition-colors duration-200 cursor-pointer h-8 text-white p-2">
            <Plus className="mr-2 h-3 w-3" />
            Add Product
          </Button>
        </div>

        <Card className="bg-black/20 backdrop-blur-md border border-white/20 max-w-4xl mx-auto">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-white">Products List</h2>
            </div>
            <Table className="w-full">
              <TableHeader>
                <TableRow className="hover:bg-transparent h-8">
                  <TableHead className="text-white w-20 py-1">Image</TableHead>
                  <TableHead className="text-white w-40 py-1">Name</TableHead>
                  <TableHead className="text-white w-24 py-1">Price</TableHead>
                  <TableHead className="text-white w-24 py-1">Color</TableHead>
                  <TableHead className="text-white w-24 py-1">Storage</TableHead>
                  <TableHead className="text-white w-24 py-1">Stock</TableHead>
                  <TableHead className="text-white w-24 py-1">Actions</TableHead>
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
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-blue-500 hover:text-blue-600 hover:bg-blue-500/10 h-5 w-5"
                            onClick={() => handleEditClick(product)}
                          >
                            <Pencil className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-500 hover:text-red-600 hover:bg-red-500/10 h-5 w-5"
                            onClick={() => handleDeleteClick(product)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
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
        <DialogContent className="sm:max-w-md bg-black/80 backdrop-blur-md border border-white/20 rounded-lg">
          <DialogHeader>
            <DialogTitle className="text-white text-xl font-semibold">Delete Product</DialogTitle>
            <DialogDescription className="text-white/80 mt-2">
              Are you sure you want to delete <span className="text-red-400 font-medium">{productToDelete?.name}</span>? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-3 mt-6">
            <Button
              variant="outline"
              onClick={handleDeleteCancel}
              className="border-white/20 text-white bg-black/40 px-4 py-2 rounded-md transition-all duration-200 flex items-center space-x-2 text-base font-medium"
            >
              <X className="h-4 w-4" />
              <span>Cancel</span>
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteConfirm}
              className="bg-red-600/80 text-white px-4 py-2 rounded-md transition-all duration-200 flex items-center space-x-2 text-base font-medium"
            >
              <Check className="h-4 w-4" />
              <span>Delete</span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-md bg-black/80 backdrop-blur-md border border-white/20 rounded-lg">
          <DialogHeader>
            <DialogTitle className="text-white text-xl font-semibold">Edit Product</DialogTitle>
            <DialogDescription className="text-white/80 mt-2">
              Edit the details of <span className="text-blue-400 font-medium">{productToEdit?.name}</span>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-3 mt-6">
            <Button
              variant="outline"
              onClick={handleEditCancel}
              className="border-white/20 text-white bg-black/40 px-4 py-2 rounded-md transition-all duration-200 flex items-center space-x-2 text-base font-medium"
            >
              <X className="h-4 w-4" />
              <span>Cancel</span>
            </Button>
            <Button
              variant="default"
              onClick={handleEditCancel}
              className="bg-blue-600/80 text-white px-4 py-2 rounded-md transition-all duration-200 flex items-center space-x-2 text-base font-medium"
            >
              <Check className="h-4 w-4" />
              <span>Save Changes</span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Iphone;