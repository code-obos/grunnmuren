import { createClient, type SanityClient } from '@sanity/client';
import {
  enableVisualEditing,
  type HistoryAdapter,
  type HistoryAdapterNavigate,
} from '@sanity/visual-editing';
import { useRouter } from '@tanstack/react-router';
import { useEffect, useMemo, useRef, useState } from 'react';

function VisualEditingInner({ client }: { client: SanityClient }) {
  const router = useRouter();
  const routerRef = useRef(router);
  const navigateRef = useRef<HistoryAdapterNavigate | undefined>(undefined);

  routerRef.current = router;

  const history = useMemo<HistoryAdapter>(
    () => ({
      subscribe(navigate) {
        navigateRef.current = navigate;
        return () => {
          navigateRef.current = undefined;
        };
      },
      update(update) {
        switch (update.type) {
          case 'push':
            return routerRef.current.navigate({ to: update.url });
          case 'replace':
            return routerRef.current.navigate({ to: update.url, replace: true });
          case 'pop':
            return routerRef.current.history.back();
          default:
            throw new Error(
              `Unknown history update type: ${String((update as { type: string }).type)}`,
            );
        }
      },
    }),
    [],
  );

  useEffect(() => {
    const cleanup = enableVisualEditing({
      history,
      refresh: async (payload) => {
        if (payload.source === 'mutation') {
          await router.invalidate();
        }
      },
      zIndex: 999_999,
    });

    return () => cleanup();
  }, [history, router]);

  useEffect(() => {
    const currentUrl = window.location.pathname + window.location.search + window.location.hash;

    if (navigateRef.current) {
      navigateRef.current({
        type: 'push',
        url: currentUrl,
      });
    }
  }, [router.state.location.pathname, router.state.location.search, router.state.location.hash]);

  return null;
}

export function VisualEditing() {
  const [liveClient, setLiveClient] = useState<SanityClient | null>(null);

  useEffect(() => {
    let cancelled = false;

    const setup = async () => {
      try {
        const response = await fetch('/api/draft-token');

        if (!response.ok) {
          return;
        }

        const body = (await response.json()) as { token?: string };

        if (!body.token || cancelled) {
          return;
        }

        const studioUrl =
          (window as Window & { __SANITY_STUDIO_URL__?: string }).__SANITY_STUDIO_URL__ ??
          '/studio';

        const client = createClient({
          projectId: 'tq6w17ny',
          dataset: 'grunnmuren',
          apiVersion: '2026-04-27',
          useCdn: false,
          perspective: 'drafts',
          token: body.token,
          stega: {
            enabled: true,
            studioUrl,
          },
        });

        setLiveClient(client);
      } catch {
        // no-op when preview session is absent
      }
    };

    void setup();

    return () => {
      cancelled = true;
    };
  }, []);

  if (!liveClient) {
    return null;
  }

  return <VisualEditingInner client={liveClient} />;
}
