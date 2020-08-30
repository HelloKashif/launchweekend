import Link from "next/link";

//This is the v2 squarish card
const ProjectCard = (props) => {
  const { project } = props;
  return (
    <div className="max-w-sm mx-auto sm:w-full lg:w-64 h-32 text-gray-100 hover:bg-gray-700 bg-gray-600 px-4 py-3 rounded-sm flex flex-col items-center">
      <Link href={`/projects/${project.id}`}>
        <a className="w-full h-full">
          <div className="w-full h-full flex flex-col">
            <h5 className="text-md font-medium text-gray-100">
              {project.name}
            </h5>
            <div className="mt-auto flex items-center justify-end">
              {project.photoURL ? (
                <img
                  src={project.photoURL}
                  className="w-8 h-8 rounded-full border-2 border-gray-700"
                />
              ) : (
                <svg
                  className="my-auto border-2 rounded-full p-1 border-gray-500 h-8 w-8 text-gray-200"
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
        </a>
      </Link>
    </div>
  );
};

export default ProjectCard;
