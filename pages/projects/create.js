import Link from "next/link";
import { useRouter } from "next/router";
import db from "../../lib/db";

export const Spinner = (props) => {
  return (
    <div className="flex-center">
      <svg
        className={`spin ${props.className || "h-6 w-6"}`}
        viewBox="0 0 24 24"
      >
        <path
          className="text-gray-600"
          fill="currentColor"
          d="M12 21a9 9 0 100-18 9 9 0 000 18zm0-2a7 7 0 110-14 7 7 0 010 14z"
        />
        <path
          className="text-gray-400"
          fill="currentColor"
          d="M12 3a9 9 0 010 18v-2a7 7 0 000-14V3z"
        />
      </svg>
    </div>
  );
};

const CreateProject = (props) => {
  const router = useRouter();
  const [streamingLive, setStreamingLive] = React.useState(true);
  const [description, setDescription] = React.useState("");
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [name, setName] = React.useState("");
  const [streamLink, setStreamLink] = React.useState("");
  const handleStreamLinkChange = (e) => setStreamLink(e.target.value);
  const handleDescChange = (e) => setDescription(e.target.value);
  const handleNameChange = (e) => setName(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      setLoading(true);
      const project = await db.createProject({
        name,
        description,
        streamLink,
        streamingLive,
      });
      router.push(`/projects/${project.id}`);
    } catch (err) {
      setError(err.message);
      //@Todo handle error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Link href="/projects">
        <a className="transition duration-150 border-b border-gray-600 hover:border-gray-200 rounded-sm text-sm leading-none pl-3 pr-4 py-1">
          {"<"} Back to Projects
        </a>
      </Link>
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
        <h2 className="font-bold text-2xl text-center">Create a New Project</h2>
        <section className="flex flex-col max-w-md mx-auto mt-2">
          <label htmlFor="name" className="my-1 text-gray-300">
            Project Name
          </label>
          <input
            name="name"
            value={name}
            onChange={handleNameChange}
            className="form-input text-gray-900"
            placeholder="Project Name"
          />
        </section>
        <section className="flex flex-col max-w-md mx-auto mt-2">
          <label htmlFor="description" className="my-1 text-gray-300">
            Description
          </label>
          <textarea
            name="description"
            value={description}
            onChange={handleDescChange}
            className="form-textarea h-32 text-gray-900"
          />
        </section>
        <section className="flex max-w-md mx-auto mt-2">
          <label className="my-1 flex items-center text-gray-300">
            <input
              checked={streamingLive}
              onChange={(e) => setStreamingLive(e.target.checked)}
              type="checkbox"
              className="form-checkbox mr-2 w-5 h-5"
            />
            Are You Streaming Live?
          </label>
        </section>
        {streamingLive && (
          <section className="flex flex-col max-w-md mx-auto mt-2">
            <label name="streamLink" className="my-1 text-gray-300">
              Livestream Link
            </label>
            <input
              value={streamLink}
              name="streamLink"
              type="url"
              onChange={handleStreamLinkChange}
              className="form-input text-gray-900"
              placeholder="https://twitch.tv/yourStream"
            />
          </section>
        )}
        {error && (
          <div className="max-w-md mx-auto mt-4">
            <p className="bg-red-400 text-gray-50 font-medium rounded-sm text-sm text-center py-1 px-2">
              {error}
            </p>
          </div>
        )}
        <div className="max-w-md mx-auto mt-4">
          <button className="h-12 flex items-center justify-center w-full px-4 py-3 bg-gray-700 text-gray-100 rounded-sm hover:bg-white hover:text-black transition duration-150 text-sm font-medium">
            {loading ? <Spinner /> : "Create Project"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProject;
