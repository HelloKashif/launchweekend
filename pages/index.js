import Head from "next/head";
import Link from "next/link";

import { formatDuration, intervalToDuration, format } from "date-fns";

const Countdown = (props) => {
  const { endDate } = props;
  const [duration, setDuration] = React.useState(makeDuration(endDate));
  React.useEffect(() => {
    const timer = setInterval(() => {
      setDuration(makeDuration(endDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [endDate]);
  return (
    <div className="text-lg sm:text-2xl text-center font-bold text-gray-900 px-6 py-3 inline-block rounded-sm bg-white">
      <div className="flex justify-center space-x-2">
        {duration.years > 0 && (
          <section className="w-36 px-6 bg-gray-100 rounded py-3 flex flex-col items-center">
            <span className="text-6xl leading-none font-black">
              {duration.years}
            </span>
            <span className="font-semibold text-gray-700 uppercase tracking-wide text-base">
              years
            </span>
          </section>
        )}
        {duration.months > 0 && (
          <section className="w-36 px-6 bg-gray-100 rounded py-3 flex flex-col items-center">
            <span className="text-6xl leading-none font-black">
              {duration.months}
            </span>
            <span className="font-semibold text-gray-700 uppercase tracking-wide text-base">
              months
            </span>
          </section>
        )}
        {duration.days > 0 && (
          <section className="w-36 px-6 bg-gray-100 rounded py-3 flex flex-col items-center">
            <span className="text-6xl leading-none font-black">
              {duration.days}
            </span>
            <span className="font-semibold text-gray-700 uppercase tracking-wide text-base">
              days
            </span>
          </section>
        )}
        {duration.hours > 0 && (
          <section className="w-36 px-6 bg-gray-100 rounded py-3 flex flex-col items-center">
            <span className="text-6xl leading-none font-black">
              {duration.hours}
            </span>
            <span className="font-semibold text-gray-700 uppercase tracking-wide text-base">
              hours
            </span>
          </section>
        )}
        {duration.minutes > 0 && (
          <section className="w-36 px-6 bg-gray-100 rounded py-3 flex flex-col items-center">
            <span className="text-6xl leading-none font-black">
              {duration.minutes}
            </span>
            <span className="font-semibold text-gray-700 uppercase tracking-wide text-base">
              minutes
            </span>
          </section>
        )}
        {duration.days < 1 && duration.seconds > 0 && (
          <section className="w-36 px-6 bg-gray-100 rounded py-3 flex flex-col items-center">
            <span className="text-6xl leading-none font-black">
              {duration.seconds}
            </span>
            <span className="font-semibold text-gray-700 uppercase tracking-wide text-base">
              seconds
            </span>
          </section>
        )}
      </div>
      <span className="text-sm italic font-normal">
        Ends {format(endDate, "PPPppp")}
      </span>
    </div>
  );
};

const makeDuration = (endDate) => {
  const duration = intervalToDuration({
    start: new Date(),
    end: endDate,
  });
  return duration;
};

export default function Home() {
  //@Todo past date messes up the countdown, fix it
  const endDate = new Date("August 31, 2020 01:00:00 GMT+00:00");
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
        <p className="mt-6 text-lg sm:text-xl sm:text-center max-w-xl mx-auto">
          Launch Weekend is a monthly hackathon where your build something on
          your own and release it in public within 48 hours.
        </p>
        <div className="px-1 sm:px-0 my-8 mx-auto flex flex-col sm:items-center">
          <span className="uppercase tracking-wide">
            Current Event Ending In
          </span>
          <Countdown endDate={endDate} />
        </div>

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
