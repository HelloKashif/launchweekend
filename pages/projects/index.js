import { useProjects } from "../../hooks/db";
import ProjectCard from "../../components/project-card";
import Link from "next/link";

const Projects = (props) => {
  const [filterLive, setFilterLive] = React.useState(false);
  const projects = useProjects({ filterLive });
  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="font-bold text-2xl text-center">Current Projects</h2>
      <div className="py-2 flex justify-end px-4">
        <label className="flex items-center">
          <input
            onChange={(e) => setFilterLive(e.target.checked)}
            checked={filterLive}
            type="checkbox"
            className="form-checkbox w-5 h-5 mr-1"
          />
          <span className="inline-block leading-none text-gray-300">
            Show only live streams
          </span>
        </label>
      </div>
      <div className="my-4">
        <ul className="flex flex-col items-center">
          {projects.map((item) => {
            return (
              <li key={item.id} className="mb-3 max-w-xl w-full">
                <ProjectCard project={item} />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Projects;
