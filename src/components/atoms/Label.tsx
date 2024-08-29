import React from 'react';

import { LabelProps } from '../../types/componentsTypes/atomTypes/LabelProps'

const Label = ({ htmlFor, text }: LabelProps) => {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-300 mb-1">
      {text}
    </label>
  );
};

export default Label