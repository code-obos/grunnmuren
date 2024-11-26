import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: Home,
});

function Home() {
  return <h1>Hello, Grunnmuren docs!</h1>;
}
