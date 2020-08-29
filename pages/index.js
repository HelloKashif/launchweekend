import Head from "next/head";
import * as firebase from "firebase/app";
import Header from "../components/header";
// import "firebase/analytics";

import "firebase/auth";
import { formatDuration, intervalToDuration } from "date-fns";

//@Todo move these to env config
const firebaseConfig = {
  apiKey: "AIzaSyCQoC9JdXkIebNByakzgm_Gkm8XJu4oZxU",
  authDomain: "launch-weekend.firebaseapp.com",
  databaseURL: "https://launch-weekend.firebaseio.com",
  projectId: "launch-weekend",
  storageBucket: "launch-weekend.appspot.com",
  messagingSenderId: "57970499778",
  appId: "1:57970499778:web:9838ba27a93fdd3b9fdb5b",
  measurementId: "G-GTGTF1N1GX",
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  // firebase.analytics(); //@Todo do we need this?
}

export default function Home() {
  React.useEffect(() => {
    setInterval(() => {
      const duration = intervalToDuration({
        start: new Date(),
        end: new Date("August 31, 2020 01:00:00 GMT+00:00"),
      });
      setCountdown(formatDuration(duration));
    }, 1000);
  }, []);
  const [countdown, setCountdown] = React.useState(0);

  //
  return (
    <div className="">
      <Head>
        <title>Launch Weekend</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <main className="">
        <h1 className="text-5xl text-blue-600 text-center font-bold">
          Launch Weekend Hackathon
        </h1>
        <div className="flex flex-col items-center">
          <span className="text-2xl font-bold">Ending in {countdown}</span>
        </div>

        <p className="text-xl text-center max-w-xl mx-auto">
          Launch Weekend is a monthly hackathon where your build something on
          your own and release it in public within 48 hours.
        </p>
        <section>
          <h3 className="">FAQs</h3>
          <ul>
            <li>Question 1</li>
          </ul>
        </section>
      </main>
    </div>
  );
}