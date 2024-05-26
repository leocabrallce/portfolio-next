import { getProject } from '@/sanity/sanity-utils';
import { PortableText } from 'next-sanity';
import Image from 'next/image';

type ProjectPageProps = {
  params: {
    project: string;
  };
};

async function ProjectPage({ params }: ProjectPageProps) {
  const slug = params.project;
  const project = await getProject(slug);

  return (
    <div>
      <header className='flex justify-between items-center'>
        <h1 className='text-5xl font-extrabold bg-gradient-to-r from-orange-400 to-purple-600 bg-clip-text text-transparent'>{project.title}</h1>
      </header>

      {/* content */}
      <div className='text-lg text-gray-700 mt-5'>
        <PortableText value={project.content} />
      </div>

      {/* image */}
      <Image src={project.image} alt={project.title} width={1920} height={1080} className='mt-10 w-full object-cover rounded-xl' />
    </div>
  );
}

export default ProjectPage;