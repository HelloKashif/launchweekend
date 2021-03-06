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
    <header className="hidden sm:flex mx-auto max-w-6xl w-full items-center justify-between px-4 py-2">
      <div>
        <Link href="/">
          <a className="font-semibold hover:bg-white hover:text-gray-900 px-3 py-0 inline-block rounded-sm">
            Launch Weekend
          </a>
        </Link>
        <Link href="/projects">
          <a className="hidden sm:inline-block uppercase tracking-wide text-sm font-semibold hover:bg-white hover:text-gray-900 text-gray-400 px-3 py-0 inline-block rounded-sm">
            Projects
          </a>
        </Link>
      </div>
      <div className="flex items-center space-x-2">
          <Link href="/faq">
            <a className="hover:bg-gray-600 px-3 rounded inline-block">
              FAQ
            </a>
          </Link>
          {user ? (
            <div className="flex justify-end items-center space-x-4">
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
        </div>
    </header>
  );
};
export default Header;
