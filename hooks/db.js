import React from "react";
import * as firebase from "firebase/app";

const useProjects = ({ filterLive, limit }) => {
  const [projects, setProjects] = React.useState([]);
  React.useEffect(() => {
    const db = firebase.firestore();
    let ref = db.collection(`/projects`);

    if (filterLive) {
      ref = ref.where("streamingLive", "==", true);
    }

    if (limit) {
      ref = ref.limit(limit);
    }
    //@Todo limit the query for projects to within current events
    return ref.onSnapshot((snap) => {
      let newProjecs = [];
      snap.forEach((doc) => {
        newProjecs.push({ id: doc.id, ...doc.data() });
      });
      setProjects(newProjecs);
    });
  }, [filterLive]);

  return projects;
};
const useProject = (id) => {
  const [project, setProject] = React.useState(null);
  React.useEffect(() => {
    if (!id) return;
    const db = firebase.firestore();
    db.doc(`/projects/${id}`)
      .get()
      .then((doc) => {
        setProject({ id: doc.id, ...doc.data() });
      })
      .catch((err) => {
        //@Todo hadnle errors
      });
  }, [id]);

  return project;
};

export { useProjects, useProject };
