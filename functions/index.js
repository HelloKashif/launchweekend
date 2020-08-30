const functions = require("firebase-functions");
var admin = require("firebase-admin");
var app = admin.initializeApp();
const firestore = app.firestore();

const validateAuth = (context) => {
  if (!context || !context.auth) {
    throw new functions.https.HttpsError("invalid-argument", "Requires Auth");
  }
};

exports.addVote = functions.https.onCall(async (data, context) => {
  validateAuth(context);
  const { uid } = context.auth;
  const { projectId } = data;
  if (!projectId) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "Requires projectId"
    );
  }

  const ref = firestore.doc(`/users/${uid}/votes/${projectId}`);
  const projectRef = firestore.doc(`/projects/${projectId}`); //@todo make sure project exists

  const resp = await ref.get();
  if (resp.exists) {
    //User already have a vote ERROR?
    throw new functions.https.HttpsError("invalid-argument", "Already voted");
  }

  try {
    await firestore.runTransaction(async (t) => {
      await ref.set({ value: true });
      await projectRef.update({
        votes: admin.firestore.FieldValue.increment(1),
      });
    });
  } catch (e) {
    console.log("Transaction failure:", e);
    throw new functions.https.HttpsError("invalid-argument", "Some error");
    //@Todo handle this
  }

  return "OK";

  //Insert the vote in user
  //Increment the project votes
});
exports.removeVote = functions.https.onCall(async (data, context) => {
  validateAuth(context);
  const { uid } = context.auth;
  const { projectId } = data;
  if (!projectId) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "Requires projectId"
    );
  }

  const ref = firestore.doc(`/users/${uid}/votes/${projectId}`);
  const projectRef = firestore.doc(`/projects/${projectId}`); //@todo make sure project exists

  const resp = await ref.get();
  if (resp.exists) {
    try {
      await firestore.runTransaction(async (t) => {
        await ref.delete();
        await projectRef.update({
          votes: admin.firestore.FieldValue.increment(-1),
        });
      });
    } catch (e) {
      console.log("Transaction failure:", e);
      throw new functions.https.HttpsError("invalid-argument", "Some error");
      //@Todo handle this
    }
  } else {
    //User doesn't have a vote ERROR?
    throw new functions.https.HttpsError(
      "invalid-argument",
      "Not voted yet on this project"
    );
  }

  return "OK";

  //Remove the vote from the user
  //Update the project votes stats
});
