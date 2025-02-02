import { api } from '~/trpc/server';

import LinkCard from './link-card';

const LinksContainer: React.FC = async () => {
  const res = await api.linkShortener.get();

  if (!res.success) {
    return <p>Failed to load links.</p>;
  }

  return res.data.map((link) => <LinkCard key={link.id} {...link} />);
};

export default LinksContainer;
