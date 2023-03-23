import { cx } from '@/utils';
import { useBlockBackgroundColor, BlockBackgroundColor } from '../hooks';

interface BannerProps {
  bgColor?: BlockBackgroundColor;
  className?: string;
  children: React.ReactNode;
  heading: string;
  image: React.ReactNode;
}

export const Banner = (props: BannerProps) => {
  const {
    bgColor: bgColorProp,
    className,
    children,
    heading,
    image,
    ...rest
  } = props;

  const bgColor = useBlockBackgroundColor(bgColorProp);

  return (
    <article className={cx(className, bgColor, 'py-8 px-4 md:py-14')} {...rest}>
      <div className="container flex flex-col justify-center gap-4 md:flex-row md:gap-12">
        {image}
        <div className="max-w-prose">
          {heading && <h2 className="h3 mb-4">{heading}</h2>}
          {children}
        </div>
      </div>
    </article>
  );
};
