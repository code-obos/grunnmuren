import { Close } from '@obosbbl/grunnmuren-icons-react';
import { useEffect, useState } from 'react';

import { PREVIEW_SESSION_COOKIE } from '@/lib/sanity-preview-session';

/**
 * Floating "Exit preview" button.
 *
 * Only renders when:
 *   - the preview cookie is present, AND
 *   - the page is NOT inside the Studio iframe (Studio has its own controls).
 *
 * Clicking it POSTs to `/api/preview` to clear the cookie and reloads.
 */
export function ExitPreviewButton() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const hasCookie = document.cookie.includes(`${PREVIEW_SESSION_COOKIE}=`);
    const isInIframe = window.self !== window.top;
    setShow(hasCookie && !isInIframe);
  }, []);

  if (!show) {
    return null;
  }

  const handleExit = async () => {
    await fetch('/api/preview', { method: 'POST' });
    window.location.reload();
  };

  return (
    <div className="fixed bottom-4 left-4 z-999999 flex items-center gap-3 rounded-md border border-white/30 bg-black/80 px-3 py-2 text-sm text-white shadow-lg backdrop-blur">
      <span aria-hidden className="size-2 rounded-full bg-amber-400" />
      <span>Preview-modus aktiv</span>
      <button
        type="button"
        onClick={handleExit}
        className="focus-visible:outline-focus-inset flex items-center gap-1 rounded border border-white/40 px-2 py-1 text-xs font-medium hover:bg-white/15"
        aria-label="Avslutt preview"
      >
        <Close className="size-4" />
        Avslutt
      </button>
    </div>
  );
}
