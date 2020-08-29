import React from "react";

export default (props) => {
  const { open } = props;

  return (
    <div
      className={`${
        open ? "opacity-100" : "pointer-events-none opacity-0"
      } transition duration-100 fixed z-50 w-full h-full top-0 left-0 flex items-center justify-center`}
    >
      <div className="absolute w-full h-full bg-gray-900 opacity-50" />
      <div className="bg-white w-11/12 md:max-w-lg mx-auto rounded shadow-lg px-6 py-2 z-50 overflow-y-auto">
        {open && <div>{props.children}</div>}
      </div>
    </div>
  );
};
