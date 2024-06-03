import type { Metadata } from 'next';
import { PortableText } from 'next-sanity';
import { sdk } from "@/lib/graphql-request";
import Hero from '@/components/Hero/Hero';
import type { Image as SanityImage } from "@/graphql/types";

type ProjectPageProps = {
  params: {
    project: string;
  };
};

async function handleFetchProject(slug: string) {
  const getProject = await sdk.GetProject({ slug });
  return getProject.data.allProject[0];
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const slug = params.project;
  const project = await handleFetchProject(slug);

  return {
    title: `Project: ${project.title}`,
    description: `Project: ${project.title}`,
  };
}

async function ProjectPage({ params }: ProjectPageProps) {
  const slug = params.project;
  const project = await handleFetchProject(slug);

  const categories = project.projectCategories?.map((category) => category?.name).join(', ');
  const subtitle = categories ? `Categories: ${categories}` : '';

  return (
    <div>
      <Hero title={project.title || ""} description={project.description || ""} subtitle={subtitle} image={project.image as SanityImage} />

      <div className='my-8 mx-24 flex flex-col gap-16'>
        <h2 className="font-title uppercase my-24 text-6xl">
          {project.title}
        </h2>

        {/* content */}
        <article className='prose text-lg mt-5 text-primary-dark dark:text-primary-light dark:prose-invert'>
          {
            project.content?.map((block, index) => (
              <PortableText key={index} value={block?.contentRaw} />
            ))
          }
        </article>
      </div>
    </div>
  );
}

export default ProjectPage;