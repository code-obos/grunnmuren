import Link from 'next/link';
import { Card } from '../components/Card';

export default function IndexPage() {
  return (
    <Layout>
      <h1 className="text-7xl">
        Grunnmuren
        <span className="text-4xl block mt-4">OBOS' design system</span>
      </h1>
      <div className="text-black">
        <Link href="/icons">
          <a>
            <Card className="p-4">Ikoner</Card>
          </a>
        </Link>
      </div>
    </Layout>
  );
}

const Layout = ({ children }) => {
  return (
    <div className="bg-blue-dark w-screen h-screen text-white place-content-center grid">
      {children}
    </div>
  );
};
