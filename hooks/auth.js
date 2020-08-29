import React from "react";
import firebase from "../lib/firebase";

const useAuth = (props) => {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    return firebase.auth().onAuthStateChanged((user) => setUser(user));
  }, []);

  return user;
};

export default useAuth;
