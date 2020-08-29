import firebase from "./firebase";

export default {
  createProject: async (data) => {
    const user = firebase.auth().currentUser;
    const resp = await firebase
      .firestore()
      .collection("/projects")
      .add({
        eventId: "HngWH82q1TiedcwlTQQT", //@Todo hardcoded
        userId: user.uid,
        ...data,
      });

    return resp;
  },
};
