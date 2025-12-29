"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

export default function CustomPixelParallax() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end start"],
  });

  const spring = useSpring(scrollYProgress, { stiffness: 90, damping: 40 });

  // Final Y sama untuk semua layer agar align sempurna
  const FINAL_Y = "-35%"; // tweak ini kalau alignment masih off di akhir

  const yBg = useTransform(spring, [0, 1], ["0%", FINAL_Y]);

  const opacityMid1 = useTransform(spring, [0.1, 0.35], [0, 1]);
  const yMid1 = useTransform(spring, [0.1, 1], ["90%", FINAL_Y]);

  const opacityMid2 = useTransform(spring, [0.3, 0.55], [0, 1]);
  const yMid2 = useTransform(spring, [0.3, 1], ["70%", FINAL_Y]);

  const opacityFg = useTransform(spring, [0.4, 0.7], [0, 1]);
  const yFg = useTransform(spring, [0.4, 1], ["55%", FINAL_Y]);

  return (
    <section
      ref={container}
      className="relative w-full"
      // Tinggi container responsif: minimal 4x screen height, maksimal 5x, clamp biar ga gila di mobile
      style={{
        height: "clamp(380vh, 420vh, 500vh)", // base 420vh, mobile lebih pendek, desktop lebih panjang
      }}
    >
      <div
        className="sticky top-0 h-screen overflow-hidden
    bg-linear-to-b from-blue-950 via-blue-800 to-blue-400
    md:from-blue-950 md:via-blue-700 md:to-sky-300"
      >
        {/* Layer 1: Background */}
        <motion.div
          style={{ y: yBg }}
          className="absolute inset-0 bg-[url('/frame/hero/1.png')] bg-cover bg-center z-10 [image-rendering:pixelated]"
        />

        {/* Layer 2: Mid 1 */}
        <motion.div
          style={{ y: yMid1, opacity: opacityMid1 }}
          className="absolute inset-0 bg-[url('/frame/hero/2.png')] bg-cover md:bg-center bg-top z-20 [image-rendering:pixelated]"
        />

        {/* Layer 3: Mid 2 */}
        <motion.div
          style={{ y: yMid2, opacity: opacityMid2 }}
          className="absolute inset-0 bg-[url('/frame/hero/3.png')] bg-cover md:bg-center bg-top z-30 [image-rendering:pixelated]"
        />

        {/* Layer 4: Foreground */}
        <motion.div
          style={{ y: yFg, opacity: opacityFg }}
          className="absolute inset-0 bg-[url('/frame/hero/4.png')] bg-cover md:bg-center bg-bottom z-40 [image-rendering:pixelated]"
        />

        {/* Overlay text - responsif */}
        <div className="relative z-50 h-full flex flex-col items-center justify-center text-white text-center px-4 sm:px-8 pointer-events-none">
          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1.4 }}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold drop-shadow-2xl mb-4 tracking-tight"
          >
            My Cozy Farm
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 1 }}
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl drop-shadow-2lg max-w-2xl"
          >
            With my bunny girl and cute cat...
          </motion.p>
        </div>
      </div>
    </section>
  );
}
