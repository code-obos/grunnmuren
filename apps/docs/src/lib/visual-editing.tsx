import {
  type HistoryAdapterNavigate,
  enableVisualEditing,
} from '@sanity/visual-editing';
import { useNavigate, useRouter } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

export function VisualEditing() {
  const router = useRouter();
  const [navigate, setNavigate] = useState<
    HistoryAdapterNavigate | undefined
  >();

  useEffect(() => {
    const disable = enableVisualEditing({
      history: {
        subscribe: (_navigate) => {
          console.log('subscribe');
          setNavigate(() => {
            _navigate({ type: 'replace', url: router.state.location.href });
            return _navigate;
          });
          return () => setNavigate(undefined);
        },
        update: (update) => {
          console.log('update', update);
          switch (update.type) {
            case 'push':
              router.history.push(update.url);
              break;
            case 'replace':
              router.history.replace(update.url);
              break;
            case 'pop':
              router.history.back();
              break;
          }
        },
      },
    });

    return disable;
  }, [router]);

  useEffect(() => {
    if (navigate) {
      const unsubscribe = router.subscribe('onResolved', (evt) => {
        console.log(evt);
        navigate({ type: 'push', url: evt.toLocation.href });
      });

      return unsubscribe;
    }
  }, [router, navigate]);

  return null;
}
