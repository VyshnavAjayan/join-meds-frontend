import { getLayoutColumns, getSidebarData } from 'pages/common/projectSelectors';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import {
  Tooltip, ksmThemeStyles, Icon, IconButton, IconPack
} from '@ksmartikm/ui-components';
import { t } from 'common/components';
import { ROUTE_URL } from 'common';
import { routeRedirect } from 'utils/common';
import { BackwardArrow } from 'assets/Svg';
import { MODULE_ORG } from 'common/constants';
import { Body, Sidebar } from '.';
import Header from './Header';

const { colors } = ksmThemeStyles;
const { reactIcons: { MaterialDesign: { MdKeyboardBackspace } = {} } = {} } = IconPack;

const AccordionLayout = () => {
  const { hideSidebar = false, sidebar } = useSelector(getLayoutColumns);
  const { activeStep } = useSelector(getSidebarData);
  const offset = 20;
  const navigate = useNavigate();

  const handleScroll = (e, top) => {
    window.scrollTo({
      top: (Number(e) * 60) + top,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    if (activeStep) {
      setTimeout(() => {
        handleScroll(activeStep, offset);
      }, 100);
    }
  }, [activeStep]);

  return (

    <div style={{ backgroundColor: colors.containerColor }}>
      <div className="fixed top-0 left-0 right-0 w-full z-[99]">
        <Header />
      </div>

      <div className="relative  md:pl-[2.8rem] pr-[1.8rem] lg:pt -[10px]  h-full  container m-auto pb-12">
        <div className="pb-[10px]">
          <Tooltip label={t('back')}>
            <IconButton
              variant="ghost"
              onClick={() => routeRedirect(ROUTE_URL?.ROOT_BASE)}
              icon={
                <Icon as={MdKeyboardBackspace} width={12} height={12} color="#E82C78" />
                }
            />
          </Tooltip>
        </div>
        {!hideSidebar && (
        <div className={`fixed top-[80px] ${sidebar} `}>
          <button
            className="flex mb-4"
            onClick={() => navigate(`${MODULE_ORG}${ROUTE_URL.ORGANISATION.OFFICE_LIST}`)}
          >
            <BackwardArrow />
            <span className="text-xl font-bold text-[#09327B]">{t('officeCreation')}</span>
          </button>
          <Sidebar />
        </div>
        )}
        <div className={`w-full max-h-full pt-[17px] ${hideSidebar ? 'w-full ' : 'pl-[302px]'}`}>
          <Body>
            <Outlet />
          </Body>
        </div>

      </div>
    </div>
  );
};

export default AccordionLayout;
