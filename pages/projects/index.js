import ProjectList from "../../components/projects";
import Link from "next/link";

const Projects = (props) => {
  return (
    <div>
      <Link href="/projects/create">
        <a className="hover:bg-white hover:text-gray-900 transition duration-150 border border-white rounded-sm text-sm leading-none pl-3 pr-4 py-1">
          + New Project
        </a>
      </Link>
      <div className="max-w-6xl mx-auto">
        <h2 className="font-bold text-2xl text-center">Current Projects</h2>
        <div className="my-4">
          <ProjectList />
        </div>
      </div>
    </div>
  );
};

export default Projects;
