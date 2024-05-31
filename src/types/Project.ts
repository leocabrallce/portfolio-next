import { PortableTextBlock } from "sanity";

type Project = {
  _id: string;
  _createdAt: string;
  title: string;
  slug: string;
  image: string;
  content: PortableTextBlock[];
};

export default Project;