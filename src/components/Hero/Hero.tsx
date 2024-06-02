import type { Image as SanityImage } from "@/graphql/types";
import Image from "next/image";
import { sdk } from "@/lib/graphql-request";
// TODO: Create a hook with useCallback to memoize getImageUrl based on the image object
import { getImageUrl } from "@/utils/imageUrlBuilder";
import { Navbar } from "@/components/Navbar";


async function Hero() {
  const pages = [
    { name: "About", link: "/about" },
    { name: "Projects", link: "/projects" },
  ];

  const getHero = await sdk.GetHero({ limit: 1 });
  const hero = getHero.data.allHero[0];

  const heroImageUrl = getImageUrl(hero?.image as SanityImage);

  return (
    <div className="relative h-screen w-screen border-[32px] border-primary-dark bg-primary-light text-lg text-primary-dark">
      <div className="flex justify-between h-full">
        <div className="basis-3/5 col-span-2 ml-16 flex flex-col justify-between max-h-screen">
          <div className="flex flex-col justify-between pt-16 h-1/2 grow-0 shrink-0">
            <Navbar items={pages} />

            <div className="text-[6.75rem] leading-[5.5rem] -mb-4 -ml-3 font-hero font-normal uppercase">
              Léo Cabral
            </div>
          </div>
          <div className="flex flex-col justify-end grow-0 shrink-0">
            <div className="p-16 mb-16 h-fit border-4 border-l-8 border-primary-dark">
              <p className="text-lg">{hero?.description}</p>
            </div>
          </div>
        </div>
        <div className="grow relative">
          <Image
            priority
            placeholder="blur"
            src={heroImageUrl}
            // width and height here should match the redered size, not the default image size
            width={200}
            height={200}
            blurDataURL={hero?.image?.asset?.metadata?.lqip || ""}
            alt={hero?.image?.asset?.altText || "profile picture"}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 w-full">
            <div className="h-16 bg-primary-dark text-primary-light flex items-center pl-16">Currently living in Barcelona</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;