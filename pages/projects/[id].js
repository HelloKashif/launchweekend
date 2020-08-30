import React from "react";
import { useRouter } from "next/router";
import { useProject } from "../../hooks/db";
import useAuth from "../../hooks/auth";
import Modal from "../../components/modal";
import ProjectDetails from "../../components/project-detail";
import db from "../../lib/db";

const Project = (props) => {
  const router = useRouter();
  const user = useAuth();
  const { id } = router.query;
  const project = useProject(id);

  const [editOpen, setEditOpen] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);

  const [streamingLive, setStreamingLive] = React.useState(true);
  const [description, setDescription] = React.useState("");
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [name, setName] = React.useState("");
  const [streamLink, setStreamLink] = React.useState("");
  const handleStreamLinkChange = (e) => setStreamLink(e.target.value);
  const handleDescChange = (e) => setDescription(e.target.value);
  const handleNameChange = (e) => setName(e.target.value);

  React.useEffect(() => {
    if (!project) return;
    setName(project.name);
    setDescription(project.description);
    setStreamLink(project.streamLink);
    setStreamingLive(project.streamingLive);
  }, [project]);

  const handleDelete = async () => {
    setDeleteOpen(false);
    try {
      await db.deleteProject(id);
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  };
  const handleEdit = async () => {
    setEditOpen(false);
    try {
      const data = {
        name,
        description,
        streamLink,
        streamingLive,
      };
      await db.updateProject(id, data);
      router.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const handleVote = async (e) => {
    try {
      const resp = await db.addVote(project.id);
      console.log("resp", resp);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-end">
        <Modal open={editOpen}>
          <div className="text-gray-900">
            <h4>Edit Project</h4>
            <form onSubmit={handleEdit} className="">
              <section className="flex flex-col mt-2">
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
              <section className="flex flex-col mt-2">
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
              <div className="my-2 flex items-center justify-between">
                <button
                  type="button"
                  className="rounded bg-gray-100 px-4 py-2"
                  onClick={(e) => setEditOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="border rounded border-blue-400 text-gray-800 font-medium px-4 py-2"
                  onClick={handleEdit}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </Modal>
        <Modal open={deleteOpen}>
          <div className="text-gray-900">
            <h4>Delete Project?</h4>
            <div className="flex items-center justify-between">
              <button
                className="rounded bg-gray-100 px-4 py-2"
                onClick={(e) => setDeleteOpen(false)}
              >
                Cancel
              </button>
              <button
                className="border rounded border-red-400 text-gray-800 font-medium px-4 py-2"
                onClick={handleDelete}
              >
                Really Delete?
              </button>
            </div>
          </div>
        </Modal>
        {user && project && user.uid === project.userId && (
          <div className="flex items-center space-x-4">
            <button
              onClick={(e) => setEditOpen(true)}
              className="rounded-sm flex items-center border border-gray-700 px-4 py-1 text-sm"
            >
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                className="pencil-alt w-4 h-4 mr-1 text-gray-300"
              >
                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path>
                <path
                  fillRule="evenodd"
                  d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                  clipRule="evenodd"
                ></path>
              </svg>
              Edit
            </button>
            <button
              onClick={(e) => setDeleteOpen(true)}
              className="rounded-sm flex items-center border border-gray-700 px-3 py-1 text-sm"
            >
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                className="trash w-4 h-4 mr-1 text-gray-300"
              >
                <path
                  fillRule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
              Delete
            </button>
          </div>
        )}
      </div>
      <div className="px-1 sm:px-0 space-x-6 lg:flex items-center">
        <div className="flex-1">
          <ProjectDetails project={project} />
        </div>
        <div className="">
          <button
            onClick={handleVote}
            className="flex items-center justify-center border-white bg-white w-48 text-black px-4 py-3"
          >
            <svg
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="thumb-up w-6 h-6 text-blue-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
              ></path>
            </svg>
            Upvote
          </button>
        </div>
      </div>
    </div>
  );
};
export default Project;
