import {
  Children,
  cloneElement,
  createContext,
  isValidElement,
  useContext,
  forwardRef,
  ForwardedRef,
} from 'react';
import { cx } from '@/utils';

// The context controls the alignment of the body vs the image
const CampaignContext = createContext(true);

interface CampaignProps<T extends React.ElementType> {
  /** @default div */
  as?: T;
  body: React.ReactElement;
  /** Use the `body` and `image` props. */
  children?: never;
  image: React.ReactElement;
  /**
   * Setting this to false changes the ordering of the body and the image on >= medium sceens.
   * Use this to alternate the image's positon with lists of Campaigns.
   * @default true
   */
  rightAlignBody?: boolean;
}

const CampaignInner = <T extends React.ElementType = 'div'>(
  props: CampaignProps<T> &
    Omit<React.ComponentPropsWithoutRef<T>, keyof CampaignProps<T>>,
  ref: ForwardedRef<HTMLDivElement>,
) => {
  const {
    as: Component = 'div',
    body: Body,
    className,
    image: Image,
    rightAlignBody = true,
    ...rest
  } = props;

  return (
    <Component
      className={cx(
        className,
        'grid gap-8 md:grid-flow-col md:grid-cols-[50%,50%] md:gap-0',
      )}
      {...rest}
      ref={ref}
    >
      <CampaignContext.Provider value={rightAlignBody}>
        {Image}
      </CampaignContext.Provider>
      {Body}
    </Component>
  );
};

const CampaignBase = forwardRef(CampaignInner);

interface CampaignBodyProps extends React.ComponentPropsWithoutRef<'div'> {}

const CampaignBody = forwardRef<HTMLDivElement, CampaignBodyProps>(
  (props, ref) => {
    const { className, ...rest } = props;
    return (
      <div
        className={cx(className, 'md:mx-18 self-center')}
        ref={ref}
        {...rest}
      />
    );
  },
);

interface CampaignImageProps extends React.ComponentPropsWithoutRef<'img'> {}

const CampaignImage = forwardRef<HTMLImageElement, CampaignImageProps>(
  (props, ref) => {
    const { className: classNameProp, children, ...rest } = props;

    const bodyIsRightAligned = useContext(CampaignContext);

    const className = cx(
      classNameProp,
      'max-md:rounded-b-3xl w-full',
      bodyIsRightAligned ? 'md:rounded-r-3xl' : 'md:rounded-l-3xl md:order-1',
    );

    // If the component has children, clone it and apply our classes.
    // Allows us to use custom image components (as long as they accept a className) such as next/image.
    if (isValidElement(children)) {
      const child = Children.only(children);

      return cloneElement(child, {
        // @ts-expect-error assume className prop is allowed
        className,
        ref,
        ...rest,
      });
    }

    // Otherwise we fallback to rendering an img element ourselves.
    return <img className={className} ref={ref} {...rest} />;
  },
);

const Campaign = Object.assign({}, CampaignBase, {
  Body: CampaignBody,
  Image: CampaignImage,
});

export { Campaign };
