import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Users, ShoppingCart, DollarSign, Package } from "lucide-react";
import BackgoundImage from "../../assets/rafayraja.avif"
import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  LineChart,
  Line
} from 'recharts';

// Define data interfaces
interface PieDataItem {
  name: string;
  value: number;
}

interface BarDataItem {
  name: string;
  sales: number;
  orders: number;
}

interface LineDataItem {
  name: string;
  revenue: number;
  profit: number;
}

// Add type assertions for Recharts components
const RechartsPie = Pie as any;
const RechartsTooltip = Tooltip as any;
const RechartsLegend = Legend as any;
const RechartsXAxis = XAxis as any;
const RechartsYAxis = YAxis as any;
const RechartsLine = Line as any;
const RechartsBar = Bar as any;

const Dashboard = () => {
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

  // Updated data for pie chart with detailed electronics categories
  const pieData: PieDataItem[] = [
    { name: 'iPhones', value: 400 },
    { name: 'Android Phones', value: 350 },
    { name: 'Laptops', value: 300 },
    { name: 'Accessories', value: 250 },
    { name: 'Tablets', value: 200 },
    { name: 'Smart Watches', value: 150 },
  ];

  // Sample data for bar chart
  const barData: BarDataItem[] = [
    { name: 'Jan', sales: 4000, orders: 2400 },
    { name: 'Feb', sales: 3000, orders: 1398 },
    { name: 'Mar', sales: 2000, orders: 9800 },
    { name: 'Apr', sales: 2780, orders: 3908 },
    { name: 'May', sales: 1890, orders: 4800 },
    { name: 'Jun', sales: 2390, orders: 3800 },
  ];

  // New data for line chart
  const lineData: LineDataItem[] = [
    { name: 'Week 1', revenue: 4000, profit: 2400 },
    { name: 'Week 2', revenue: 3000, profit: 1398 },
    { name: 'Week 3', revenue: 2000, profit: 9800 },
    { name: 'Week 4', revenue: 2780, profit: 3908 },
    { name: 'Week 5', revenue: 1890, profit: 4800 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

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
          {/* Pie Chart */}
          <Card className="bg-black/20 backdrop-blur-md border border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Electronics Categories Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <RechartsPie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }: { name: string; percent: number }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </RechartsPie>
                    <RechartsTooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        color: '#ffffff'
                      }}
                    />
                    <RechartsLegend wrapperStyle={{ color: '#ffffff' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Bar Chart */}
          <Card className="bg-black/20 backdrop-blur-md border border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Sales & Orders Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={barData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                    <RechartsXAxis 
                      dataKey="name" 
                      stroke="#ffffff"
                      tick={{ fill: '#ffffff' }}
                    />
                    <RechartsYAxis 
                      stroke="#ffffff"
                      tick={{ fill: '#ffffff' }}
                    />
                    <RechartsTooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        color: '#ffffff'
                      }}
                    />
                    <RechartsLegend wrapperStyle={{ color: '#ffffff' }} />
                    <RechartsBar dataKey="sales" fill="#8884d8" />
                    <RechartsBar dataKey="orders" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Line Chart - Full Width */}
          <Card className="bg-black/20 backdrop-blur-md border border-white/20 col-span-2">
            <CardHeader>
              <CardTitle className="text-white">Weekly Revenue & Profit</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={lineData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                    <RechartsXAxis 
                      dataKey="name"
                      stroke="#ffffff"
                      tick={{ fill: '#ffffff' }}
                    />
                    <RechartsYAxis 
                      stroke="#ffffff"
                      tick={{ fill: '#ffffff' }}
                    />
                    <RechartsTooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        color: '#ffffff'
                      }}
                    />
                    <RechartsLegend wrapperStyle={{ color: '#ffffff' }} />
                    <RechartsLine 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#8884d8" 
                      strokeWidth={2}
                      dot={{ fill: '#8884d8', r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                    <RechartsLine 
                      type="monotone" 
                      dataKey="profit" 
                      stroke="#82ca9d" 
                      strokeWidth={2}
                      dot={{ fill: '#82ca9d', r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;