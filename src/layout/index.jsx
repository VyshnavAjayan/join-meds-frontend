import { Outlet } from 'react-router-dom';
import { Body } from './components';


const Layout = () => {
  return (
        <div className="md:col-span-12">
          <Body>
            <Outlet />
          </Body>
        </div>
     
  );
};

export default Layout;
