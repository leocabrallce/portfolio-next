import { PortableText } from 'next-sanity';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { sdk } from "@/lib/client";

type PageProps = Readonly<{
  params: {
    slug: string;
  };
}>;

async function handleFetch(slug: string) {
  const getPage = await sdk.GetPage({ slug });
  const page = getPage.data.allPage[0];

  if (!page) {
    return notFound();
  }

  return page;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const page = await handleFetch(params.slug);

  return {
    title: page.title,
    description: page.title,
  };
}

async function Page({ params }: PageProps) {
  const page = await handleFetch(params.slug);

  return (
    <div>
      <h1>{page.title}</h1>

      <article className='prose'>
        <PortableText value={page.contentRaw} />
      </article>
    </div>
  );
}

export default Page;