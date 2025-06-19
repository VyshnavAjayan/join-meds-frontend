import { Outlet } from 'react-router-dom';
import { ksmThemeStyles } from 'common/components';
import Header from './Header';

const { colors } = ksmThemeStyles;

const HeadeWrapperLayout = () => {
  return (
    <div style={{ backgroundColor: colors.containerColor }}>
      <div className="fixed top-0 left-0 right-0 w-full z-[99]">
        <Header />
      </div>
      <div
        style={{
          maxHeight: 'calc(125vh - 152px - 55px)',
          minHeight: 'calc(125vh - 152px - 55px)',
          height: 'calc(125vh - 152px - 55px)'
        }}
        className="overflow-y-auto h-0 "
      >
        <Outlet />
      </div>
    </div>
  );
};

export default HeadeWrapperLayout;
