import { createFileRoute } from "@tanstack/react-router";
import { CollectionPage, collectionHead } from "@/components/collection-page";

export const Route = createFileRoute("/shop/bedside-tables/guest-room")({
  head: () => collectionHead("guest-room"),
  component: () => <CollectionPage slug="guest-room" />,
});
