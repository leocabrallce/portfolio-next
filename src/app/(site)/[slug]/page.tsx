import { getPage } from '@/sanity/sanity-utils';
import { PortableText } from 'next-sanity';

type PageProps = Readonly<{
  params: {
    slug: string;
  };
}>;

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