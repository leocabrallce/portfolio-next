import { getProject } from '@/sanity/sanity-utils';

type ProjectPageProps = {
  params: {
    project: string;
  };
};

async function ProjectPage({ params }: ProjectPageProps) {
  const slug = params.project;
  const project = await getProject(slug);

  return <div>{project.title}</div>;
}

export default ProjectPage;