import Image from 'next/image';
import { Link } from 'next-view-transitions';
import { getImageUrl } from '@/utils/imageUrlBuilder';
import type { Project, Image as SanityImage } from '@/graphql/types';

type Props = {
  projects: Project[];
};

function RecentWork({ projects }: Props) {
  return (
    <section>
      <h2 className="font-title uppercase my-24 text-6xl">
        Recent work
      </h2>

      <div className="flex flex-col divide-y">
        {projects.map((project) => (
          <Link key={project._id} href={`/projects/${project.slug?.current}`} className="group hover:text-primary transition-colors">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between py-8">
              <div className="flex flex-col gap-4 grow basis-1/4">
                <h3 className="text-2xl uppercase" style={{ viewTransitionName: `title-${project.title}` }}>{project.title}</h3>
              </div>

              <div className="grow basis-1/4">
                <p className="text-lg leading-6" style={{ viewTransitionName: `description-${project.description}` }} >{project.description}</p>
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
                      style={{ viewTransitionName: `image-${project.image?.asset?._id}` }}
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
  );
}

export default RecentWork;