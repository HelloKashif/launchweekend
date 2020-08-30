import React from "react";
import * as firebase from "firebase/app";
import useAuth from "./auth";

const useComment = (id) => {
  const [comments, setComments] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    if (!id) return;
    const db = firebase.firestore();
    //@Todo limit the query size
    db.collection(`/projects/${id}/comments`)
      .limit(50)
      .get()
      .then((snap) => {
        let newComments = [];
        snap.forEach((doc) => {
          newComments.push({ id: doc.id, ...doc.data() });
        });
        setComments(newComments);
        setLoading(false);
      });
  }, [id]);

  return { comments, loading };
};
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
    return db.doc(`/projects/${id}`).onSnapshot((doc) => {
      setProject({ id: doc.id, ...doc.data() });
    });
  }, [id]);

  return project;
};
const useVoted = (id) => {
  const user = useAuth();
  const [voted, setVoted] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    if (!id) return;
    if (!user) return;
    const db = firebase.firestore();
    return db.doc(`/users/${user.uid}/votes/${id}`).onSnapshot((doc) => {
      setVoted(doc.exists);
      setLoading(false);
    });
  }, [id, user]);

  return { voted, loading };
};

export { useComment, useVoted, useProjects, useProject };
