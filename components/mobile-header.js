import Link from "next/link";
import React from "react";
import useAuth from "../hooks/auth";
import firebase from "../lib/firebase";
import { useRouter } from "next/router";

const Header = (props) => {
  const [open, setOpen] = React.useState(false);
  const user = useAuth();

  const closeHeader = () => setOpen(false);
  const handleLogout = (e) => {
    firebase.auth().signOut();
    router.push("/");
  };

  return (
    <header className="sm:hidden px-2 py-2">
      <div className="flex items-center justify-between">
        <Link href="/">
          <a className="font-black text-xl hover:bg-white hover:text-gray-900 pl-2 pr-3 py-0 inline-block rounded-sm">
            Launch Weekend
          </a>
        </Link>
        <button className="p-1" onClick={() => setOpen(!open)}>
          <svg
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="menu-alt1 w-6 h-6"
          >
            <path
              className={`${
                open ? "opacity-0" : "opacity-100"
              } transition duration-150`}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h8m-8 6h16"
            ></path>

            <path
              className={`${
                open ? "opacity-100" : "opacity-0"
              } transition duration-150`}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>
      {open && (
        <div className="bg-gray-700">
          <Link href="/projects">
            <a
              onClick={closeHeader}
              className="block border-b border-gray-600 text-center font-medium text-gray-200 py-2"
            >
              Projects
            </a>
          </Link>
          <Link href="/faq">
            <a
              onClick={closeHeader}
              className="block border-b  border-gray-600 text-center font-medium text-gray-200 py-2"
            >
              FAQ
            </a>
          </Link>
          {user ? (
            <>
              <Link href="/projects/create">
                <a
                  onClick={closeHeader}
                  className="block border-b  border-gray-600 text-center font-medium text-gray-200 py-2"
                >
                  + New Project
                </a>
              </Link>
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center border-b border-gray-600 text-center font-medium text-gray-200 py-2"
              >
                Logout
              </button>
            </>
          ) : (
            <Link href="/login">
              <a
                onClick={closeHeader}
                className="block border-b  border-gray-600 text-center font-medium text-gray-200 py-2"
              >
                Login
              </a>
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
