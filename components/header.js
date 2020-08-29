import React from "react";
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

  const handleSignup = (e) => {
    e.preventDefault();
    signup();
  };

  const signup = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        setUser(result.user);
      })
      .catch(function (error) {
        //@TOdo handle errors
        console.log(error);
      });
  };
  return (
    <div>
      {user ? (
        <div>
          <h4>{user.displayName}</h4>

          <button
            onClick={handleLogout}
            className="border rounded px-4 py-2 leading-none font-medium"
          >
            Logout
          </button>
        </div>
      ) : (
        <div>
          <form onSubmit={handleSignup}>
            <button className="border rounded px-4 py-2 leading-none font-medium">
              Signup with Google
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
