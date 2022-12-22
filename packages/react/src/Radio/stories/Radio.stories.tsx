import { useState } from 'react';
import { RadioGroup, Radio } from '../../';

const metadata = {
  title: 'Radio',
  parameters: {
    layout: 'padded',
  },
};
export default metadata;

export const Uncontrolled = () => {
  return (
    <RadioGroup name="form-name" defaultValue="2">
      <Radio value="1">Radio 1</Radio>
      <Radio value="2">Radio 2</Radio>
      <Radio value="3">Radio 3</Radio>
    </RadioGroup>
  );
};

export const Controlled = () => {
  const [value, setValue] = useState('2');

  return (
    <RadioGroup name="form-name" value={value} onChange={setValue}>
      <Radio value="1">Radio 1</Radio>
      <Radio value="2">Radio 2</Radio>
      <Radio value="3">Radio 3</Radio>
    </RadioGroup>
  );
};

export const WithLabelAndHelpText = () => {
  return (
    <RadioGroup
      name="form-name"
      label="Radio label"
      required
      description="Radio help text"
    >
      <Radio value="1">Radio 1</Radio>
      <Radio value="2">Radio 2</Radio>
      <Radio value="3">Radio 3</Radio>
    </RadioGroup>
  );
};

export const WithLongLabelThatBreaksLines = () => {
  return (
    <Radio value="1">
      Very long label that spans multiple lines on very small screens. The radio
      input should be vertically centered to the first line of the text, not the
      center of the whole height of the text label
    </Radio>
  );
};

export const WithErrorText = () => {
  const [value, setValue] = useState('');

  return (
    <RadioGroup
      name="form-name"
      description="Click on one of the options below to remove error-message"
      value={value}
      onChange={setValue}
      error={!value ? 'Feltet er påkrevd' : ''}
    >
      <Radio value="1" isInvalid={!value ? true : false}>
        Radio 1
      </Radio>
      <Radio value="2" isInvalid={!value ? true : false}>
        Radio 2
      </Radio>
      <Radio value="3" isInvalid={!value ? true : false}>
        Radio 3
      </Radio>
    </RadioGroup>
  );
};
