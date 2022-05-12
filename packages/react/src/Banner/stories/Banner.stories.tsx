import { Banner, BannerImage } from '../../';

export default {
  title: 'Banner',
};

const img = {
  alt: 'IIllustrasjon av en mobiltelefon',
  src: 'https://res.cloudinary.com/obosit-prd-ch-clry/image/upload/w_172/f_auto,q_auto/v1573744438/Illustrasjoner%20(Karlstr%C3%B6m)/mobil',
  height: 537,
  width: 520,
};

const bgcColors = ['gray', 'green', 'yellow', 'blue'] as const;

export const Default = () => {
  return (
    <div className="flex flex-col gap-8">
      {bgcColors.map((bgColor) => (
        <Banner
          bgColor={bgColor}
          heading="Kontakt oss"
          image={<BannerImage {...img} />}
          key={bgColor}
        >
          Dersom du lurer på noe er det bare å ta kontakt med oss. Dersom du
          lurer på noe er det bare å ta kontakt med oss. Dersom du lurer på noe
          er det bare å ta kontakt med oss. Dersom du lurer på noe er det bare å
          ta kontakt med oss. Dersom du lurer på noe er det bare å ta kontakt
          med oss. Dersom du lurer på noe er det bare å ta kontakt med oss.
          Dersom du lurer på noe er det bare å ta kontakt med oss.
        </Banner>
      ))}
    </div>
  );
};
