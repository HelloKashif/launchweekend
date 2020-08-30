import Head from "next/head";
import Link from "next/link";

import { formatDuration, intervalToDuration } from "date-fns";

const makeTimer = () => {
  const duration = intervalToDuration({
    start: new Date(),
    end: new Date("August 31, 2020 01:00:00 GMT+00:00"),
  });
  return formatDuration(duration);
};

export default function Home() {
  React.useEffect(() => {
    setInterval(() => {
      setCountdown(makeTimer());
    }, 1000);
  }, []);
  const [countdown, setCountdown] = React.useState(makeTimer());

  //
  return (
    <div className="">
      <Head>
        <title>Launch Weekend</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="mt-12 px-2 sm:px-0">
        <h1 className="text-5xl sm:text-6xl leading-9 text-white sm:text-center font-bold sm:font-black">
          Launch Weekend <br />
          <span className="font-medium text-2xl sm:text-3xl">Hackathon</span>
        </h1>
        <p className="mt-2 text-lg sm:text-xl sm:text-center max-w-xl mx-auto">
          Launch Weekend is a monthly hackathon where your build something on
          your own and release it in public within 48 hours.
        </p>
        {countdown && (
          <div className="px-1 sm:px-0 my-8 max-w-xl mx-auto flex flex-col sm:items-center">
            <span className="uppercase tracking-wide">
              Current Event Ending In
            </span>
            <span className="text-lg sm:text-2xl w-full text-center font-bold text-gray-900 px-6 py-3 inline-block rounded-sm bg-white">
              {countdown}
            </span>
          </div>
        )}

        <section className="flex-center my-8">
          <Link className="" href="/projects">
            <a className="border hover:border-white hover:bg-white hover:text-gray-900 rounded-sm text-sm font-medium transition duration-150 border-gray-600 px-4 py-2">
              View Active Projects
            </a>
          </Link>
        </section>
      </main>
    </div>
  );
}
