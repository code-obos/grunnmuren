import * as icons from '@obosbbl/grunnmuren-icons-react';
import Image from 'next/image';
import Link from 'next/link';

const OBOS_LOGO = {
  src: 'https://res.cloudinary.com/obosit-prd-ch-clry/image/upload/q_auto/v1619689575/OBOS%20Merkevare/OBOS/Liggende/obos_liggende_hus_hvit.svg',
  height: '115',
  width: '484',
} as const;

export default function Home() {
  return (
    <div className="container min-h-screen px-4 py-14 text-white">
      <Image className="h-10 w-40" aria-hidden {...OBOS_LOGO} alt="" />
      <Link
        href="/"
        className="group mt-8 flex w-fit items-center gap-2 font-medium no-underline"
      >
        <icons.ArrowLeft className="ml-2 transition-all duration-200 group-hover:ml-0 group-hover:mr-2" />
        Tilbake til forsiden
      </Link>
      <div className="mt-10 flex">
        <h1 className="text-[80px] leading-none">Ikoner </h1>
      </div>
      <div className="my-14 flex flex-wrap justify-between gap-20">
        {Object.entries(icons).map(([iconName, Icon]) => (
          <div
            key={iconName}
            className="flex w-32 flex-col items-center p-4 hover:rounded-lg hover:bg-blue"
          >
            <Icon className="mx-auto mb-2" />
            <span className="block text-center text-sm">{iconName}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
