import React from 'react';
import { Button } from 'common/components';

const ButtonBar = ({ data = [], className }) => {
  return (
    <div className={className}>
      {data.map((item) => <Button variant={item.variant || 'primary'} key={item.title || 'Proceed'} onClick={item.onClick}>{item.title}</Button>)}
    </div>
  );
};

export default ButtonBar;
