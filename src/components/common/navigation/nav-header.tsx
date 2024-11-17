import { Menu as MenuIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';

import UserBox from '../user-box/user-box';
import UserBoxLoading from '../user-box/user-box-loading';

import NavItems from './nav-items';
import { NavMenu, NavMenuContent, NavMenuTrigger } from './nav-menu';

const NavHeader: React.FC = () => {
  return (
    <NavMenu>
      <header className="fixed left-0 right-0 top-0 z-50 flex h-16 justify-center border-b border-neutral-800 bg-neutral-950/70 px-5 backdrop-blur-lg md:px-10">
        <div className="flex h-full w-full max-w-screen-xl items-center justify-between">
          <Link href="/">
            <Image
              alt="ESC icon"
              className="select-none"
              height={28}
              src="/assets/esc-icon.svg"
              width={24}
            />
          </Link>
          <span className="hidden text-right text-xl font-semibold lg:inline">
            tech
          </span>
          <NavMenuTrigger className="select-none p-1 lg:hidden">
            <MenuIcon size={24} />
          </NavMenuTrigger>
        </div>
      </header>
      <NavMenuContent>
        <Suspense fallback={<UserBoxLoading />}>
          <UserBox />
        </Suspense>
        <NavItems />
      </NavMenuContent>
    </NavMenu>
  );
};

export default NavHeader;
