import "../styles/globals.css";
import firebase from "../lib/firebase";
import NProgress from "../components/npprogress";
import Header from "../components/header";
import MobileHeader from "../components/mobile-header";
import Footer from "../components/footer";

function MyApp({ Component, pageProps }) {
  return (
    <div className="bg-gray-900 text-white w-full min-h-screen flex flex-col">
      <NProgress />
      <Header />
      <MobileHeader />
      <div className="flex-1">
        <Component {...pageProps} />
      </div>
      <Footer />
    </div>
  );
}

export default MyApp;
