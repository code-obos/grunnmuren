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
      <div className="mt-20 flex">
        <h1 className="text-[116px] leading-none text-white">Grunnmuren </h1>
        <div className="bg-sky-lightest h-fit rounded-sm px-3 py-1.5 ">
          <p>Beta</p>
        </div>
      </div>
      <h2 className="mt-4 font-normal text-white">OBOS{"'"} designsystem</h2>
      <div className="mt-20 grid grid-cols-2 gap-10">
        <Card
          title="Storybook"
          content="På Storybook finner du alle komponentene med tilhørende eksempelkode."
          href=""
        />
        <Card
          title="Confluence"
          content="På Confluence finner du dokumentasjon og retningslinjer for bruk."
          href=""
        />
        <Card
          title="Figma"
          href="https://www.figma.com/file/XRHRRytz9DqrDkWpE4IKVB/OBOS-DS?type=design&node-id=221-746&mode=design&t=99r84414pa6dHvKV-0"
          content="På Figma finner du designskisser på eksisterende og kommende komponenter."
        />
        <Card
          title="Github"
          href="https://github.com/code-obos/grunnmuren/tree/v2"
          content="På Github finner du kildekoden til designsystemet."
        />
      </div>
    </div>
  );
}
