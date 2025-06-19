/* eslint-disable react/no-danger */
import React from 'react';
import { t } from 'common/components';
import Instagram from '../../assets/instagram.svg';
import Facebook from '../../assets/facebook.svg';
import Twitter from '../../assets/twitter.svg';

const PortalFooter = () => {
  const aboutGovenemt = [
    {
      title: 'governmentofIndia',
      to: 'https://www.india.gov.in/'
    },
    {
      title: 'governmentofKerala',
      to: 'https://www.kerala.gov.in/'
    },
    {
      title: 'localSelfGovernmentDepartment',
      to: 'https://lsgkerala.gov.in/'
    }
  ];
  return (
    <div>

      <div className=" px-[30px] sm:px-[40px] md:px-[50px] lg:px-[70px]  xl:px-[150px] bg-[#09327b]  text-white bg-primaryblue text-white flex flex-wrap justify-between leading-[28px]">
        <div className="max-sm:w-[45%] pt-6">
          <p className=" font-bold ">{t('getInTouch')}</p>
          <p className=" font-normal my-[20px]  leading-[22px] sm:leading-[28px] text-[#AFD3E3] max-w-[300px]" dangerouslySetInnerHTML={{ __html: t('addressIkm') }} />
          {/* <button onClick={() => navigate(ROUTE_URL?.ABOUT_US, { state: { value: 'contact' } })}
           className="border-[1px] border-white rounded-[50px] max-md:w-[100px]
           font-SEMIBOLD w-full h-[38px] sm:h-[43px]">
            {t('contactUs')}
          </button> */}
        </div>
        <div className="py-[30px] sm:py-[40px] md:py-[50px] lg:py-[70px] flex flex-col items-center justify-between">
          {/* <p className="tracking-tight text-XS sm:text-xs md:text-sm lg:text-[15px]
           xl:text-[16px] font-light  mb-[16px]  sm:mb-[25px] lg:mb-[30px]
            text-center leading-[28px]">
            Official Web Portal of Kerala Local Government, Government of
            Kerala, Owned by Local Self Government Department, Developed by
            Information Kerala Mission
          </p> */}

          <div className="flex justify-center">
            <a href="https://ksmart.lsgkerala.gov.in/" target="_blank" rel="noreferrer">{t('wwwKerala')}
            </a>
          </div>
          <p className="text-[#A1A1AA] tracking-tight font-normal text-XS sm:text-xs md:text-sm mb-[16px]  sm:mb-[25px] lg:mb-[30px]">
            {t('copyRightReserved')}
          </p>
          <div className="flex justify-center gap-4 ">
            <a href="https://twitter.com/ikmkerala" target="_blank" rel="noreferrer">
              <img src={Twitter} alt={Twitter} />
            </a>
            <a href="https://www.facebook.com/ikm.gov.in" target="_blank" rel="noreferrer">
              <img src={Facebook} alt={Facebook} />
            </a>
            <a href="https://www.instagram.com/ikmkerala/" target="_blank" rel="noreferrer">
              <img src={Instagram} alt={Instagram} />
            </a>
          </div>
        </div>
        <div className="max-sm:w-[45%] pt-6">
          <p className="font-bold mb-[20px]">{t('abouttheGovernment')}</p>
          <div className="flex flex-col">
            {aboutGovenemt?.map((value) => {
              return (
                <a
                  target="_blank"
                  rel="noreferrer"
                  key={value?.title}
                  href={value?.to}
                  className="  font-normal mb-[5px] sm:mb-[20px] text-[#AFD3E3]"
                >
                  {t(value?.title)}
                </a>
              );
            })}
          </div>
        </div>
        <div className="h-[1px] w-full bg-[#E7EFF5] opacity-40" />

      </div>
    </div>
  );
};

export default PortalFooter;
