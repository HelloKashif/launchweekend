const functions = require("firebase-functions");
var admin = require("firebase-admin");
var app = admin.initializeApp();

exports.sched_activate_event = functions.pubsub
  .schedule("59 9 * * *")
  .timeZone("America/New_York") // Users can choose timezone - default is America/Los_Angeles
  .onRun((context) => {
    console.log("This will be run every day at 11:05 AM Eastern!");
    return null;
  });
