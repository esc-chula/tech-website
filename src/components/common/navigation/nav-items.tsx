'use client';

import Link from 'next/link';
import { Link as Scroll } from 'react-scroll';

import { heroLinks } from '~/constants/home';

import { useCloseNavMenu } from './nav-menu';

const NavItems: React.FC = () => {
  const closeNavMenu = useCloseNavMenu();

  return (
    <div className="flex flex-col">
      {heroLinks.map((link) => {
        if (link.scroll) {
          return (
            <Scroll
              key={link.href}
              smooth
              spy
              className="cursor-pointer border-b border-neutral-800 px-7 py-5 font-semibold text-white hover:bg-white/5 lg:text-lg"
              duration={700}
              offset={-100}
              to={link.href}
              onClick={closeNavMenu}
            >
              {link.label}
            </Scroll>
          );
        }
        return (
          <Link
            key={link.href}
            className="border-b border-neutral-800 px-7 py-5 font-semibold text-white hover:bg-white/5 lg:text-lg"
            href={link.href}
            rel={link.external ? 'noopener noreferrer' : ''}
            target={link.external ? '_blank' : ''}
            onClick={closeNavMenu}
          >
            {link.label}
          </Link>
        );
      })}
    </div>
  );
};

export default NavItems;
