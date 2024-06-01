import type { Metadata } from 'next';
import { PortableText } from 'next-sanity';
import Image from 'next/image';
import { sdk } from "@/lib/graphql-request";

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

  return (
    <div>
      <header className='flex justify-between items-center'>
        <h1 className='text-5xl font-extrabold bg-gradient-to-r from-orange-400 to-purple-600 bg-clip-text text-transparent'>{project.title}</h1>
      </header>

      {/* image */}
      <Image
        priority
        placeholder="blur"
        blurDataURL={project.image?.asset?.metadata?.lqip || ""}
        src={project.image?.asset?.url || ''}
        alt={project.title || `Image for project ${project._id}`}
        width={project.image?.asset?.metadata?.dimensions?.width || 1920}
        height={project.image?.asset?.metadata?.dimensions?.height || 1080}
        style={{ viewTransitionName: `image-${project._id}` }}
        className='mt-10 w-full object-cover rounded-xl'
      />

      {/* content */}
      <article className='prose text-lg text-gray-700 mt-5'>
        {
          project.content?.map((block, index) => (
            <PortableText key={index} value={block?.contentRaw} />
          ))
        }
      </article>
    </div>
  );
}

export default ProjectPage;