const functions = require("firebase-functions");
var admin = require("./admin");

exports.sched_activate_event = functions.pubsub
  .schedule("59 9 * * *")
  .timeZone("Asia/Tokyo")
  .onRun(async () => {
    const snap = await admin
      .firestore()
      .collection("events")
      .where("status", "==", "upcoming")
      .get();
    //@Todo make sure that there is only ONE event with upcoming status.
    //Otherwise there will be multiple events running at the same time
    if (!snap.empty) {
      //@Todo check if the start Date is ACTUALLY today or not
      const doc = snap.docs[0]; //@Todo only the first is updated
      return doc.ref.set({ status: "active" }, { merge: true });
    }
  });
