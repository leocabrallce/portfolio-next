import { sdk } from "@/lib/graphql-request";
import ProjectsFilteredList from "@/components/ProjectsFilteredList";

async function Projects() {
  const getAllProjects = await sdk.GetAllProjects();
  const projects = getAllProjects.data.allProject;

  return (
    <div className="mx-6 md:mx-8 mt-24 md:mt-32">
      <h1 className="font-title text-7xl uppercase">Projects</h1>

      <section>
        <h2 className="text-2xl uppercase leading-6 mb-8 mt-16 md:my-24">
          Experiments, side projects, interesting snippets, and more...
        </h2>

        <div className="flex flex-col divide-y">
          <ProjectsFilteredList projects={projects} />
        </div>
      </section>
    </div>
  );
}

export default Projects;