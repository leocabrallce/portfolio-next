import type { Image as SanityImage } from "@/graphql/generated";
import Image from "next/image";
// TODO: Create a hook with useCallback to memoize getImageUrl based on the image object
import { getImageUrl } from "@/utils/imageUrlBuilder";

type HeroProps = {
  title: string;
  description: string;
  subtitle: string;
  image: SanityImage;
};

async function Hero({ title, description, subtitle, image }: HeroProps) {
  const heroImageUrl = getImageUrl(image as SanityImage);

  return (
    <div className="relative h-screen w-screen max-w-full border-[24px] md:border-[32px] border-primary-dark dark:border-primary-light bg-primary-light dark:bg-primary-dark text-lg ">
      <div className="flex justify-center md:justify-between h-full">
        <div className="basis-3/5 col-span-2 md:ml-16 flex flex-col justify-between max-h-screen">
          <div className="flex flex-col justify-around pt-16 h-1/2 grow-0 shrink-0">
            <div
              className="text-7xl md:text-[6.75rem] leading-[4rem] md:leading-[5.5rem] -mb-4 -ml-3 font-title font-normal uppercase"
              style={{ viewTransitionName: `title-${title}` }}
            >
              {title}
            </div>
          </div>
          <div className="flex flex-col justify-end grow-0 shrink-0" style={{ viewTransitionName: "hero-description" }}>
            <div className="p-4 md:p-16 mb-16 h-fit border-4 border-l-8 border-primary-dark dark:border-primary-light">
              <p className="text-lg leading-6" style={{ viewTransitionName: `description-${description}` }}>{description}</p>
            </div>
          </div>
        </div>
        <div className="hidden md:block grow relative">
          <Image
            priority
            placeholder="blur"
            src={heroImageUrl}
            width={image?.asset?.metadata?.dimensions?.width || 1920}
            height={image?.asset?.metadata?.dimensions?.height || 1080}
            blurDataURL={image?.asset?.metadata?.lqip || ""}
            alt={"profile picture"}
            style={{ viewTransitionName: `image-${image?.asset?._id}` }}
            className="w-full h-full object-cover"
          />

          <div className="absolute bottom-0 w-full" style={{ viewTransitionName: "hero-subtitle" }}>
            <div className="h-16 bg-primary-dark dark:bg-primary-light text-primary-light dark:text-primary-dark flex items-center pl-16">{subtitle}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;