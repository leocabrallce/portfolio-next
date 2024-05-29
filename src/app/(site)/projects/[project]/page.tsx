import type { Metadata } from 'next';
import { PortableText } from 'next-sanity';
import Image from 'next/image';
import { gql } from "@apollo/client";
import { getClient } from "@/lib/apollo/client";
import { Project } from "@/types/Project";

type ProjectPageProps = {
  params: {
    project: string;
  };
};

async function getProject(slug: string) {
  const PROJECT_QUERY = gql`
    query GetProject($slug: String!) {
      allProject(
        where: { slug: { current: { eq: $slug } } }
        limit: 1
      ) {
        _id
        _createdAt
        title
        contentRaw
        slug {
          current
        }
        image {
          asset {
            url
          }
        }
      }
    }
  `;

  const client = getClient();

  // TODO: Type this
  const { data } = await client.query({
    query: PROJECT_QUERY,
    variables: {
      slug: slug,
    },
  });

  const project: Pick<Project, '_id' | 'title' | 'slug' | 'image' | 'content'> = {
    _id: data.allProject[0]._id,
    title: data.allProject[0].title,
    slug: data.allProject[0].slug.current,
    image: data.allProject[0].image.asset.url,
    content: data.allProject[0].contentRaw,
  };

  return project;
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const slug = params.project;
  const project = await getProject(slug);

  return {
    title: `Project: ${project.title}`,
    description: `Project: ${project.title}`,
  };
}

async function ProjectPage({ params }: ProjectPageProps) {
  const slug = params.project;
  const project = await getProject(slug);

  return (
    <div>
      <header className='flex justify-between items-center'>
        <h1 className='text-5xl font-extrabold bg-gradient-to-r from-orange-400 to-purple-600 bg-clip-text text-transparent'>{project.title}</h1>
      </header>

      {/* image */}
      <Image priority src={project.image} alt={project.title} width={1920} height={1080} className='mt-10 w-full object-cover rounded-xl' />

      {/* content */}
      <article className='prose text-lg text-gray-700 mt-5'>
        <PortableText value={project.content} />
      </article>
    </div>
  );
}

export default ProjectPage;