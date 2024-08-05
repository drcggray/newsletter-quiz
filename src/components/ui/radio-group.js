import React from 'react';

export const RadioGroup = ({ children, onValueChange, value }) => (
  <div onChange={(e) => onValueChange(e.target.value)} value={value}>
    {children}
  </div>
);

export const RadioGroupItem = ({ value, id }) => (
  <input type="radio" value={value} id={id} />
);