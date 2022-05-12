import { Alert } from '../';

export default {
  title: 'Alert',
};

const heading = 'Vedlikehold på IT-systemer kan påvirke nettsiden';
const text =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';

export const Default = () => {
  return (
    <div className="flex flex-col gap-4">
      <Alert heading={heading}>{text}</Alert>
      <Alert heading={heading} severity="info">
        {text}
      </Alert>
    </div>
  );
};
