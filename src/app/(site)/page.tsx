import type { Metadata } from "next";
import type { Image as SanityImage, Project as ProjectType } from "@/graphql/types";
import Image from "next/image";
import { Link } from "next-view-transitions";
import { sdk } from "@/lib/graphql-request";
import { SortOrder } from "@/graphql/types";
// TODO: Create a hook with useCallback to memoize getImageUrl based on the image object
import { getImageUrl } from "@/utils/imageUrlBuilder";
import Hero from "@/components/Hero/Hero";
import Experiences from "@/components/Sections/Experiences";
import Services from "@/components/Sections/Services";
import RecentWork from "@/components/Sections/RecentWork";

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

  return (
    <div>
      <Hero title="Léo Cabral" subtitle="Currently living in Barcelona" description={hero.description || ""} image={hero.image as SanityImage} />

      <div className="my-8 mx-24 flex flex-col gap-16">
        <RecentWork projects={projects} />

        <Services services={services} />

        <Experiences />
      </div>
    </div>
  );
}
