import type { Metadata } from "next";
import type { Image as SanityImage } from "@/graphql/types";
import Image from "next/image";
import { Link } from "next-view-transitions";
import { sdk } from "@/lib/graphql-request";
import { SortOrder } from "@/graphql/types";
// TODO: Create a hook with useCallback to memoize getImageUrl based on the image object
import { getImageUrl } from "@/utils/imageUrlBuilder";
import Hero from "@/components/Hero/Hero";

export const metadata: Metadata = {
  title: "Leo Cabral",
  description: "Leo Cabral's personal website",
};

export default async function Home() {
  const getAllProjects = await sdk.GetAllProjects();
  const projects = getAllProjects.data.allProject;

  const getAllServices = await sdk.GetAllServices({ sort: [{ order: SortOrder.Asc }] });
  const services = getAllServices.data.allService;

  return (
    <div>
      <Hero />

      <div className="my-8 mx-24">
        <h2 className="font-title uppercase my-24 text-3xl">
          Recent work
        </h2>

        <div className="flex flex-col divide-y">
          {projects.map((project) => (
            <Link key={project._id} href={`/projects/${project.slug?.current}`} className="group hover:text-primary transition-colors">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between py-8">
                <div className="flex flex-col gap-4 grow basis-1/4">
                  <h3 className="text-lg">{project.title}</h3>
                </div>

                {/* categories */}
                <div className="flex flex-col shrink-0 md:flex-row md:items-center md:justify-between grow basis-1/4">
                  {/* pills with categories */}
                  {project.projectCategories?.map((category) => (
                    <span key={category?._id} className="bg-primary-light text-primary-dark border border-primary-dark border-opacity-25 px-4 py-2 rounded-full text-sm mr-2">
                      {category?.name}
                    </span>
                  ))}
                </div>

                <div className="grow basis-1/4">
                  <p className="text-lg">{project.description}</p>
                </div>

                <div className="basis-1/4">
                  {project.image ? (
                    <div className="h-40 w-full">
                      <Image
                        loading="lazy"
                        placeholder="blur"
                        blurDataURL={project.image?.asset?.metadata?.lqip || ""}
                        src={getImageUrl(project.image as SanityImage)}
                        alt={project.title || `Image for project ${project._id}`}
                        width={356}
                        height={200}
                        style={{ viewTransitionName: `image-${project._id}` }}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  ) : null}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
