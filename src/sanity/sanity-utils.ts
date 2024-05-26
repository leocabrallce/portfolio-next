import { Project } from "@/types/Project";
import { createClient, groq } from "next-sanity";

export async function getProjects(): Promise<Project[]> {
  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  });

  return client.fetch(
    groq`*[_type == "project"] | order(_createdAt desc) {
      _id,
      _createdAt,
      title,
      content,
      "slug": slug.current,
      "image": image.asset->url,
    }`
  );
}