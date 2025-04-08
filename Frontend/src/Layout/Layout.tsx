import PropTypes from 'prop-types';
import Navbar from '../Navbar/Navbar';

interface LayoutProps {
  children: React.ReactNode;
  isLoggedIn: boolean;
  onLogout: () => void;
}

const Layout = ({ children, isLoggedIn, onLogout }: LayoutProps) => {
  return (
    <>
      {isLoggedIn && <Navbar onLogout={onLogout} />}
      <div className='mt-[56px]'>
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