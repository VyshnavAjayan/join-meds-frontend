import React from 'react';

const Label = ({ type = 'success', label = 'approved' }) => {
  const getColor = () => {
    switch (type) {
      case 'success':
        return 'bg-[#DCFFF2] border-[#00A86B] text-[#00A868]';

      case 'warning':
        return 'bg-[#FFECD0] border-[#FE9B41] text-[#FE9B41]';

      case 'error':
        return 'bg-[#FFE2E9] border-[#E83A7A] text-[#E83A7A]';

      default:
        return '';
    }
  };

  return (
    <div className={`flex justify-center items-center px-2 py-1 border-[0.5px] w-max h-max ${getColor()} rounded-sm`}>
      <span className="uppercase text-[9px] font-extrabold tracking-[2px] leading-[9px]">{label}</span>
    </div>
  );
};

export default Label;
