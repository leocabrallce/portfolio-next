"use client";
import { useState, useMemo, useCallback } from "react";
import { Project, ProjectCategory } from "@/graphql/generated";
import ProjectRow from "@/components/ProjectRow";
import { cn } from "@/utils/classNames";

type Props = {
  projects: Project[];
};

function ProjectsFilteredList({ projects }: Props) {
  const categories = projects.flatMap((project) => project.projectCategories as ProjectCategory[]).filter((category, index, self) => self.findIndex((c) => c._id === category._id) === index);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);

  const handleCategoryFilter = useCallback(
    (category: string) => {
      setSelectedCategories((prev) => {
        if (prev.includes(category)) {
          return prev.filter((c) => c !== category);
        }

        return [...prev, category];
      });
    },
    [setSelectedCategories]
  );

  // handling the filter in-memory as the data is not paginated
  useMemo(() => {
    if (selectedCategories.length === 0) {
      setFilteredProjects(projects);
      return;
    }

    setFilteredProjects(
      projects.filter((project) =>
        project.projectCategories?.some((category) => selectedCategories.includes(category?._id || ""))
      )
    );
  }, [selectedCategories, projects]);

  // TODO: Refactor buttons/pills to a separate component
  return (
    <div>
      <div className="flex gap-4">
        <button
          onClick={() => setSelectedCategories([])}
          className={
            cn(`px-4 py-2 text-xs border border-primary-dark dark:border-primary-light`, {
              "bg-primary-dark dark:bg-primary-light text-primary-light dark:text-primary-dark": selectedCategories.length === 0,
              "bg-white dark:bg-primary-dark text-primary-dark dark:text-white": selectedCategories.length > 0
            })
          }
        >
          All
        </button>

        {categories.map((category: ProjectCategory) => (
          <button
            key={category._id}
            onClick={() => handleCategoryFilter(category._id || "")}
            className={
              cn(`px-4 py-2 text-xs border border-primary-dark dark:border-primary-light`, {
                "bg-primary-dark dark:bg-primary-light text-primary-light dark:text-primary-dark": selectedCategories.includes(category._id || ""),
                "bg-white dark:bg-primary-dark text-primary-dark dark:text-white": !selectedCategories.includes(category._id || "")
              })
            }
          >
            {category.name}
          </button>
        ))}
      </div>

      {filteredProjects.map((project) => (
        <ProjectRow key={project._id} project={project} />
      ))}
    </div>
  );
}

export default ProjectsFilteredList;