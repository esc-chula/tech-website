import { api } from '~/trpc/server';

import LinkCard from './link-card';
import LinkCreateDialogTrigger from './link-create-dialog-trigger';

const LinksContainer: React.FC = async () => {
  const res = await api.linkShortener.get();

  if (!res.success) {
    return <p>Failed to load links.</p>;
  }

  if (!res.data.length) {
    return <LinkCreateDialogTrigger variant="card" />;
  }

  return res.data.map((link) => <LinkCard key={link.id} {...link} />);
};

export default LinksContainer;
