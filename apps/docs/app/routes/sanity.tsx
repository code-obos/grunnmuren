import { createFileRoute } from '@tanstack/react-router';
import { Studio, defineConfig } from "sanity";

const config = defineConfig({
  projectId: "tq6w17ny",
  dataset: "grunnmuren",
  basePath: "/sanity"
});

export const Route = createFileRoute('/sanity')({
  component: () => <Studio config={config} />,
});
