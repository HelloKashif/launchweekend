import Head from "next/head";
import Link from "next/link";

import { formatDuration, intervalToDuration } from "date-fns";

const faqs = [
  {
    q: "Is this event a monthly thing?",
    a: "Yes, this event occurs on the last weekend of the month @01:00am UTC",
  },
  {
    q: "Do I always have to work on a Startup?",
    a:
      "No, you can work on any tech project like open source library, any learning activity, startup idea, proof of concept etc. The only requirement is that you must release something in public within 48hrs.",
  },
  {
    q: "Can I get help if I get stuck?",
    a:
      "Yes, ofcourse, If you have any technical question we can arrange a call/chat and help you.",
  },
  {
    q: "Do we release the project within 48hrs or after 48hr?",
    a: "Within.",
  },
  {
    q: "Does the project need to be 100% complete while releasing",
    a:
      "No. As long as it is kinda usable and communicates the message of the product to the user its fine.",
  },
];

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
  const [countdown, setCountdown] = React.useState(null);

  //
  return (
    <div className="">
      <Head>
        <title>Launch Weekend</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="">
        <h1 className="text-2xl sm:text-6xl text-white sm:text-center font-bold sm:font-black">
          Launch Weekend Hackathon
        </h1>
        {countdown && (
          <div className="my-4 flex flex-col sm:items-center">
            <span className="uppercase tracking-wide">Ending In</span>
            <span className="text-lg sm:text-2xl font-bold text-gray-900 px-3 py-1 inline-block rounded-sm bg-white">
              {countdown}
            </span>
          </div>
        )}

        <p className="text-xl sm:text-center max-w-xl mx-auto">
          Launch Weekend is a monthly hackathon where your build something on
          your own and release it in public within 48 hours.
        </p>
        <section className="flex-center my-8">
          <Link className="" href="/projects">
            <a className="border hover:border-white hover:bg-white hover:text-gray-900 rounded-sm text-sm font-medium transition duration-150 border-gray-600 px-4 py-2">
              View Active Projects
            </a>
          </Link>
        </section>
        <section className="mt-4 flex flex-col items-center">
          <h3 className="mb-3 font-light text-3xl">
            Frequently Asked Questions
          </h3>
          <ul className="space-y-5 max-w-2xl">
            {faqs.map((qa, i) => (
              <li key={i} className="py-4 border-b border-gray-700 px-3">
                <h4 className="text-lg">{qa.q}</h4>
                <p className="text-gray-400">{qa.a}</p>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
