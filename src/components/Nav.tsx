"use client";

import { ConnectKitButton } from "connectkit";

const Nav = () => {
  return (
    <nav className="px-4 py-2 flex flex-row justify-between">
      <div className="flex flex-row space-x-2">
        <a href="/">Home</a>
        <a href="/ideas">Ideas</a>
        <a href="/delegate">Delegate</a>
      </div>
      <div className="flex flex-row items-center space-x-2">
        <a href="/">Documentation</a>
        <ConnectKitButton />
      </div>
    </nav>
  );
};

export default Nav;
