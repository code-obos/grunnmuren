import React, { useId } from 'react';
import { Input, FormLabel } from '../..';
import { Search } from '@obosbbl/grunnmuren-icons';

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
        <Input leftAddon="kr" />
      </Div>

      <Div label="Prefix icon">
        <Input leftAddon={<Search className="text-green" />} />
      </Div>

      <Div label="Prefixed placeholder">
        <Input leftAddon="kr" placeholder="100 000" />
      </Div>

      <Div label="Suffix icon">
        <Input rightAddon={<Search className="text-green" />} />
      </Div>

      <Div label="Suffix and prefix icon">
        <Input
          rightAddon={<Search className="text-green" />}
          leftAddon={<Search />}
        />
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

const Div = (props: { label: string; children: React.ReactElement }) => {
  const { label, children } = props;
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
