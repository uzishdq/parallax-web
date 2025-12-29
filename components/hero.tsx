"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

export default function CustomPixelParallax() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end start"],
  });

  const spring = useSpring(scrollYProgress, { stiffness: 90, damping: 40 }); // lebih lembut untuk pixel feel

  const yBg = useTransform(spring, [0, 1], ["0%", "0%"]);

  const yMid1 = useTransform(spring, [0.1, 1], ["70%", "-40%"]);
  const opacityMid1 = useTransform(spring, [0.1, 0.35], [0, 1]);

  const yMid2 = useTransform(spring, [0.3, 1], ["110%", "-50%"]);
  const opacityMid2 = useTransform(spring, [0.3, 0.55], [0, 1]);

  // 🔥 FOREGROUND PALING PENTING
  const yFg = useTransform(spring, [0.4, 1], ["90%", "-50%"]);
  const opacityFg = useTransform(spring, [0.4, 0.7], [0, 1]);

  return (
    <section ref={container} className="relative h-[420vh] md:h-[460vh]">
      <div className="sticky top-0 h-screen overflow-hidden bg-black">
        {/* bg-black biar transisi mulus */}
        {/* 1. Background: langit + awan */}
        <motion.div
          style={{ y: yBg }}
          className="absolute inset-0 bg-[url('/bg/1.png')] bg-cover bg-center z-10 [image-rendering:pixelated]"
        />
        {/* 2. Mid 1: rumput + bukit */}
        <motion.div
          style={{ y: yMid1, opacity: opacityMid1 }}
          className="absolute inset-0 bg-[url('/bg/2.png')] bg-cover bg-center z-20 [image-rendering:pixelated]"
        />
        {/* 3. Mid 2: detail tanah + partial karakter */}
        <motion.div
          style={{ y: yMid2, opacity: opacityMid2 }}
          className="absolute inset-0 bg-[url('/bg/3.png')] bg-cover bg-center z-30 [image-rendering:pixelated]"
        />
        {/* 4. Foreground: gadis + kucing full */}
        <motion.div
          style={{ y: yFg, opacity: opacityFg }}
          className="absolute inset-0 bg-[url('/bg/4.png')] bg-cover bg-center z-40 [image-rendering:pixelated]"
        />
        {/* Overlay text opsional */}
        <div className="relative z-50 h-full flex flex-col items-center justify-center text-white text-center px-4 pointer-events-none">
          <motion.h1
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1.4 }}
            className="text-5xl md:text-7xl font-bold drop-shadow-2xl mb-4"
          >
            My Cozy Farm
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 1 }}
            className="text-xl md:text-3xl drop-shadow-lg"
          >
            With my bunny girl and cute cat...
          </motion.p>
        </div>
      </div>
    </section>
  );
}
