import Image from 'next/image';
import Card from './components/Card';

const OBOS_LOGO = {
  src: 'https://res.cloudinary.com/obosit-prd-ch-clry/image/upload/q_auto/v1619689575/OBOS%20Merkevare/OBOS/Liggende/obos_liggende_hus_hvit.svg',
  height: '115',
  width: '484',
} as const;

export default function FrontPage() {
  return (
    <div className="container min-h-screen py-14">
      <Image className="h-10 w-40" aria-hidden {...OBOS_LOGO} alt="" />
      <div className="flex pt-20">
        <h1 className="text-[116px] leading-none text-white">Grunnmuren </h1>
        <div className="bg-sky-lightest h-fit rounded-sm px-3 py-1.5 ">
          <p>Beta</p>
        </div>
      </div>
      <h2 className="pt-4 font-normal text-white">OBOS' designsystem</h2>
      <div className="grid grid-cols-2">
        <Card title="Figma" content="Tester dette innholdet." />
      </div>
    </div>
  );
}
