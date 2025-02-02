'use client';

import { logout } from '~/server/actions/techmonth';

interface HeaderProps {
  studentId: string;
}

const Header: React.FC<HeaderProps> = ({ studentId }) => {
  return (
    <div className="flex w-full items-center justify-between text-2xl lg:text-3xl">
      <p>{studentId}</p>
      <button
        type="button"
        onClick={async () => {
          await logout();
        }}
      >
        logout
      </button>
    </div>
  );
};

export default Header;
