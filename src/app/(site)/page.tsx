import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { gql } from "@apollo/client";
import { getClient } from "@/lib/apollo/client";
import { Project } from "@/types/Project";

export const metadata: Metadata = {
  title: "Leo Cabral",
  description: "Leo Cabral's personal website",
};

async function getProjects() {
  const PROJECTS_QUERY = gql`
    query AllPage {
      allProject {
        _id
        _key
        _createdAt
        title
        slug {
          current
        }
        image {
          asset {
            url
          }
        }
      }
    }
`;

  const client = getClient();

  // TODO: Type this
  const { data } = await client.query({
    query: PROJECTS_QUERY,
  });

  const projects: Pick<Project, '_id' | 'title' | 'slug' | 'image'>[] = data.allProject.map((page: any): Pick<Project, '_id' | 'title' | 'slug' | 'image'> => {
    return {
      _id: page._id,
      title: page.title,
      slug: page.slug.current,
      image: page.image.asset.url,
    };
  });

  return projects;
}

export default async function Home() {
  const projects = await getProjects();

  return (
    <div>
      <h1 className="text-7xl font-extrabold">
        Hello I&apos;m <span className="bg-gradient-to-r from-orange-400 to-purple-600 bg-clip-text text-transparent">Leo</span>!
      </h1>

      <p className="mt-3 text-xl text-gray-600">
        I&apos;m a full-stack developer and designer. I love working with React, Next.js, and Tailwind CSS.
      </p>

      <h2 className="mt-24 font-bold text-3xl">
        Projects
      </h2>

      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <Link href={`/projects/${project.slug}`} key={project._id} className="border border-gray-500 rounded-lg p-4">
            {project.image ? (
              <Image src={project.image} alt={project.title} width={750} height={300} className="object-cover w-full rounded-lg border border-gray-500" />
            ) : null}

            <div className="font-extrabold bg-gradient-to-r from-orange-400 to-purple-600 bg-clip-text text-transparent">
              <h3 className="mt-3 font-bold text-xl">{project.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
