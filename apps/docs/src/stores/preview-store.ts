import { Store } from '@tanstack/store';

/**
 * Global client-side state for Sanity preview mode.
 *
 * - `isPreview`         – does the user have an active preview session?
 * - `isDraftsPerspective` – is Studio currently asking for drafts (vs. published)?
 *
 * Subscribe with `useStore(previewStore)` in components, or read the latest
 * value synchronously via `previewStore.state`.
 */

type PreviewState = {
  isPreview: boolean;
  isDraftsPerspective: boolean;
};

export const previewStore = new Store<PreviewState>({
  isPreview: false,
  isDraftsPerspective: false,
});

export function setPreviewMode(isPreview: boolean) {
  previewStore.setState((state) => ({
    ...state,
    isPreview,
    // Default to "drafts" the first time we enter preview.
    isDraftsPerspective: isPreview ? true : false,
  }));
}

export function setPreviewPerspective(isDrafts: boolean) {
  previewStore.setState((state) => ({ ...state, isDraftsPerspective: isDrafts }));
}
