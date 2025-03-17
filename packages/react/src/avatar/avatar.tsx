type AvatarProps = {
  src: string;
};

const Avatar = ({ src }: AvatarProps) => (
  <img
    src={src}
    alt=""
    className="h-20 w-20 flex-shrink-0 rounded-full object-cover"
  />
);

export { Avatar as UNSTABLE_Avatar, type AvatarProps as UNSTABLE_AvatarProps };
