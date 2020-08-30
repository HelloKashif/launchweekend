import Link from "next/link";

const ProjectCard = (props) => {
  const { project } = props;
  return (
    <div className="w-full h-32 bg-gray-600 shadow-md hover:shadow-lg transition duration-150 px-4 py-3 rounded-sm flex flex-col items-center">
      <Link href={`/projects/${project.id}`}>
        <a className="w-full">
          <div className="w-full h-full flex flex-col">
            <h5 className="text-md font-medium text-gray-100">
              {project.name}
            </h5>
            <div className="flex items-center justify-between">
              <span className="flex items-center text-gray-300 text-sm font-medium">
                <svg
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 text-gray-300 mr-1"
                >
                  <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"></path>
                </svg>
                {project.votes}
              </span>
              <div className="flex items-center">
                {project.photoURL ? (
                  <img
                    src={project.photoURL}
                    className="w-8 h-8 rounded-full border-2 border-gray-500"
                  />
                ) : (
                  <svg
                    className="my-auto border-2 rounded-full p-1 border-gray-500 h-8 w-8 text-gray-600"
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
                  <span className="ml-2 text-sm text-gray-200">
                    {project.username}
                  </span>
                )}
              </div>
            </div>
          </div>
        </a>
      </Link>
      <div className="w-full flex-1 flex items-end justify-between">
        <div>
          <Link href={`/projects/${project.id}`}>
            <a className="text-sm text-gray-200 border-b-2 border-transparent py-1 hover:text-white hover:border-gray-400 font-medium leading-none inline-block">
              View Details
            </a>
          </Link>
        </div>
        {project.streamingLive && project.streamLink && (
          <Link href={project.streamLink}>
            <a
              target="_blank"
              className="text-xs uppercase tracking-wide border hover:bg-transparent border-red-500 font-medium bg-red-500 rounded-full px-3 py-1 leading-none inline-block text-white"
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
