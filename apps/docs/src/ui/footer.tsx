import { Figma, Github, Slack } from '@obosbbl/grunnmuren-icons-react';
import { Link } from '@tanstack/react-router';
import logoUrl from '@/assets/OBOS_Svart_Liggende.png?url';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-8 border-t border-t-gray-light">
      <div className="grid grid-flow-col py-8">
        <div className="flex flex-col justify-between">
          <Link to="/" aria-label="Gå til forsiden">
            <img src={logoUrl} alt="" className="max-w-32" />
          </Link>
          <p className="flex">© {currentYear} OBOS</p>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="heading-s">Her finner du oss</h2>
          <ul className="flex flex-col gap-4">
            <li>
              <a
                className="flex gap-2"
                href="https://github.com/code-obos/grunnmuren"
              >
                <Github /> GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
