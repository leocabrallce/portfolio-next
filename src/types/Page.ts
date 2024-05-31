import { PortableTextBlock } from "sanity";

type Page = {
  _id: string;
  _createdAt: string;
  title: string;
  slug: string;
  content: PortableTextBlock[];
};

export default Page;