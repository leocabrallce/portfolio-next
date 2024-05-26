import { Project } from "@/types/Project";
import { Page } from "@/types/Page";
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

export async function getPages(): Promise<Page[]> {
  const client = createClient(config);

  return client.fetch(
    groq`*[_type == "page"] | order(_createdAt desc) {
      _id,
      _createdAt,
      title,
      "slug": slug.current,
    }`
  );
}

export async function getPage(slug: string): Promise<Page> {
  const client = createClient(config);

  return client.fetch(
    groq`*[_type == "page" && slug.current == $slug][0] {
      _id,
      _createdAt,
      title,
      content,
      "slug": slug.current,
    }`,
    { slug }
  );
}