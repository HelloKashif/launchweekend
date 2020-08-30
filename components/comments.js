import { useComment } from "../hooks/db";
import db from "../lib/db";
import Spinner from "../components/spinner";
import { useRouter } from "next/router";

const CommentCard = (props) => {
  const { comment } = props;
  if (!comment) return null;
  console.log(comment);
  return (
    <div className="bg-gray-700 py-2 px-4 w-full rounded-sm">
      <p className="text-base text-gray-100">{comment.msg}</p>
      <div className="text-right text-sm text-gray-200">
        <span>{comment.from.name}</span>
      </div>
    </div>
  );
};

const Comments = (props) => {
  const router = useRouter();
  const { project } = props;
  const { comments, loading } = useComment(project.id);
  const [msg, setMsg] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);

  const handleChange = (e) => {
    setMsg(e.target.value);
  };
  const submitComment = async (e) => {
    e.preventDefault();

    if (!msg || msg.trim() === "") return;

    setSubmitting(true);
    await db.addComment(project.id, msg);
    setSubmitting(false);
    setMsg("");
    router.reload();
    //@Todo errors handle
  };
  return (
    <div className="w-full max-w-3xl mx-auto">
      <h5 className="text-xl font-light">Comments</h5>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <ul className="w-full space-y-1 mt-2">
            {comments.map((comment) => (
              <li key={comment.id}>
                <CommentCard comment={comment} />
              </li>
            ))}
          </ul>
          <form
            onSubmit={submitComment}
            className="mt-5 flex flex-col items-center"
          >
            <textarea
              onChange={handleChange}
              value={msg}
              className="form-textarea text-gray-900 w-full rounded-sm"
            />
            <button
              disabled={submitting}
              className={`mt-1 block w-full transition duration-150 bg-gray-600 h-12 ${
                msg !== "" ? "bg-blue-500" : ""
              } ${submitting ? "bg-gray-600" : ""}`}
            >
              {submitting ? <Spinner /> : "Add Comment"}
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default Comments;
