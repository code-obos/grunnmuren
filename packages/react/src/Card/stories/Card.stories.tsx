import {
  Card,
  CardContent,
  CardImage,
  CardList as GCardList,
  CardLinkOverlay,
} from '../../';

export default {
  title: 'Card',
  parameters: { layout: 'padded' },
  argTypes: {
    bgColor: {
      options: ['white', 'gray'],
      control: { type: 'radio' },
    },
  },
};

export const Default = (props: unknown) => {
  return (
    <Card {...props}>
      <CardContent>
        <h3>Title</h3>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
        ullamcorper dignissim enim quis suscipit.
      </CardContent>
    </Card>
  );
};

Default.args = {
  bgColor: 'white',
};

export const Link = (props: unknown) => {
  return (
    <Card {...props}>
      <CardContent>
        <CardLinkOverlay href="#">
          <h3>Title</h3>
        </CardLinkOverlay>
        The whole card is clickable link, but only the heading gets underlined
        on hover.
      </CardContent>
    </Card>
  );
};

Link.args = {
  bgColor: 'white',
};

export const CardList = () => {
  return (
    <GCardList bgColor="gray">
      <CardExample />
      <CardExample />
    </GCardList>
  );
};

CardList.parameters = {
  layout: 'none',
};

const CardExample = () => (
  <Card>
    <CardImage
      src="https://res.cloudinary.com/obosit-prd-ch-clry/image/upload/w_500/f_auto,q_auto/v1578381770/Hammersborg%20Inkasso/2018_Medlem_06"
      width={500}
      height={333}
    />
    <CardContent>
      <h3 className="mb-4">
        <CardLinkOverlay href="#">Gode råd om økonomi</CardLinkOverlay>
      </h3>
      Se våre forbrukerråd!
    </CardContent>
  </Card>
);
