import React from "react";
import * as firebase from "firebase/app";
import Link from "next/link";

const ProjectCard = (props) => {
  const { project } = props;
  return (
    <Link href={`/projects/${project.id}`}>
      <a className="w-80 h-48 bg-white shadow-md hover:shadow-lg transition duration-150 px-4 py-3 rounded-lg flex flex-col items-center">
        <div className="w-full">
          <h5 className="text-md font-medium text-gray-900">{project.name}</h5>
          <span className="text-sm font-medium text-gray-600">
            {project.user}
          </span>
        </div>
      </a>
    </Link>
  );
};

const Projects = (props) => {
  const [projects, setProjects] = React.useState([]);
  React.useEffect(() => {
    const db = firebase.firestore();
    db.collection(`/projects`)
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
  }, []);

  return (
    <ul className="flex flex-wrap">
      {projects.map((item) => {
        return (
          <li key={item.id} className="mr-3">
            <ProjectCard project={item} />
          </li>
        );
      })}
    </ul>
  );
};

export default Projects;
