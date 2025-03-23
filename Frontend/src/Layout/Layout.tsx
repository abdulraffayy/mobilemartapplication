import PropTypes from 'prop-types';
import Navbar from '../Navbar/Navbar';

interface LayoutProps {
  children: React.ReactNode;
  isLoggedIn: boolean;
}

const Layout = ({ children, isLoggedIn }: LayoutProps) => {
  return (
    <>
      {isLoggedIn && <Navbar />}
      {children}
    </>
  );
};

// Add PropTypes validation
Layout.propTypes = {
  children: PropTypes.node.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};

// Add default props (optional)
Layout.defaultProps = {
  isLoggedIn: false
};

export default Layout; 