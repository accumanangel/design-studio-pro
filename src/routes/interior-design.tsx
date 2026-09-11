import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/interior-design")({
  loader: () => {
    throw redirect({ to: "/shop", replace: true });
  },
});
