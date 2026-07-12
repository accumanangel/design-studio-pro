import { createFileRoute } from "@tanstack/react-router";
import { CollectionPage, collectionHead } from "@/components/collection-page";

export const Route = createFileRoute("/shop/bedside-tables/childrens")({
  head: () => collectionHead("childrens"),
  component: () => <CollectionPage slug="childrens" />,
});
