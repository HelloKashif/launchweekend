import React from "react";
import { useRouter } from "next/router";
import { useProject } from "../../hooks/db";

const Project = (props) => {
  const router = useRouter();
  const { id } = router.query;
  const project = useProject(id);

  return (
    <div className="max-w-3xl mx-auto">
      <h4 className="text-xl font-medium">Project Details</h4>
      <pre>
        <code>{JSON.stringify(project, null, 2)}</code>
      </pre>
    </div>
  );
};
export default Project;
