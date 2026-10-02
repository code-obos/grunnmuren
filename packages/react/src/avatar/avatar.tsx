import { User } from '@obosbbl/grunnmuren-icons-react';
import { cx } from 'cva';
import { type ComponentProps, useState } from 'react';

type AvatarProps = ComponentProps<'img'>;

const baseClassName = 'h-20 w-20 shrink-0 rounded-full';

const Avatar = ({ src, alt = '', className, onError, loading = 'lazy', ...rest }: AvatarProps) => {
  const [hasError, setHasError] = useState(false);
  const hasValidImage = !hasError && src;

  return hasValidImage ? (
    <img
      {...rest}
      src={src}
      alt={alt}
      loading={loading}
      className={cx(className, baseClassName, 'object-cover')}
      onError={(event) => {
        onError?.(event);
        setHasError(true);
      }}
    />
  ) : (
    <div
      className={cx(
        className,
        baseClassName,
        'bg-neutral-surface-tinted text-neutral-text-subtle grid place-items-center',
      )}
    >
      <User className="scale-[2.25]" />
    </div>
  );
};

export { Avatar, type AvatarProps };
