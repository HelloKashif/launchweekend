import firebase from "./firebase";
const firestore = firebase.firestore();

const getActiveEvent = async () => {
  const resp = await firestore
    .collection(`events`)
    .where("status", "==", "active")
    .get();
  let result = null;
  if (!resp.empty) {
    const doc = resp.docs[0];
    const docData = { id: doc.id, ...doc.data() };
    result = {
      id: docData.id,
      endDate: docData.endDate.seconds,
      startDate: docData.startDate.seconds,
      status: docData.status,
    };
  }
  return result;
};

export default {
  getActiveEvent,
  getUpcomingEvent: async () => {
    const resp = await firestore
      .collection(`events`)
      .where("status", "==", "upcoming")
      .get();
    let result = null;
    if (!resp.empty) {
      const doc = resp.docs[0];
      const docData = { id: doc.id, ...doc.data() };
      result = {
        id: docData.id,
        endDate: docData.endDate.seconds,
        startDate: docData.startDate.seconds,
        status: docData.status,
      };
    }
    console.log(result);
    return result;
  },
  addComment: async (projectId, msg) => {
    const user = firebase.auth().currentUser;
    const resp = await firestore
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
    const activeEvent = await getActiveEvent();
    if (!activeEvent)
      throw new Error(
        "No active event is running. You can only create projects during the hackathon."
      );
    const user = firebase.auth().currentUser;
    const resp = await firebase
      .firestore()
      .collection("/projects")
      .add({
        eventId: activeEvent.id,
        userId: user.uid,
        username: user.displayName,
        photoURL: user.photoURL,
        ...data,
      });

    return resp;
  },
};
