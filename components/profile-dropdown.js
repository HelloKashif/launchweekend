import React from "react";
import firebase from "../lib/firebase";
import useOnClickOutside from "../hooks/onclick-outside";
import Link from "next/link";
import { useRouter } from "next/router";

const Dropdown = (props) => {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef();
  const router = useRouter();
  useOnClickOutside(ref, () => setOpen(false));

  //Auto close dropdown while navigating
  React.useEffect(() => {
    !open && setOpen(false);
  }, [open]);

  const handleLogout = (e) => {
    firebase.auth().signOut();
    router.push("/");
  };

  const user = firebase.auth().currentUser;

  if (!user) return null;

  return (
    <div ref={ref} className="relative">
      <div>
        <span className="rounded-md">
          <button
            aria-label="Toggle Dropdown"
            onClick={() => setOpen(!open)}
            type="button"
            className="inline-flex justify-center h-8 w-8 rounded-full overflow-hidden shadow-solid text-gray-600 hover:text-gray-800 focus:outline-none border-gray-600 focus:border-white focus:shadow-outline active:text-gray-900 transition ease-in-out duration-150"
          >
            {user.photoURL ? (
              <img
                className="inline-block h-full w-full text-white"
                width="24"
                height="24"
                src={user.photoURL}
                alt=""
              />
            ) : (
              <svg
                className="my-auto h-5 w-5 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            )}
          </button>
        </span>
      </div>

      {open && (
        <div className="origin-top-right z-20 absolute overflow-hidden right-0 text-sm text-gray-500 hover:text-gray-900 w-48 rounded shadow-2xl">
          <div className="rounded text-white bg-gray-700 shadow-xs overflow-hidden">
            <div className="bg-gray-600 rounded">
              <p className="px-4 py-3 text-xs">
                Logged in as:
                <br />
                <strong className="font-medium">{user.email} </strong>
              </p>
            </div>
            <div className="sm:hidden border-t border-gray-500" />
            <div className="sm:hidden ">
              <Link href="/projects/create">
                <a
                  onClick={() => setOpen(false)}
                  className="group flex items-center space-x-2 block w-full text-left px-4 py-3 leading-5 hover:bg-gray-100 hover:text-gray-900 focus:outline-none font-medium focus:bg-gray-100 focus:text-gray-900"
                >
                  <span className="">Create a Project</span>
                </a>
              </Link>
            </div>
            <div className="sm:hidden border-t border-gray-500" />
            <div className="sm:hidden ">
              <Link href="/faq">
                <a
                  onClick={() => setOpen(false)}
                  className="group flex items-center space-x-2 block w-full text-left px-4 py-3 leading-5 hover:bg-gray-100 hover:text-gray-900 focus:outline-none font-medium focus:bg-gray-100 focus:text-gray-900"
                >
                  <span className="">FAQs</span>
                </a>
              </Link>
            </div>
            <div className="sm:hidden border-t border-gray-500" />
            <div className="sm:hidden ">
              <Link href="/projects">
                <a
                  onClick={() => setOpen(false)}
                  className="group flex items-center space-x-2 block w-full text-left px-4 py-3 leading-5 hover:bg-gray-100 hover:text-gray-900 focus:outline-none font-medium focus:bg-gray-100 focus:text-gray-900"
                >
                  <span className="">All Projects</span>
                </a>
              </Link>
            </div>
            <div className="border-t border-gray-500" />
            <div className="">
              <Link href="/myprojects">
                <a
                  onClick={() => setOpen(false)}
                  className="group flex items-center space-x-2 block w-full text-left px-4 py-3 leading-5 hover:bg-gray-100 hover:text-gray-900 focus:outline-none font-medium focus:bg-gray-100 focus:text-gray-900"
                >
                  <span className="">My Projects</span>
                </a>
              </Link>
            </div>
            <div className="border-t border-gray-500" />
            <div className="">
              <button
                onClick={handleLogout}
                className="group flex items-center space-x-2 block w-full text-left px-4 py-3 leading-5 hover:bg-gray-100 hover:text-gray-900 focus:outline-none font-medium focus:bg-gray-100 focus:text-gray-900"
              >
                <span className="">Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Dropdown;
