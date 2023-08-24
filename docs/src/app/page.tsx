'use client';

import Image from 'next/image';
import Card from './components/Card';
import { motion } from 'framer-motion';

const OBOS_LOGO = {
  src: 'https://res.cloudinary.com/obosit-prd-ch-clry/image/upload/q_auto/v1619689575/OBOS%20Merkevare/OBOS/Liggende/obos_liggende_hus_hvit.svg',
  height: '115',
  width: '484',
} as const;

interface CardProps {
  title: string;
  content: string;
  href: string;
  bgColor: 'blue' | 'white';
}

const topCards: CardProps[] = [
  {
    title: 'Confluence',
    content:
      'På Confluence finner du dokumentasjon og retningslinjer for bruk.',
    href: 'https://obos-bbl.atlassian.net/l/cp/vyU0EjZ5',
    bgColor: 'blue',
  },
  {
    title: 'Figma',
    href: 'https://www.figma.com/file/XRHRRytz9DqrDkWpE4IKVB/OBOS-DS?type=design&node-id=221-746&mode=design&t=99r84414pa6dHvKV-0',
    content:
      'På Figma finner du designskisser på eksisterende og kommende komponenter.',
    bgColor: 'blue',
  },
  {
    title: 'Github',
    href: 'https://github.com/code-obos/grunnmuren/tree/v2',
    content: 'På Github finner du kildekoden til designsystemet.',
    bgColor: 'blue',
  },
];

const bottomCards: CardProps[] = [
  {
    title: 'Komponenter',
    content: 'Komponentene og tilhørende eksempelkode ligger på Storybook.',
    href: 'https://code-obos.github.io/grunnmuren',
    bgColor: 'white',
  },
  {
    title: 'Ikoner',
    href: '/ikoner',
    content: 'Alle ikonene i Grunnmuren ligger på denne siden.',
    bgColor: 'white',
  },
];

export default function FrontPage() {
  return (
    <div className="container min-h-screen py-14">
      <Image className="h-10 w-40" aria-hidden {...OBOS_LOGO} alt="" />

      <div className="mt-20 flex">
        <h1 className="text-[48px] leading-none text-white sm:text-[72px] lg:text-[116px]">
          Grunnmuren{' '}
        </h1>
        <motion.div
          className="h-fit rounded-sm bg-sky-lightest px-1 sm:px-3 sm:py-1.5"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            delay: 1.2,
            type: 'spring',
            stiffness: 200,
            duration: 0.1,
          }}
        >
          <p className="text-[12px] sm:text-base">Beta</p>
        </motion.div>
      </div>
      <h2 className="h3 mt-4 font-normal text-white sm:h2 sm:font-normal">
        OBOS{"'"} designsystem
      </h2>
      <div className="mb-10 mt-20 grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3">
        {topCards.map((obj, i) => (
          <motion.div
            key={i}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0 + i * 0.15, ease: 'easeInOut' }}
          >
            <Card
              href={obj.href}
              title={obj.title}
              content={obj.content}
              bgColor={obj.bgColor}
            />
          </motion.div>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
        {bottomCards.map((obj, i) => (
          <motion.div
            key={i}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, ease: 'easeInOut' }}
          >
            <Card
              href={obj.href}
              title={obj.title}
              content={obj.content}
              bgColor={obj.bgColor}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
