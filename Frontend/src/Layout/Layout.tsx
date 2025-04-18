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
    '/login',
    '/',  // Also hide on root path since it redirects to login
    '/signup',
    '/forgetpassword',
    '/AdminDashboard',
    '/admin/Acessories',
    '/admin/Laptops',
    '/admin/Android',
    '/admin/Iphone'
  ];

  const shouldHideNavbar = hideNavbarPaths.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && isLoggedIn && <Navbar onLogout={onLogout} />}
      <main>
        {children}
      </main>
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