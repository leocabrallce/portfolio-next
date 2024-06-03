import type { Metadata } from 'next';
import { PortableText } from 'next-sanity';
import { sdk } from "@/lib/graphql-request";
import HeroProject from '@/components/HeroProject/HeroProject';
import CodeSandboxPreview from '@/components/CodeSandboxPreview';
import ProjectNavigation from '@/components/ProjectNavigation';

type ProjectPageProps = {
  params: {
    project: string;
  };
};

const PTcomponents = {
  types: {
    codeSandboxPreview: CodeSandboxPreview,
  }
};

async function handleFetchProject(slug: string) {
  const getProject = await sdk.GetProject({ slug });
  return getProject.data.allProject[0];
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const slug = params.project;
  const project = await handleFetchProject(slug);

  return {
    title: project.title,
    description: project.title,
  };
}

async function ProjectPage({ params }: ProjectPageProps) {
  const slug = params.project;
  const project = await handleFetchProject(slug);

  return (
    <div>
      <HeroProject project={project} />

      <div className='mx-8 my-24 flex flex-col gap-16'>
        <article className='text-lg mt-5 flex flex-col divide-y'>
          {
            project.content?.map((block) => (
              <div key={block?._id} id={block?._id || ""} data-hash={block?._id} className='w-full grid grid-cols-1 md:grid-cols-5 py-16'>
                <div className='md:col-span-2 h-full'>
                  <h3 className='sticky top-8 bottom-8'>{block?.title}</h3>
                </div>

                <div className='md:col-span-3 prose text-lg max-w-none text-primary-dark dark:text-primary-light dark:prose-invert'>
                  <PortableText value={block?.contentRaw} components={PTcomponents} />
                </div>
              </div>
            ))
          }
        </article>
      </div>

      {/* <ProjectNavigation project={project} /> */}
    </div>
  );
}

export default ProjectPage;