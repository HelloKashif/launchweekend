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
            <div className="flex items-center justify-end">
              {project.photoURL ? (
                <img
                  src={project.photoURL}
                  className="w-8 h-8 rounded-full border-2 border-gray-500"
                />
              ) : (
                <svg
                  className="my-auto border-2 rounded-full p-1 border-gray-500 h-8 w-8 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              )}
              {project.username && (
                <span className="ml-2 text-sm text-gray-800">
                  {project.username}
                </span>
              )}
            </div>
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
