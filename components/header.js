import React from "react";
import Link from "next/link";
import ProfileDropdown from "../components/profile-dropdown";
import useAuth from "../hooks/auth";
import { useRouter } from "next/router";
import * as firebase from "firebase/app";

const Header = (props) => {
  const router = useRouter();
  const user = useAuth();

  return (
    <header className="mx-auto max-w-6xl flex items-center justify-between px-4 py-2">
      <div
        className={`${
          router.pathname === "/" ? "opacity-0 pointer-events-none" : ""
        }`}
      >
        <Link href="/">
          <a className="font-semibold hover:bg-white hover:text-gray-900 px-3 py-0 inline-block rounded-sm">
            Launch Weekend
          </a>
        </Link>
      </div>
      {user ? (
        <div className="flex justify-end items-center space-x-4">
          <Link href="/myprojects">
            <a className="hover:bg-gray-600 px-3 rounded inline-block">
              My Projects
            </a>
          </Link>
          <Link href="/projects/create">
            <a className="hover:bg-gray-600 px-3 rounded inline-block">
              New Project
            </a>
          </Link>
          <ProfileDropdown />
        </div>
      ) : (
        <div>
          <Link href="/login">
            <a className="inline-block border hover:bg-white hover:text-gray-900 transition duration-150 rounded text-sm leading-none px-4 py-2 font-medium">
              Login
            </a>
          </Link>
        </div>
      )}
    </header>
  );
};
export default Header;
