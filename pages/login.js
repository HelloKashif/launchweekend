import React from "react";
import Link from "next/link";
import googleLogo from "../images/google-logo.svg";
import router from "next/router";
import firebase from "../lib/firebase";

const Login = (props) => {
  const [loading, setLoading] = React.useState(true);
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleLogin = (prov) => {
    let provider;

    switch (prov) {
      case "google":
        provider = new firebase.auth.GoogleAuthProvider();
        //Prevents auto selecting the default account if user already signed in with only single google account
        provider.setCustomParameters({ prompt: "select_account" });
        break;
      case "github":
        provider = new firebase.auth.GithubAuthProvider();
        break;
      case "twitter":
        provider = new firebase.auth.TwitterAuthProvider();
        break;
      case "facebook":
        provider = new firebase.auth.FacebookAuthProvider();
        break;
      default:
        break;
    }

    firebase
      .auth()
      .signInWithPopup(provider)
      .then((user) => {
        router.push("/");
      })
      .catch((err) => {
        //@Todo handle error
      });
  };
  //@Todo social icons

  return (
    <div className="fixed inset-0 min-h-screen flex-center bg-gray-900 text-white">
      <div className="max-w-lg w-full py-12 px-6">
        <Link href="/">
          <a>
            <h4 className="text-center text-3xl font-bold">
              Launch Weekend Hackathon
            </h4>
          </a>
        </Link>
        <p className="mt-6 text-sm leading-5 text-center text-gray-100">
          Log in or create your account
        </p>
        <div className="mt-6">
          <button
            onClick={() => handleLogin("google")}
            className="flex justify-center items-center w-full text-center py-2 px-4 border border-gray-300 rounded-md font-medium hover:border-gray-800 focus:shadow-outline focus:outline-none focus:border-gray-400 sm:text-sm hover:bg-white hover:text-gray-900 bg-white text-gray-900 sm:leading-5 transform duration-100 scale-100 active:scale-95"
          >
            <img alt="Google" className="w-6 h-6" src={googleLogo} />
            <span className="ml-2">Log In with Google</span>
          </button>
        </div>
        {false && (
          <>
            <div className="mt-3">
              <button
                onClick={() => handleLogin("github")}
                className="flex justify-center items-center w-full text-center py-2 px-4 border border-gray-300 rounded-md font-medium hover:border-gray-800 focus:shadow-outline focus:outline-none focus:border-gray-400 sm:text-sm hover:bg-white hover:text-gray-900 bg-white text-gray-900 sm:leading-5 transform duration-100 scale-100 active:scale-95"
              >
                <span className="ml-2">Log In with Github</span>
              </button>
            </div>
            <div className="mt-3">
              <button
                onClick={() => handleLogin("twitter")}
                className="flex justify-center items-center w-full text-center py-2 px-4 border border-gray-300 rounded-md font-medium hover:border-gray-800 focus:shadow-outline focus:outline-none focus:border-gray-400 sm:text-sm hover:bg-white hover:text-gray-900 bg-white text-gray-900 sm:leading-5 transform duration-100 scale-100 active:scale-95"
              >
                <span className="ml-2">Log In with Twitter</span>
              </button>
            </div>
            <div className="mt-3">
              <button
                onClick={() => handleLogin("facebook")}
                className="flex justify-center items-center w-full text-center py-2 px-4 border border-gray-300 rounded-md font-medium hover:border-gray-800 focus:shadow-outline focus:outline-none focus:border-gray-400 sm:text-sm hover:bg-white hover:text-gray-900 bg-white text-gray-900 sm:leading-5 transform duration-100 scale-100 active:scale-95"
              >
                <span className="ml-2">Log In with Facebook</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
