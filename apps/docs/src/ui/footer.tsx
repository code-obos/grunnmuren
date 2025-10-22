import logoUrl from '@/assets/OBOS_Svart_Liggende.png?url';
import { Figma, Github, Slack } from '@obosbbl/grunnmuren-icons-react';
import { Link } from '@tanstack/react-router';

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
                href="https://www.figma.com/design/9OvSg0ZXI5E1eQYi7AWiWn/Grunnmuren-2.0-%E2%94%82-Designsystem?m=auto&t=ntAI3MrnoPScqEm9-6"
              >
                <Figma /> Figma
              </a>
            </li>

            <li>
              <a
                className="flex gap-2"
                href="https://github.com/code-obos/grunnmuren"
              >
                <Github /> GitHub
              </a>
            </li>

            <li>
              <a
                className="flex gap-2"
                href="https://obos.slack.com/archives/C03FR05FJ9F"
              >
                <Slack />
                <span className="sr-only">Slack:</span>{' '}
                #grunnmuren-design-system
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
