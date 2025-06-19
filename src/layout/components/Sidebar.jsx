import { SideBarAccordion } from '@ksmartikm/ui-components';
import { STATE_REDUCER_KEY } from 'pages/common';
import React from 'react';
import { useSelector } from 'react-redux';

const Sidebar = () => {
  const { sidebarData: { data = [] } = {} } = useSelector((state) => state[STATE_REDUCER_KEY]);

  return (
    <div className="w-[282px]">
      <SideBarAccordion data={data} />
    </div>
  );
};

export default Sidebar;
