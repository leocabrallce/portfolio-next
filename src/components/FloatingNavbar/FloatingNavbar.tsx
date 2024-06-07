"use client";
import MenuButton from "@/components/MenuButton";
import { useRouter } from "next/navigation";

import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { cn } from "@/utils/classNames";

type Theme = "light" | "dark" | "system";

function FloatingNavbar() {
  const [visible, setVisible] = useState(false);
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  const items = [
    { name: "Home", link: "/" },
    { name: "Projects", link: "/projects" },
    { name: "Contact", link: "/contact" },
  ];

  const usedTheme: Theme = theme as Theme || "system";
  const buttonClassNames = cn("relative z-50 gap-4 w-fit p-4 items-center justify-center space-x-4 border-2 cursor-pointer transition-colors", {
    "hover:border-primary-light dark:hover:border-primary-dark border-primary-dark dark:border-primary-light bg-primary-dark dark:bg-primary-light text-primary-light dark:text-primary-dark": !visible,
    "hover:border-primary-dark dark:hover:border-primary-light border-primary-light dark:border-primary-dark bg-primary-light dark:bg-primary-dark text-primary-dark dark:text-primary-light": visible,
  });
  const lineClassNames = cn({
    "stroke-primary-light dark:stroke-primary-dark": !visible,
    "stroke-primary-dark dark:stroke-primary-light": visible,
  });
  const navbarClasses = cn(
    {
      "hidden": !visible,
    },
    "w-screen h-screen fixed top-0 right-0 transition-all backdrop-blur-sm bg-primary-light/25 dark:bg-primary-dark/25"
  );
  const buttonClasses = "flex items-center justify-center py-4 border-b-2 transition-colors";

  // change html class based on theme
  useEffect(() => {
    document.documentElement.classList.remove("dark", "light", "system");
    document.documentElement.classList.add(usedTheme);
  }, [usedTheme]);

  useEffect(() => {
    if (visible) {
      const handleEsc = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          setVisible(false);
        }
      };

      document.addEventListener("keydown", handleEsc);

      return () => {
        document.removeEventListener("keydown", handleEsc);
      };
    }
  }, [visible]);

  const handlePageChange = (link: string) => {
    setVisible(false);
    router.push(link);
  };


  return (
    <div className="fixed top-6 right-6 md:top-8 md:right-8 z-40">
      <button
        aria-label="toggle menu"
        type="button"
        tabIndex={0}
        className={buttonClassNames}
        onClick={() => setVisible(!visible)}
      >
        <MenuButton isOpen={visible} lineClassNames={lineClassNames} />
      </button>

      <div className={navbarClasses} tabIndex={visible ? 0 : -1}>
        <div className="fixed top-0 right-0 w-full md:w-3/5 lg:w-2/5 h-dvh">
          <div className="z-40 w-full h-full m-0 pt-32 bg-primary-light dark:bg-primary-dark text-primary-dark dark:text-primary-light">

            <div className="flex flex-col gap-4">
              <div className="flex flex-col w-fit pl-4 sm:pl-12 md:pl-24">
                <button onClick={() => setTheme('light')} className={cn(buttonClasses, "border-primary-dark", { "hover:border-primary-light": theme !== "light" })}>Light Mode</button>
                <button onClick={() => setTheme('dark')} className={cn(buttonClasses, "border-primary-light", { "hover:border-primary-dark": theme !== "dark" })}>Dark Mode</button>
              </div>

              <div className="flex flex-col gap-2 items-start w-full mt-16">
                {items.map((item) => (
                  <div onClick={() => handlePageChange(item.link)} key={item.link} className="flex items-center justify-center cursor-pointer gap-4 py-4 pl-4 sm:pl-12 md:pl-24 border-b-2 transition-colors border-primary-light dark:border-primary-dark hover:border-primary-dark dark:hover:border-primary-light">
                    <span className="text-6xl font-title uppercase">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingNavbar;;