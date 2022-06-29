import { Campaign } from '../../';

export default {
  title: 'Campaign',
  parameters: { layout: 'padded' },
};

const images = [
  'https://res.cloudinary.com/obosit-prd-ch-clry/image/upload/w_780/f_auto,q_auto/v1611759995/Block%20Watne/Fluks/Mennesker/Bygge-hus-Fluks-arkitekt-ra%CC%8Adgiver',
  'https://res.cloudinary.com/obosit-prd-ch-clry/image/upload/w_780/f_auto,q_auto/v1614347690/Block%20Watne/Fluks/Interi%C3%B8r/interi%C3%B8r-standard-ferdighus',
  'https://res.cloudinary.com/obosit-prd-ch-clry/image/upload/w_780/f_auto,q_auto/v1612349703/Block%20Watne/Fluks/Illustrasjoner/Bygge-hus-inspirasjon',
];

export const Default = () => {
  return (
    <div className="container flex flex-col gap-16">
      {images.map((imageSrc, index) => (
        <Campaign key={index}>
          <Campaign.Image src={imageSrc} alt="" rightAlign={index % 2 !== 0} />
          <Campaign.Body>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vel
            leo et metus aliquet egestas quis vel lorem. Pellentesque in
            fermentum orci, eget pharetra ex. In maximus dolor id dolor
            vulputate, a placerat nulla sollicitudin. Sed viverra nisl ac nisi
            sodales, eu porttitor felis vulputate. Nulla volutpat rutrum dictum.
            Mauris augue odio, dignissim ac nibh porttitor, accumsan facilisis
            dui. Mauris ultrices elit in orci scelerisque feugiat.
          </Campaign.Body>
        </Campaign>
      ))}
    </div>
  );
};

export const WithCustomImageComponent = () => {
  return (
    <Campaign className="container">
      <Campaign.Image>
        <img src={images[0]} alt="" />
      </Campaign.Image>
      <Campaign.Body>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vel leo
        et metus aliquet egestas quis vel lorem. Pellentesque in fermentum orci,
        eget pharetra ex. In maximus dolor id dolor vulputate, a placerat nulla
        sollicitudin. Sed viverra nisl ac nisi sodales, eu porttitor felis
        vulputate. Nulla volutpat rutrum dictum. Mauris augue odio, dignissim ac
        nibh porttitor, accumsan facilisis dui. Mauris ultrices elit in orci
        scelerisque feugiat.
      </Campaign.Body>
    </Campaign>
  );
};
