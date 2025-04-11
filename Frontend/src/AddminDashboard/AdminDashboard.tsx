import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Smartphone,
  Phone,
  Laptop,
  Headphones,
  LogOut,
  Menu
} from 'lucide-react';
import { cn } from '../lib/utils';
import Cookies from 'js-cookie';
import Dashboard from './Dashboard/Dashboard';
import Iphone from './Dashboard/Iphone';
import Android from './Dashboard/Android';
import Laptops from './Dashboard/Laptops';
import Acessoies from './Dashboard/Acessoies';

const AdminDashboard = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    Cookies.remove('token');
    navigate('/login');
  };

  const menuItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      path: "/AdminDashboard"
    },
    {
      title: "Iphone",
      icon: Phone,
      path: "/admin/Iphone"
    },
    {
      title: "Android",
      icon: Smartphone,
      path: "/admin/Android"
    },
    {
      title: "Laptops",
      icon: Laptop,
      path: "/admin/Laptops"
    },
    {
      title: "Accessories",
      icon: Headphones,
      path: "/admin/Acessories"
    }
  ];

  const renderContent = () => {
    switch (location.pathname) {
      case '/admin/Iphone':
        return <Iphone />;
      case '/admin/Android':
        return <Android />;
      case '/admin/Laptops':
        return <Laptops />;
      case '/admin/Acessories':
        return <Acessoies />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={cn(
          "bg-white shadow-lg transition-all duration-300 fixed h-full",
          isCollapsed ? "w-20" : "w-64"
        )}
      >
        <div className="flex items-center justify-between p-4 border-b">
          {!isCollapsed && <h1 className="text-xl font-bold">Admin Panel</h1>}
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.title}>
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center p-3 rounded-lg hover:bg-gray-100 transition-colors",
                    isCollapsed ? "justify-center" : "space-x-3"
                  )}
                >
                  <item.icon className="w-6 h-6" />
                  {!isCollapsed && <span>{item.title}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t">
          <button 
            onClick={handleLogout}
            className="flex items-center w-full p-3 rounded-lg hover:bg-gray-100"
          >
            <LogOut className="w-6 h-6" />
            {!isCollapsed && <span className="ml-3">Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64 overflow-auto">
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;