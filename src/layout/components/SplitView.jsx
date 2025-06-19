import React from 'react';
import ButtonBar from './ButtonBar';

const SplitView = ({ leftComponent = [], rightComponent = [], actions = [] }) => {
  return (
    <>
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-12 sm:col-span-6">
          {leftComponent}
        </div>
        <div className="col-span-12 sm:col-span-6">
          {rightComponent}
        </div>
      </div>
      {actions.length > 0 && <ButtonBar data={actions} className="flex justify-end mt-5" />}
    </>
  );
};

export default SplitView;
