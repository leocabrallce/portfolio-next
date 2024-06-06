import React from "react";
import { motion, Transition, SVGMotionProps } from "framer-motion";

type Props = {
  isOpen: boolean;
  width?: number;
  height?: number;
  strokeWidth?: number;
  transition?: Transition;
  lineProps?: SVGMotionProps<SVGLineElement>;
  lineClassNames?: string;
};

const MenuButton = ({ isOpen = false, width = 24, height = 24, strokeWidth = 2, transition = {}, lineProps = {}, lineClassNames = "" }: Props) => {
  const variant = isOpen ? "opened" : "closed";
  const top = {
    closed: {
      rotate: 0,
      translateY: 0
    },
    opened: {
      rotate: 45,
      translateY: 2
    }
  };
  const center = {
    closed: {
      opacity: 1
    },
    opened: {
      opacity: 0
    }
  };
  const bottom = {
    closed: {
      rotate: 0,
      translateY: 0
    },
    opened: {
      rotate: -45,
      translateY: -2
    }
  };
  lineProps = {
    strokeWidth: strokeWidth as number,
    vectorEffect: "non-scaling-stroke",
    initial: "closed",
    animate: variant,
    transition,
  };
  const unitHeight = 4;
  const unitWidth = (unitHeight * (width as number)) / (height as number);

  return (
    <motion.svg
      viewBox={`0 0 ${unitWidth} ${unitHeight}`}
      overflow="visible"
      preserveAspectRatio="none"
      width={width}
      height={height}
      className="cursor-pointer"
    >
      <motion.line
        x1="0"
        x2={unitWidth}
        y1="0"
        y2="0"
        variants={top}
        className={lineClassNames}
        {...lineProps}
      />
      <motion.line
        x1="0"
        x2={unitWidth}
        y1="2"
        y2="2"
        variants={center}
        className={lineClassNames}
        {...lineProps}
      />
      <motion.line
        x1="0"
        x2={unitWidth}
        y1="4"
        y2="4"
        variants={bottom}
        className={lineClassNames}
        {...lineProps}
      />
    </motion.svg>
  );
};

export default MenuButton;