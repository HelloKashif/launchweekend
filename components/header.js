import React from "react";
import Link from "next/link";
import * as firebase from "firebase/app";

export default (props) => {
  const [user, setUser] = React.useState(null);
  React.useEffect(() => {
    //@Todo cleanup destryo
    firebase.auth().onAuthStateChanged(function (user) {
      setUser(user);
    });
  }, []);

  const handleLogout = (e) => {
    firebase
      .auth()
      .signOut()
      .then(function () {
        setUser(null);
      })
      .catch(function (error) {
        //@Todo handle error
      });
  };

  return (
    <header className="w-full px-3 py-2">
      <div className="flex items-center justify-end">
        {user ? (
          <div className="flex justify-end items-center">
            <h4 className="px-3 ">{user.displayName}</h4>

            <button
              onClick={handleLogout}
              className="border rounded-md px-4 py-2 leading-none font-medium"
            >
              Logout
            </button>
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
