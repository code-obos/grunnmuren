import React, { Children, cloneElement } from 'react';
import { House } from '@obosbbl/grunnmuren-icons';
import { Button, ButtonProps } from '../';

const Composition = {
  Text: 'Text',
  Icon: 'Icon',
  TextIcon: 'Text Icon',
  IconText: 'Icon Text',
} as const;

type CompositionValue = (typeof Composition)[keyof typeof Composition];

export default {
  title: 'Button',
  argTypes: {
    composition: {
      options: Object.values(Composition),
      control: 'select',
      defaultValue: Composition.Text,
    },
    disabled: {
      control: 'boolean',
      defaultValue: false,
    },
    loading: {
      control: 'boolean',
      defaultValue: false,
    },
  },
};

export const Default = (props: {
  composition: CompositionValue;
  disabled: boolean;
  loading: boolean;
}) => {
  const { composition, disabled, loading } = props;

  // Helper component that allows us to change the contentof the button when toggling the composition control in Storybook
  const ButtonContent = ({ children }: { children: React.ReactNode }) => {
    switch (composition) {
      case Composition.Icon:
        return <House />;
      case Composition.TextIcon:
        return (
          <>
            {children}
            <House />
          </>
        );
      case Composition.IconText:
        return (
          <>
            <House />
            {children}
          </>
        );
      default:
        return children;
    }
  };

  const buttons = [
    <Button key="button">
      {/* @ts-expect-error care */}
      <ButtonContent>Button</ButtonContent>
    </Button>,
    <Button key="link" href="#">
      {/* @ts-expect-error care */}
      <ButtonContent>Link</ButtonContent>
    </Button>,
  ];

  return (
    <>
      <ButtonsDisplayer buttonProps={{ disabled, loading }}>
        {buttons}
      </ButtonsDisplayer>

      <div className="bg-green-dark py-4">
        <ButtonsDisplayer buttonProps={{ color: 'mint', disabled, loading }}>
          {buttons}
        </ButtonsDisplayer>
      </div>

      <div className="bg-blue py-4">
        <ButtonsDisplayer buttonProps={{ color: 'white', disabled, loading }}>
          {buttons}
        </ButtonsDisplayer>
      </div>
    </>
  );
};

/**
 * Handles rendering button with an additional bag of props, both as primary and secondary variants
 * @param props
 * @returns
 */
const ButtonsDisplayer = (props: {
  children: React.ReactNode;
  buttonProps: Omit<ButtonProps, 'children'>;
}) => {
  const { children, buttonProps = {} } = props;

  return (
    <>
      <ButtonSpacer>
        {Children.map(children, (button) =>
          cloneElement(button as never, buttonProps),
        )}
      </ButtonSpacer>
      <ButtonSpacer>
        {Children.map(children, (button) =>
          cloneElement(button as never, {
            variant: 'secondary',
            ...buttonProps,
          }),
        )}
      </ButtonSpacer>
    </>
  );
};

const ButtonSpacer = (props: { children: React.ReactNode }) => (
  <div className="my-8 flex flex-row justify-center gap-8" {...props} />
);
