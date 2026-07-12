import { createFileRoute } from "@tanstack/react-router";
import { CollectionPage, collectionHead } from "@/components/collection-page";

export const Route = createFileRoute("/shop/bedside-tables/master-suite")({
  head: () => collectionHead("master-suite"),
  component: () => <CollectionPage slug="master-suite" />,
});
