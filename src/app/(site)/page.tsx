import type { Metadata } from "next";
import type { Image as SanityImage } from "@/graphql/types";
import Image from "next/image";
import { Link } from "next-view-transitions";
import { sdk } from "@/lib/graphql-request";
import { SortOrder } from "@/graphql/types";
// TODO: Create a hook with useCallback to memoize getImageUrl based on the image object
import { getImageUrl } from "@/utils/imageUrlBuilder";

export const metadata: Metadata = {
  title: "Leo Cabral",
  description: "Leo Cabral's personal website",
};

export default async function Home() {
  const getAllProjects = await sdk.GetAllProjects();
  const projects = getAllProjects.data.allProject;

  const getAllServices = await sdk.GetAllServices({ sort: [{ order: SortOrder.Asc }] });
  const services = getAllServices.data.allService;

  const getHero = await sdk.GetHero({ limit: 1 });
  const hero = getHero.data.allHero[0];

  const heroImageUrl = getImageUrl(hero?.image as SanityImage);

  return (
    <div>
      <h1 className="text-7xl font-extrabold">
        Hello I&apos;m <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Leo</span>!
      </h1>

      <p className="mt-3 text-xl text-gray-600">
        {hero?.description}
      </p>

      <div className="h-80 w-80">
        <Image
          priority
          placeholder="blur"
          src={heroImageUrl}
          // width and height here should match the redered size, not the default image size
          width={320}
          height={320}
          blurDataURL={hero?.image?.asset?.metadata?.lqip || ""}
          alt={hero?.image?.asset?.altText || "profile picture"}
          className="object-cover w-full rounded-lg border border-gray-500 mt-8"
        />
      </div>

      <h2 className="mt-24 font-bold text-3xl">
        Projects
      </h2>

      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <Link href={`/projects/${project.slug?.current}`} key={project._id} className="border border-gray-500 rounded-lg p-4">
            {project.image ? (
              <Image
                loading="lazy"
                placeholder="blur"
                blurDataURL={project.image?.asset?.metadata?.lqip || ""}
                src={getImageUrl(project.image as SanityImage)}
                alt={project.title || `Image for project ${project._id}`}
                width={project.image.asset?.metadata?.dimensions?.width || 300}
                height={project.image.asset?.metadata?.dimensions?.height || 200}
                style={{ viewTransitionName: `image-${project._id}` }}
                className="object-cover w-full rounded-lg border border-gray-500"
              />
            ) : null}

            <div className="font-extrabold bg-gradient-to-r from-orange-400 to-purple-600 bg-clip-text text-transparent">
              <h3 className="mt-3 font-bold text-xl">{project.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
