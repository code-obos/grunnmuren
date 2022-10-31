import { Default as Navbar } from '../Navbar/stories/Navbar.stories';
import { WithImage as Hero } from '../Hero/stories/Hero.stories';
import { Default as Footer } from '../Footer/stories/Footer.stories';

const metadata = {
  title: 'Pagelayout',
};
export default metadata;

export const Pagelayout = () => {
  return (
    <div className="page-layout">
      <Navbar />
      <main className="page-layout-main">
        <div>
          {/* @ts-expect-error we don't want to provide children as we reuse a story */}
          <Hero {...Hero.args} />
          <div className="prose container-prose">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
