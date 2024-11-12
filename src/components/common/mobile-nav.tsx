"use client";

import MenuUser from "./menu-user";
import Menu from "./menu";
import { useCloseNavMenu } from "./nav-menu";

export default function MobileNav() {
  const closeNavMenu = useCloseNavMenu();

  return (
    <>
      <MenuUser />
      <Menu
        onClick={() => {
          closeNavMenu();
        }}
      />
    </>
  );
}
