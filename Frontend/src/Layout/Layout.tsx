import PropTypes from 'prop-types';
import Navbar from '../Navbar/Navbar';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
  isLoggedIn: boolean;
  onLogout: () => void;
}

const Layout = ({ children, isLoggedIn, onLogout }: LayoutProps) => {
  const location = useLocation();
  const hideNavbarPaths = [
    '/AdminDashboard',
    '/admin/Acessories',
    '/admin/Laptops',
    '/admin/Android',
    '/admin/Iphone',
    '/login',
    '/signup',
    '/forgetpassword'
  ];
  const shouldHideNavbar = hideNavbarPaths.includes(location.pathname);

  return (
    <>
      {isLoggedIn && !shouldHideNavbar && <Navbar onLogout={onLogout} />}
      <div className=''>
        {children}
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  onLogout: PropTypes.func.isRequired
};

Layout.defaultProps = {
  isLoggedIn: false
};

export default Layout;