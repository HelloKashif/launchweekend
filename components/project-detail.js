const ProjectDetails = (props) => {
  const { project } = props;
  if (!project) return null;
  return (
    <div className="mt-4">
      <h2 className="text-xl sm:text-3xl">{project.name}</h2>
      <section className="my-2 w-full text-white bg-gray-700 px-3 py-2 rounded-sm">
        <p>{project.description}</p>
      </section>
      <div>
        <div className="my-3 sm:flex justify-end items-center">
          {project.streamingLive && project.streamLink && (
            <span className="inline-block my-2 sm:my-0 flex-1">
              Streaming Live at
              <a
                className="ml-2 py-0 text-sm border-b-2 border-gray-600 hover:border-blue-400 text-blue-400"
                target="_blank"
                href={project.streamLink}
              >
                {project.streamLink}
              </a>
            </span>
          )}
          <div className="my-4 sm:my-0 flex items-center">
            <img
              src={project.photoURL}
              className="w-10 h-10 rounded-full border-2 border-gray-400"
            />
            <span className="ml-2 sm:text-lg">{project.username}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
