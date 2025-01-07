import { enableVisualEditing } from '@sanity/visual-editing'
import { useNavigate, useRouter } from '@tanstack/react-router';
import { useEffect } from 'react'

export function VisualEditing() {
  const router = useRouter();


  useEffect(() => {
    const disable = enableVisualEditing({
      history: {
        // subscribe: (_navigate) => {
        //   router.history.subscribe
        // },
        // subscribe: (_navigate) => {
        // },
        // subscribe: (_navigate) => {
        //   setNavigate(() => _navigate)
        //   return () => setNavigate(undefined)
        // },
        update: (update) => {
          console.log(update);
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
      }
    })

  }, [router]);

  return null;
}
