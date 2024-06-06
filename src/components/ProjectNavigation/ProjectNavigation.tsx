"use client";
import { Project } from "@/graphql/generated";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/utils/classNames";
import Script from "next/script";

type ProjectNavigationProps = {
  project: Project;
};

function ProjectNavigation({ project }: ProjectNavigationProps) {
  const params = useParams();
  const [pathname, setPathname] = useState("");

  useEffect(() => {
    setPathname(window.location.hash);
  }, [params]);

  return (
    <>
      <h2>Navigation</h2>
      <ul>
        {
          project.content?.map((block) => (
            <li key={block?._id}>
              <Link href={`#${block?._id}`} className={cn(pathname === `#${block?._id}` && "text-primary", "transition-colors")}>
                {block?.title}
              </Link>
            </li>
          ))
        }
      </ul>

      <Script src="/js/hashChanger.js" strategy="lazyOnload" />
    </>
  );
}

export default ProjectNavigation;