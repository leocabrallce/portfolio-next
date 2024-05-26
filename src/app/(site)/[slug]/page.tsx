import { getPage } from '@/sanity/sanity-utils';
import { PortableText } from 'next-sanity';
import type { Metadata } from 'next';

type PageProps = Readonly<{
  params: {
    slug: string;
  };
}>;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const page = await getPage(params.slug);

  return {
    title: page.title,
    description: page.title,
  };
}

async function Page({ params }: PageProps) {
  const page = await getPage(params.slug);

  return (
    <div>
      <h1>{page.title}</h1>

      <article className='prose'>
        <PortableText value={page.content} />
      </article>
    </div>
  );
}

export default Page;