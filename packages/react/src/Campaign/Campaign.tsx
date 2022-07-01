import { cloneElement, Children, isValidElement } from 'react';
import classNames from 'clsx';

interface CampaignProps<T extends React.ElementType> {
  /** @default div */
  as?: T;
  /** A CampaignImage and a CampaignBody */
  children: [React.ReactElement, React.ReactElement];
}

const Campaign = <T extends React.ElementType = 'div'>(
  props: CampaignProps<T> &
    Omit<React.ComponentPropsWithoutRef<T>, keyof CampaignProps<T>>,
) => {
  const { as: Component = 'div', className, ...rest } = props;

  return (
    <Component
      className={classNames(
        className,
        'grid gap-8 md:grid-flow-col md:grid-cols-[50%,50%] md:gap-0',
      )}
      {...rest}
    />
  );
};

interface CampaignBodyProps extends React.ComponentPropsWithoutRef<'div'> {}

const CampaignBody = (props: CampaignBodyProps) => {
  const { className, ...rest } = props;
  return (
    <div className={classNames(className, 'md:mx-18 self-center')} {...rest} />
  );
};

interface CampaignImageProps extends React.ComponentPropsWithoutRef<'img'> {
  /** Applies CSS order to move the image to the right on > medium sceens. Use this
   * to alternate the image's positon with lists of Campaigns.
   */
  rightAlign?: boolean;
}

const CampaignImage = (props: CampaignImageProps) => {
  const { className: classNameProp, children, rightAlign, ...rest } = props;

  const className = classNames(
    classNameProp,
    '<md:rounded-b-3xl w-full',
    rightAlign ? 'md:rounded-l-3xl md:order-1' : 'md:rounded-r-3xl',
  );

  // If the component has children, clone it and apply our classes.
  // Allows us to use custom image components (as long as they accept a className) such as next/image.
  if (isValidElement(children)) {
    const child = Children.only(children);

    return cloneElement(child, { className, ...rest });
  }

  // Otherwise we fallback to rendering an img element ourselves.
  return <img className={className} {...rest} />;
};

Campaign.Body = CampaignBody;
Campaign.Image = CampaignImage;
export { Campaign };
