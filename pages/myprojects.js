import firebase from "../lib/firebase";
import useAuth from "../hooks/auth";
import ProjectCard from "../components/project-card";

const MyProject = (props) => {
  const [projects, setProjects] = React.useState([]);
  const user = useAuth();
  React.useEffect(() => {
    if (!user) return;
    const db = firebase.firestore();
    db.collection(`/projects`)
      .where("userId", "==", user.uid)
      .get()
      .then((snap) => {
        let newProjecs = [];
        snap.forEach((doc) => {
          newProjecs.push({ id: doc.id, ...doc.data() });
        });
        setProjects(newProjecs);
      })
      .catch((err) => {
        //@Todo hadnle errors
      });
  }, [user]);
  return (
    <div className="max-w-4xl mx-auto mt-6">
      <h2 className="font-light text-3xl">My Projects</h2>
      <ul className="space-y-2 mt-4">
        {projects.map((project) => (
          <li key={project.id}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </div>
  );
};
export default MyProject;
