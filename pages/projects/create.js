import Link from "next/link";
import { useRouter } from "next/router";
import db from "../../lib/db";
import Spinner from "../../components/spinner";

const CreateProject = (props) => {
  const router = useRouter();
  const [streamingLive, setStreamingLive] = React.useState(false);
  const [description, setDescription] = React.useState("");
  const [publicUrl, setPublicUrl] = React.useState("");
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [name, setName] = React.useState("");
  const [streamLink, setStreamLink] = React.useState("");
  const handleStreamLinkChange = (e) => setStreamLink(e.target.value);
  const handleDescChange = (e) => setDescription(e.target.value);
  const handlePublicUrlChange = (e) => setPublicUrl(e.target.value);
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
        publicUrl,
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
        <section className="flex flex-col max-w-md mx-auto mt-2">
          <label htmlFor="description" className="my-1 text-gray-300">
            Public URL (Later can be okay)
          </label>
          <input
            name="publicUrl"
            type="url"
            placeholder="https://your-project-live.com"
            value={publicUrl}
            onChange={handlePublicUrlChange}
            className="form-input text-gray-900"
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
            <p className="shake bg-red-400 text-gray-50 font-medium rounded-sm text-sm text-center py-1 px-2">
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
