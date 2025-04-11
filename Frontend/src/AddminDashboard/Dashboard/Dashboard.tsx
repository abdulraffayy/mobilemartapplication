import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Users, ShoppingCart, DollarSign, Package } from "lucide-react";
import BackgoundImage from "../../assets/rafayraja.avif"

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
        <h1 className="text-3xl font-bold mb-8 text-white">Dashboard Overview</h1>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
      </div>
    </div>
  );
};

export default Dashboard;