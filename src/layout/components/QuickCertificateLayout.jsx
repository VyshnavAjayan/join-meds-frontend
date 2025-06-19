import {
  getFormSubTitle, getFormTitle, getLayoutColumns, getSidebarData
} from 'pages/common/projectSelectors';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import {
  Tooltip, ksmThemeStyles, Icon, IconButton, IconPack
} from '@ksmartikm/ui-components';
import { t } from 'common/components';
// import BreadCrummbs from 'common/components/BreadCrummbs';
import { ROUTE_URL } from 'common';
import { routeRedirect } from 'utils/common';
import QuickSearchHeader from './QuickSearchHeader';
import HeaderSection from './HeaderSection';
import { Body, Sidebar } from '.';
import PortalFooter from './PortalFooter';

const { colors } = ksmThemeStyles;
const { reactIcons: { MaterialDesign: { MdKeyboardBackspace } = {} } = {} } = IconPack;

const QuickCertificateLayout = () => {
  const { hideSidebar = false, sidebar } = useSelector(getLayoutColumns);
  const { title = '' } = useSelector(getFormTitle);
  const { subTitle = '' } = useSelector(getFormSubTitle);
  const { activeStep } = useSelector(getSidebarData);
  const offset = 20;

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
        <QuickSearchHeader />
      </div>
      <div>
        <HeaderSection
          title={title}
          subTitle={subTitle}
        />
      </div>

      {/* <BreadCrummbs /> */}
      <div style={{ maxHeight: 'calc(100vh - 76px)' }} className="overflow-y-auto ">
        {/* <div
          className="flex justify-start container m-auto fixed top-[76px]
          left-0 right-0 items-center gap-x-4 w-100 z-50 "
          style={{ backgroundColor: colors.containerColor }}
        >
          {!_.isEmpty(title) && (

          <FormTitle
            title={title}
            variant={variant}
            showSidebar={showSidebar}
            toolbar={toolbar}
          />
          )}
        </div> */}

      </div>
      <div className="relative lg:pt-[10px]  h-full container m-auto pb-12">
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
          <div className={`fixed top-[148px]${sidebar}`}>
            <Sidebar />
          </div>
        )}
        <div className={`w-full max-h-full ${hideSidebar ? 'w-full ' : 'pl-[302px]'}`}>
          <Body>
            <Outlet />
          </Body>
        </div>

      </div>
      <PortalFooter />
    </div>
  );
};

export default QuickCertificateLayout;
