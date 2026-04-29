import { createClient, type SanityClient } from '@sanity/client';
import {
  enableVisualEditing,
  type HistoryAdapter,
  type HistoryAdapterNavigate,
} from '@sanity/visual-editing';
import { useRouter } from '@tanstack/react-router';
import { useEffect, useMemo, useRef, useState } from 'react';

import { API_VERSION, DATASET, PROJECT_ID } from '../../util/env';

/**
 * The Studio URL is injected into `window` by the root document so that we
 * can read it from the client without baking it into the bundle.
 * See `__root.tsx`.
 */
function getStudioUrl(): string {
  const extendedWindow = window as Window & { __SANITY_STUDIO_URL__?: string };
  return extendedWindow.__SANITY_STUDIO_URL__ ?? '/studio';
}

/**
 * Once we have a Sanity client with a viewer token, this component:
 *   1. Wires up `enableVisualEditing` so the Studio overlays work.
 *   2. Bridges TanStack Router's history to Studio's expected `HistoryAdapter`,
 *      so navigation is kept in sync between the app and the Studio iframe.
 *   3. Invalidates router data on Sanity mutations to refetch live content.
 */
function VisualEditingInner({ client: _client }: { client: SanityClient }) {
  const router = useRouter();
  const routerRef = useRef(router);
  routerRef.current = router;

  const navigateRef = useRef<HistoryAdapterNavigate | undefined>(undefined);

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

  // Enable Studio overlays + live mutation refresh.
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

  // Push app navigation back up to Studio so the iframe URL stays in sync.
  useEffect(() => {
    const currentUrl = window.location.pathname + window.location.search + window.location.hash;
    navigateRef.current?.({ type: 'push', url: currentUrl });
  }, [router.state.location.pathname, router.state.location.search, router.state.location.hash]);

  return null;
}

/**
 * Top-level Visual Editing entrypoint.
 *
 * Renders nothing until it has fetched the viewer token from `/api/draft-token`.
 * Without the token, drafts are unreachable and stega/visual editing is useless,
 * so we'd rather render nothing than a half-broken overlay.
 */
export function VisualEditing() {
  const [liveClient, setLiveClient] = useState<SanityClient | null>(null);

  useEffect(() => {
    let cancelled = false;

    void (async () => {
      try {
        const response = await fetch('/api/draft-token');
        if (!response.ok) {
          return;
        }

        const { token } = (await response.json()) as { token?: string };
        if (!token || cancelled) {
          return;
        }

        setLiveClient(
          createClient({
            projectId: PROJECT_ID,
            dataset: DATASET,
            apiVersion: API_VERSION,
            useCdn: false,
            perspective: 'drafts',
            token,
            stega: { enabled: true, studioUrl: getStudioUrl() },
          }),
        );
      } catch {
        // No active preview session — silently no-op.
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  if (!liveClient) {
    return null;
  }
  return <VisualEditingInner client={liveClient} />;
}

// Default export so it can be used with React.lazy().
export default VisualEditing;
