import type { Image as SanityImage } from "@/graphql/types";
import Image from "next/image";
import { sdk } from "@/lib/graphql-request";
// TODO: Create a hook with useCallback to memoize getImageUrl based on the image object
import { getImageUrl } from "@/utils/imageUrlBuilder";
import { Navbar } from "@/components/Navbar";

type HeroProps = {
  title: string;
  description: string;
  subtitle: string;
  image: SanityImage;
};


async function Hero({ title, description, subtitle, image }: HeroProps) {
  const pages: { name: string; link: string; }[] = [
    // { name: "About", link: "/about" },
    // { name: "Projects", link: "/projects" },
  ];

  const heroImageUrl = getImageUrl(image as SanityImage);

  return (
    <div className="relative h-screen w-screen max-w-full border-[32px] border-primary-dark dark:border-primary-light bg-primary-light dark:bg-primary-dark text-lg ">
      <div className="flex justify-between h-full">
        <div className="basis-3/5 col-span-2 ml-16 flex flex-col justify-between max-h-screen">
          <div className="flex flex-col justify-between pt-16 h-1/2 grow-0 shrink-0">
            <Navbar items={pages} />

            <div
              className="text-[6.75rem] leading-[5.5rem] -mb-4 -ml-3 font-title font-normal uppercase"
              style={{ viewTransitionName: `title-${title}` }}
            >
              {title}
            </div>
          </div>
          <div className="flex flex-col justify-end grow-0 shrink-0" style={{ viewTransitionName: "hero-description" }}>
            <div className="p-16 mb-16 h-fit border-4 border-l-8 border-primary-dark dark:border-primary-light">
              <p className="text-lg leading-6" style={{ viewTransitionName: `description-${description}` }}>{description}</p>
            </div>
          </div>
        </div>
        <div className="grow relative">
          <Image
            priority
            placeholder="blur"
            src={heroImageUrl}
            width={image?.asset?.metadata?.dimensions?.width || 1920}
            height={image?.asset?.metadata?.dimensions?.height || 1080}
            blurDataURL={image?.asset?.metadata?.lqip || ""}
            alt={image?.asset?.altText || "profile picture"}
            style={{ viewTransitionName: `image-${image?.asset?._id}` }}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 w-full" style={{ viewTransitionName: "hero-subtitle" }}>
            <div className="h-16 bg-primary-dark dark:bg-primary-light dark:text-primary-dark flex items-center pl-16">{subtitle}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;