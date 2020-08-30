import React from "react";
import firebase from "../lib/firebase";
import Link from "next/link";
import ProjectCard from "../components/project-card";
import { useProjects } from "../hooks/db";

const Projects = (props) => {
  const { limit } = props;
  const projects = useProjects({ limit });

  return (
    <ul className="flex flex-col items-center">
      {projects.map((item) => {
        return (
          <li key={item.id} className="mb-1 max-w-xl w-full">
            <ProjectCard project={item} />
          </li>
        );
      })}
    </ul>
  );
};

export default Projects;
