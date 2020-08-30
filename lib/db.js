import firebase from "./firebase";

export default {
  addComment: async (projectId, msg) => {
    const user = firebase.auth().currentUser;
    const resp = await firebase
      .firestore()
      .collection(`/projects/${projectId}/comments`)
      .add({
        from: {
          name: user.displayName, //@Todo robust, this should be done on the firebase function side not here
        },
        msg, //@Todo moderation and stuff on backend
      });

    return resp;
  },
  addVote: async (projectId) => {
    const func = firebase.functions().httpsCallable("addVote");
    return func({ projectId });
  },
  removeVote: async (projectId) => {
    const func = firebase.functions().httpsCallable("removeVote");
    return func({ projectId });
  },
  deleteProject: async (id) => {
    return firebase.firestore().doc(`/projects/${id}`).delete();
  },
  updateProject: async (id, data) => {
    return firebase.firestore().doc(`/projects/${id}`).update(data);
  },
  createProject: async (data) => {
    const user = firebase.auth().currentUser;
    const resp = await firebase
      .firestore()
      .collection("/projects")
      .add({
        eventId: "HngWH82q1TiedcwlTQQT", //@Todo hardcoded
        userId: user.uid,
        username: user.displayName,
        photoURL: user.photoURL,
        ...data,
      });

    return resp;
  },
};
