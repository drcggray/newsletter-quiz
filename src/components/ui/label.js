import React from 'react';

export const Label = ({ children, htmlFor }) => (
  <label htmlFor={htmlFor}>{children}</label>
);