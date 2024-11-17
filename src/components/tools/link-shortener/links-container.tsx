import { api } from "@/trpc/server";
import LinkCard from "./link-card";

export default async function LinksContainer() {
  const res = await api.linkShortener.get();

  if (!res.success) {
    return <p>Failed to load links.</p>;
  }

  return res.data.map((link, index) => <LinkCard key={index} {...link} />);
}
