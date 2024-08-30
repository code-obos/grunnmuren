import { StoryObj, Meta } from '@storybook/react';
import { Disclosure, DisclosureButton, DisclosureProps } from './Disclosure';
import { Content } from '..';

const Template = (args: DisclosureProps) => {
  return (
    <Disclosure
      onOpenChange={args.onOpenChange}
      defaultOpen={args.defaultOpen}
    >
      <DisclosureButton>Les mer</DisclosureButton>
      <Content className="prose">
        A disclosure is a button that controls the visibility of a panel of content. When the content inside the panel is hidden, it is often styled as a typical push button with a right-pointing arrow or triangle to hint that activating the button will display additional content. When the content is visible, the arrow or triangle typically points down.
      </Content>
    </Disclosure>
  );
};




const meta: Meta<typeof Disclosure> = {
  title: 'Disclosure',
  component: Disclosure,
  argTypes: {
    onOpenChange: { action: 'open change' },
  },
};

export default meta;

type Story = StoryObj<typeof Disclosure>;

const defaultProps: DisclosureProps = {
  defaultOpen: false,
};

export const Default: Story = {
  render: Template,
  args: {
    ...defaultProps,
  },
};
