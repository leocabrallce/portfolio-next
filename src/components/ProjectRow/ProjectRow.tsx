import { Project } from "@/graphql/generated";
import Image from "next/image";
import { Link } from "next-view-transitions";
import { getImageUrl } from "@/utils/imageUrlBuilder";
import type { Image as SanityImage } from "@/graphql/generated";
import { memo } from "react";

function ProjectRow({ project }: { project: Project; }) {
  return (
    <div className="border-b-2 border-primary-light dark:border-primary-dark hover:border-primary-dark dark:hover:border-primary-light transition-colors">
      <Link key={project._id} href={`/projects/${project.slug?.current}`}>
        <div className="flex flex-col-reverse md:flex-row md:items-center md:justify-between py-8 gap-16">
          <div className="flex flex-col gap-4 grow basis-1/4">
            <h3 className="text-2xl uppercase" style={{ viewTransitionName: `title-${project._id}` }}>{project.title}</h3>
          </div>

          <div className="grow basis-1/4">
            <p className="text-lg leading-6 line-clamp-3" style={{ viewTransitionName: `description-${project._id}` }} >{project.description}</p>
          </div>

          {/* categories */}
          <div className="flex flex-col gap-4 shrink-0 md:flex-row items-start justify-start md:items-center grow basis-1/4">
            {/* pills with categories */}
            {project.projectCategories?.map((category) => (
              <span key={category?._id} className="w-fit px-4 py-2 text-xs mr-2 border bg-primary-light/50 dark:bg-primary-dark/50 border-primary-dark/25 dark:border-primary-light/25">
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
                  style={{ viewTransitionName: `image-${project.image?.asset?._id}` }}
                  className="object-cover w-full h-full"
                />
              </div>
            ) : null}
          </div>
        </div>
      </Link>
    </div>
  );
}

export default memo(ProjectRow, (prev, next) => prev.project._id === next.project._id);