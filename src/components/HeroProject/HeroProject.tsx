import type { Image as SanityImage } from "@/graphql/types";
import Image from "next/image";
// TODO: Create a hook with useCallback to memoize getImageUrl based on the image object
import { getImageUrl } from "@/utils/imageUrlBuilder";
import { Project } from "@/graphql/types";
import moment from "moment";

type Props = {
  project: Project;
};

function HeroProject({ project }: Props) {
  const pages: { name: string; link: string; }[] = [
    // { name: "About", link: "/about" },
    // { name: "Projects", link: "/projects" },
  ];

  const { title, description, image, projectCategories } = project;
  const heroImageUrl = getImageUrl(image as SanityImage);

  return (
    <>
      <div className="min-h-[60dvh] md:flex md:items-center bg-primary-dark dark:bg-primary-light text-primary-light dark:text-primary-dark">
        <div className="flex flex-col h-full md:flex-row items-center justify-between gap-20 md:gap-40 p-8 pt-10">
          <h1 className="font-title uppercase text-6xl basis-2/3 mt-1 leading-[0.9]">
            {title}
          </h1>

          <p className="text-lg shrink-0 basis-1/3">{description}</p>
        </div>
      </div>

      <div className="h-[20dvh] flex flex-row items-center ">
        <div className="flex h-fit flex-row items-start gap-16 mx-8">
          <div className="flex flex-col gap-4 pl-4 h-full border-l border-primary-light dark:border-primary-dark">
            <p className="text-lg uppercase -mt-1">Categories</p>
            <div className="flex flex-col gap-1">
              {projectCategories?.map((category, index) => (
                <span key={index} className="text-lg leading-none">{category?.name}</span>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4 pl-4 h-full border-l border-primary-light dark:border-primary-dark">
            <p className="text-lg uppercase -mt-1">Published at</p>
            <p className="flex gap-2 text-lg leading-none">
              {moment(project._updatedAt).format("MMM DD, YYYY")}
            </p>
          </div>
        </div>
      </div>

      <div>
        <Image
          src={heroImageUrl}
          alt={title || "Project Image"}
          layout="responsive"
          width={1920}
          height={1080}
        />
      </div>
    </>
  );
}

export default HeroProject;