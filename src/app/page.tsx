import Image from "next/image";
import { getProjects } from "@/sanity/sanity-utils";

export default async function Home() {
  const projects = await getProjects();
  console.log(projects);

  return (
    <div>
      <h1>Projects goes here</h1>

      <div>
        {projects.map((project) => (
          <div key={project._id}>
            <h2>{project.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
