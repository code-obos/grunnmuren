import React, { useId } from 'react';
import { Input, FormLabel } from '../..';

const metadata = { title: 'Input', parameters: { layout: 'padded' } };
export default metadata;

export const Default = () => {
  return (
    <div className="flex flex-col gap-4">
      <Div label="Plain">
        <Input />
      </Div>

      <Div label="Placeholder">
        <Input placeholder="Placeholder" />
      </Div>

      <Div label="Prefix">
        <Input prefix="kr" />
      </Div>

      <Div label="Prefixed placeholder">
        <Input prefix="kr" placeholder="100 000" />
      </Div>

      <Div label="Size: (10)">
        <Input size={10} />
      </Div>

      <Div label="Invalid">
        <Input isInvalid />
      </Div>
    </div>
  );
};

const Div = ({ label, children }) => {
  const id = useId();
  return (
    <div>
      <FormLabel className="mb-2" htmlFor={id}>
        {label}
      </FormLabel>
      {React.cloneElement(children, { id })}
    </div>
  );
};
