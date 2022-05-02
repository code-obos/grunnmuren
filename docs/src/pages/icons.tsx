import * as icons from '@obosbbl/grunnmuren-icons';
import Head from 'next/head';

export default function IconsPage() {
  return (
    <div>
      <Head>
        <title>Ikoner | Grunnmuren by OBOS</title>
      </Head>
      <h1>Ikoner</h1>
      <div className="grid grid-cols-[repeat(auto-fill,_100px)] content-center gap-4">
        {Object.entries(icons).map(([iconName, Icon]) => (
          <IconCard iconName={iconName} key={iconName}>
            <Icon className="center-align" />
          </IconCard>
        ))}
      </div>
    </div>
  );
}

const IconCard = ({ iconName, children }) => {
  return (
    <div className="text-center">
      {children}
      <span className="text-sm">{iconName}</span>
    </div>
  );
};
