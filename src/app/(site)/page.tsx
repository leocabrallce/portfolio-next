import type { Metadata } from "next";
import type { Image as SanityImage } from "@/graphql/generated";
import { sdk } from "@/lib/graphql-request";
import { SortOrder } from "@/graphql/generated";
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

  const getAllExperiences = await sdk.GetAllExperiences({ sort: [{ startDate: SortOrder.Desc }] });
  const experiences = getAllExperiences.data.allExperience;

  return (
    <div>
      <Hero title="Leo Cabral" subtitle="Currently living in Barcelona" description={hero.description || ""} image={hero.image as SanityImage} />

      <div className="my-8 mx-6 md:mx-24 flex flex-col gap-16">
        <RecentWork projects={projects} />

        <Services services={services} />

        <Experiences experiences={experiences} />
      </div>
    </div>
  );
}
