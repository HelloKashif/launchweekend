import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Footer = (props) => {
  const router = useRouter();

  return (
    <footer className="w-full flex flex-col items-center border-t border-gray-700 mt-10 pt-4 pb-10">
      <span className="text-gray-300 text-sm">Created by Kashif Siddiqui</span>
      <div className="flex py-2 items-center justify-center space-x-2">
        <a
          target="_blank"
          href="https://twitter.com/HelloKashif"
          className="font-medium border-b-2 border-gray-500 hover:border-gray-100 px-1 py-1 inline-block"
        >
          Twitter
        </a>
        <a
          target="_blank"
          href="https://github.com/HelloKashif"
          className="font-medium border-b-2 border-gray-500 hover:border-gray-100 px-1 py-1 inline-block"
        >
          GitHub
        </a>
        <a
          target="_blank"
          href="https://twitch.tv/HelloKashif"
          className="font-medium border-b-2 border-gray-500 hover:border-gray-100 px-1 py-1 inline-block"
        >
          Twitch
        </a>
      </div>
    </footer>
  );
};
export default Footer;
