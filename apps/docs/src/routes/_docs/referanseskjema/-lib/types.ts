import type { SampleData } from './sample-data';

export type StepProps = {
  onNext: () => void;
  onPrevious: () => void;
  sampleData: SampleData;
};

export type ComponentProp = {
  name: string;
  type: string;
  description: string;
  default?: string;
};
