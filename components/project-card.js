import Link from "next/link";

const ProjectCard = (props) => {
  const { project } = props;
  return (
    <div className="w-full h-32 bg-white shadow-md hover:shadow-lg transition duration-150 px-4 py-3 rounded-sm flex flex-col items-center">
      <Link href={`/projects/${project.id}`}>
        <a className="w-full hover:underline">
          <div className="w-full h-full flex flex-col">
            <h5 className="text-md font-medium text-gray-900">
              {project.name}
            </h5>
            <span className="text-sm font-medium text-gray-600">
              {project.userId}
            </span>
          </div>
        </a>
      </Link>
      <div className="w-full flex-1 flex items-end justify-between">
        <div>
          <Link href={`/projects/${project.id}`}>
            <a className="text-sm text-gray-500 border-b-2 border-transparent py-1 hover:text-black hover:border-gray-400 font-medium leading-none inline-block">
              View Details
            </a>
          </Link>
        </div>
        {project.streamingLive && project.streamLink && (
          <Link href={project.streamLink}>
            <a
              target="_blank"
              className="text-xs uppercase tracking-wide hover:text-red-500 hover:bg-white border border-red-500 font-medium bg-red-500 rounded-full px-3 py-1 leading-none inline-block text-white"
            >
              View LIVE
            </a>
          </Link>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
