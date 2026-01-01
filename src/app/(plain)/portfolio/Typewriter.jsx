"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";


export default function Typewriterclient() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <Typewriter
        options={{
          strings: [
            "Priyanshu Verma",
            "Frontend Engineer",
            "Software Engineer",
            "Full-Stack Engineer",
          ],
          autoStart: true,
          loop: true,
          delay: 45,
          deleteSpeed: 30,
        }}
      />
    </motion.div>
  );
}
