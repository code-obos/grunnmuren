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
        <h1 className="text-[48px] leading-none text-white sm:text-[72px] lg:text-[116px]">
          Grunnmuren{' '}
        </h1>
        <div className="h-fit rounded-sm bg-sky-lightest px-1 sm:px-3 sm:py-1.5 ">
          <p className="text-[12px] sm:text-base">Beta</p>
        </div>
      </div>
      <h2 className="h3 mt-4 font-normal text-white sm:h2 sm:font-normal">
        OBOS{"'"} designsystem
      </h2>
      <div className="mb-10 mt-20 grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3">
        <Card
          title="Confluence"
          content="På Confluence finner du dokumentasjon og retningslinjer for bruk."
          href=""
          bgColor="blue"
        />
        <Card
          title="Figma"
          href="https://www.figma.com/file/XRHRRytz9DqrDkWpE4IKVB/OBOS-DS?type=design&node-id=221-746&mode=design&t=99r84414pa6dHvKV-0"
          content="På Figma finner du designskisser på eksisterende og kommende komponenter."
          bgColor="blue"
        />
        <Card
          title="Github"
          href="https://github.com/code-obos/grunnmuren/tree/v2"
          content="På Github finner du kildekoden til designsystemet."
          bgColor="blue"
        />
      </div>
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
        <Card
          title="Komponenter"
          href=""
          content="Komponentene og tilhørende eksempelkode ligger på Storybook."
          bgColor="white"
        />
        <Card
          title="Ikoner"
          content="Alle ikonene i Grunnmuren ligger på denne siden."
          href="/ikoner"
          bgColor="white"
        />
      </div>
    </div>
  );
}
