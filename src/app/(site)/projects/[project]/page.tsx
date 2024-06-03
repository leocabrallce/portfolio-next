import type { Metadata } from 'next';
import { PortableText } from 'next-sanity';
import { sdk } from "@/lib/graphql-request";
import HeroProject from '@/components/HeroProject/HeroProject';
import CodeSandboxPreview from '@/components/CodeSandboxPreview';

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
    title: `Project: ${project.title}`,
    description: `Project: ${project.title}`,
  };
}

async function ProjectPage({ params }: ProjectPageProps) {
  const slug = params.project;
  const project = await handleFetchProject(slug);

  return (
    <div>
      <HeroProject project={project} />

      <div className='my-8 mx-24 flex flex-col gap-16'>
        {/* content */}
        <article className='prose text-lg mt-5 text-primary-dark dark:text-primary-light dark:prose-invert'>
          {
            project.content?.map((block, index) => (
              <>
                <h3>{block?.title}</h3>
                <PortableText key={index} value={block?.contentRaw} components={PTcomponents} />
              </>
            ))
          }
        </article>
      </div>
    </div>
  );
}

export default ProjectPage;