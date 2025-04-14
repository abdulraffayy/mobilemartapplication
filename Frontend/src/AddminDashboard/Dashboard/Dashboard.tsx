import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Users, ShoppingCart, DollarSign, Package, LogOut } from "lucide-react";
import BackgoundImage from "../../assets/rafayraja.avif"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../components/ui/chart";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const stats = [
    {
      title: "Total Users",
      value: "1,234",
      icon: Users,
      description: "+20% from last month"
    },
    {
      title: "Total Products",
      value: "567",
      icon: Package,
      description: "+12% from last month"
    },
    {
      title: "Total Sales",
      value: "$12,345",
      icon: DollarSign,
      description: "+15% from last month"
    },
    {
      title: "Total Orders",
      value: "890",
      icon: ShoppingCart,
      description: "+8% from last month"
    }
  ];

  // Sample data for charts
  const salesData = [
    { name: "Jan", sales: 4000 },
    { name: "Feb", sales: 3000 },
    { name: "Mar", sales: 5000 },
    { name: "Apr", sales: 2780 },
    { name: "May", sales: 1890 },
    { name: "Jun", sales: 2390 },
  ];

  const productData = [
    { name: "Phones", value: 400 },
    { name: "Laptops", value: 300 },
    { name: "Tablets", value: 200 },
    { name: "Accessories", value: 278 },
    { name: "Others", value: 189 },
  ];

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
      <div className="relative p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Dashboard Overview</h1>
          <Button 
            variant="outline" 
            className="border-white/20 text-white hover:bg-white/10"
            onClick={handleLogout}
          >
           
            Logout
          </Button>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-black/20 backdrop-blur-md border border-white/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-white/70" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <p className="text-xs text-white/70">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {/* Sales Trend Chart */}
          <Card className="bg-black/20 backdrop-blur-md border border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Sales Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{ sales: { label: "Sales" } }}>
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-white/10" />
                  <XAxis dataKey="name" stroke="white" />
                  <YAxis stroke="white" />
                  <ChartTooltip
                    content={({ active, payload }) => (
                      <ChartTooltipContent
                        active={active}
                        payload={payload}
                        className="bg-black/80 text-white"
                      />
                    )}
                  />
                  <Line
                    type="monotone"
                    dataKey="sales"
                    stroke="var(--color-chart-1)"
                    strokeWidth={2}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Product Categories Chart */}
          <Card className="bg-black/20 backdrop-blur-md border border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Products All </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{ value: { label: "Products" } }}>
                <BarChart data={productData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-white/10" />
                  <XAxis dataKey="name" stroke="white" />
                  <YAxis stroke="white" />
                  <ChartTooltip
                    content={({ active, payload }) => (
                      <ChartTooltipContent
                        active={active}
                        payload={payload}
                        className="bg-black/80 text-white"
                      />
                    )}
                  />
                  <Bar dataKey="value" fill="var(--color-chart-2)" />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;