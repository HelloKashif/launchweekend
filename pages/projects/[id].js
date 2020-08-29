import React from "react";
import * as firebase from "firebase/app";
import { useRouter } from "next/router";

const Project = (props) => {
  const router = useRouter();
  const { id } = router.query;
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

  return (
    <div className="">
      <h4 className="text-xl font-medium">Project Details</h4>
      <pre>
        <code>{JSON.stringify(project, null, 2)}</code>
      </pre>
    </div>
  );
};
export default Project;
