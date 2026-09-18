// src/AnimatedHeadingPop.jsx
import React from 'react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.20,   // 200 ms between letters
    }
  }
};

const letterVariants = {
  hidden: { opacity: 0, scale: 0.3 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.32,          // 300 ms per letter
      ease: 'easeOut',
      repeat: 0                // explicitly no repeats
    }
  }
};

export function AnimatedHeading() {
  const text = "TrackMySpend";

  return (
    <motion.h1
      className="font-sans font-bold text-[2rem] tracking-tight text-customLavender inline-flex"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {text.split("").map((char, idx) => (
        <motion.span key={idx} variants={letterVariants}>
          {char}
        </motion.span>
      ))}
    </motion.h1>
  );
}
