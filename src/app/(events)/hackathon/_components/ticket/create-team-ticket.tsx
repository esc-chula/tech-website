'use client';

import { Button } from '~/components/ui/button';
import { createHackathonTeamTicket } from '~/server/actions/hackathon';

const CreateTeamTicket: React.FC = () => {
  return (
    <Button
      onClick={() => {
        createHackathonTeamTicket([1, 2]).catch((err: unknown) => {
          console.error(err instanceof Error ? err.message : err);
        });
      }}
    >
      Create Team Ticket
    </Button>
  );
};

export default CreateTeamTicket;
