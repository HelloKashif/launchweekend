import Link from "next/link";

const ProjectCard = (props) => {
  const { project } = props;
  return (
    <Link href={`/projects/${project.id}`}>
      <a className="w-full h-32 bg-white shadow-md hover:shadow-lg transition duration-150 px-4 py-3 rounded-sm flex flex-col items-center">
        <div className="w-full">
          <h5 className="text-md font-medium text-gray-900">{project.name}</h5>
          <span className="text-sm font-medium text-gray-600">
            {project.user}
          </span>
        </div>
      </a>
    </Link>
  );
};

export default ProjectCard;
