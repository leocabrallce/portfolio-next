import { Project } from "@/types/Project";
import { createClient, groq } from "next-sanity";
import config from "@/sanity/config/client";

export async function getProjects(): Promise<Project[]> {
  const client = createClient(config);

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

export async function getProject(slug: string): Promise<Project> {
  const client = createClient(config);

  return client.fetch(
    groq`*[_type == "project" && slug.current == $slug][0] {
      _id,
      _createdAt,
      title,
      content,
      "slug": slug.current,
      "image": image.asset->url,
    }`,
    { slug }
  );
}