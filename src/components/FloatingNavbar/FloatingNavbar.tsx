"use client";
import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/utils/classNames";
import Link from "next/link";

type Props = {
  items: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
};

function FloatingNavbar({ items, className }: Props) {
  const { scrollYProgress } = useScroll();

  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    // Check if current is not undefined and is a number
    if (typeof current === "number") {
      let direction = current! - scrollYProgress.getPrevious()!;

      if (scrollYProgress.get() < 0.05) {
        setVisible(false);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -200,
        }}
        animate={{
          y: visible ? 0 : -200,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "flex gap-4 max-w-fit fixed top-10 inset-x-0 mx-auto border border-transparent bg-primary-dark dark:bg-primary-light text-primary-light dark:text-primary-dark shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] py-4 px-8  items-center justify-center space-x-4 transition-all",
          className
        )}
      >
        <Link href="/" className="group border text-sm font-medium relative border-primary-light dark:border-primary-dark px-4 py-2 hover:border-primary-light hover:text-primary">
          <span>Home</span>
          <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-primary to-transparent h-px" />
        </Link>
        {items.map((item: any) => (
          <Link
            key={`link-${item.name}`}
            href={item.link}
            className={cn(
              "relative items-center flex space-x-1  hover:text-primary"
            )}
          >
            <span className="block sm:hidden">{item.icon}</span>
            <span className="hidden sm:block text-sm">{item.name}</span>
          </Link>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

export default FloatingNavbar;