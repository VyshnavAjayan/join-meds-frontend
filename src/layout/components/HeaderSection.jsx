import React from 'react';
import { useTranslation } from 'react-i18next';

const HeaderSection = ({ title, subTitle }) => {
  const { t } = useTranslation();
  return (
    <div className="sm:mt-[20px] md:mt-[86px] sm:rounded-t-[0px] marginX py-[94px] pb-[25px] sm:py-[38px] md:py-[30px] paddingX   bg-[#09327b] flex flex-col justify-center items-center">
      <p className="text-[20px] sm:text-[30px] md:text-[22px] lg:text-[24px] xl:text-[26px] text-white font-bold text-center">
        {t(title)}
      </p>
      <p className="text-[20px] sm:text-[30px] md:text-[22px] lg:text-[24px] xl:text-[26px] text-white font-bold text-center mt-2">
        <span className=" border bg-white text-[#09327B] px-5 rounded-md">
          {t(subTitle)}
        </span>
      </p>
      {/* <BreadCrummbs /> */}
    </div>
  );
};

export default HeaderSection;
