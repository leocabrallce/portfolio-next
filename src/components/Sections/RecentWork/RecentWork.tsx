import { sdk } from "@/lib/graphql-request";
import ProjectRow from '@/components/ProjectRow';

async function RecentWork() {
  const getAllProjects = await sdk.GetLatestProjects({ limit: 3 });
  const projects = getAllProjects.data.allProject;

  return (
    <section>
      <h2 className="font-title uppercase mb-8 mt-16 md:my-24 text-5xl md:text-6xl">
        Recent work
      </h2>

      <div className="flex flex-col divide-y">
        {projects.map((project) => (
          <ProjectRow key={project._id} project={project} />
        ))}
      </div>
    </section>
  );
}

export default RecentWork;