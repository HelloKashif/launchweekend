import Head from "next/head";
import Link from "next/link";
import Countdown from "../components/countdown";
import ProjectCard from "../components/project-card-2";
import { useProjects } from "../hooks/db";

const RecentProjects = (props) => {
  const projects = useProjects({ limit: 5 });
  return (
    <div>
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-light">What people are working on</h3>
        <Link href="/projects">
          <a className="border-b-2 hover:border-white hover:text-white text-gray-200 text-sm font-medium transition duration-150 border-gray-600 px-2 py-1">
            View All Projects
          </a>
        </Link>
      </div>
      <ul className="mt-4 grid  grid-cols-1 justify-center sm:grid-cols-2 lg:grid-cols-3 col-gap-6 row-gap-2">
        {projects.map((item) => {
          return (
            <li key={item.id} className="">
              <ProjectCard project={item} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const config = {
  title: "Launch Weekend",
  description: `
          Launch Weekend is a monthly hackathon where your build something on
          your own and release it in public within 48 hours.
    `,
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
        <h1 className="text-5xl sm:text-7xl leading-9 text-white sm:text-center font-bold sm:font-black">
          {config.title}
        </h1>
        <p className="mt-10 text-lg sm:text-xl sm:text-center max-w-xl mx-auto">
          {config.description}
        </p>
        <div className="px-1 sm:px-0 my-8 mx-auto flex flex-col sm:items-center">
          <span className="uppercase tracking-wide">
            Current Event Ending In
          </span>
          <Countdown endDate={endDate} />
        </div>
        <section className="max-w-3xl mx-auto my-8">
          <RecentProjects />
        </section>
      </main>
    </div>
  );
}
