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

      <div className="my-8 mx-24 flex flex-col gap-16">
        <section>
          <h2 className="font-title uppercase my-24 text-6xl">
            Recent work
          </h2>

          <div className="flex flex-col divide-y">
            {projects.map((project) => (
              <Link key={project._id} href={`/projects/${project.slug?.current}`} className="group hover:text-primary transition-colors">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between py-8">
                  <div className="flex flex-col gap-4 grow basis-1/4">
                    <h3 className="text-2xl uppercase">{project.title}</h3>
                  </div>

                  <div className="grow basis-1/4">
                    <p className="text-lg leading-6">{project.description}</p>
                  </div>

                  {/* categories */}
                  <div className="flex flex-col shrink-0 md:flex-row md:items-center md:justify-between grow basis-1/4">
                    {/* pills with categories */}
                    {project.projectCategories?.map((category) => (
                      <span key={category?._id} className="bg-primary-light text-primary-dark/50 border border-primary-dark/25 px-4 py-2 rounded-full text-xs mr-2">
                        {category?.name}
                      </span>
                    ))}
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
        </section>

        <section>
          <h2 className="font-title uppercase my-24 text-6xl">
            Services
          </h2>

          <div className="grid grid-rows-8 sm:grid-rows-4 md:grid-rows-2 grid-flow-col gap-y-16 gap-x-8">
            {services.map((service) => (
              <div key={service._id} className="p-4 flex flex-col gap-12 justify-between border-l border-primary-dark/25">
                <h3 className="text-2xl uppercase leading-5">{service.title}</h3>

                <p className="text-lg self-start min-h-28 leading-6">{service.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
