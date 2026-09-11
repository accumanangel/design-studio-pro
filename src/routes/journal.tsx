import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/journal")({
  loader: () => {
    throw redirect({ to: "/shop", replace: true });
  },
});
