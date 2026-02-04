import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: App });

function App() {
  return (
    <div className="flex h-dvh flex-col items-center justify-center gap-y-2">
      <h1>Better Start</h1>
    </div>
  );
}
