import ProjectList from "../../components/projects";
import Link from "next/link";

const Projects = (props) => {
  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="font-bold text-2xl text-center">Current Projects</h2>
      <div className="my-4">
        <ProjectList />
      </div>
    </div>
  );
};

export default Projects;
