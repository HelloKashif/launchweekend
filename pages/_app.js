import "../styles/globals.css";
import firebase from "../lib/firebase";
import Header from "../components/header";

function MyApp({ Component, pageProps }) {
  return (
    <div className="bg-gray-900 text-white w-full min-h-screen">
      <Header />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
