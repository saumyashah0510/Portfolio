import { motion } from "framer-motion";

/* =======================
   PERIODIC ELEMENT TILE
======================= */
const ElementBlock = ({ symbol, number, name, type = "green" }) => {
  const color = type === "blue" ? "bb-blue" : "bb-green";

  return (
    <motion.div
      className={`relative w-24 h-24 md:w-32 md:h-32 
      border-4 border-${color} bg-black/80 
      backdrop-blur-md flex flex-col items-center justify-center 
      shadow-[0_0_30px_rgba(0,255,150,0.25)]
      hover:shadow-[0_0_50px_rgba(0,255,150,0.6)]`}
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ type: "spring", bounce: 0.5, duration: 1.2 }}
      whileHover={{ scale: 1.15, rotate: 2 }}
    >
      <span className="absolute top-1 left-1 text-xs text-white/70 font-bold">
        {number}
      </span>

      <span className={`text-6xl md:text-7xl font-extrabold text-${color}`}>
        {symbol}
      </span>

      <span className="absolute bottom-1 right-1 text-[10px] text-gray-400 font-mono">
        {name}
      </span>
    </motion.div>
  );
};

/* =======================
   FLOATING CRYSTALS
======================= */
const Crystal = ({ delay, x, size, duration }) => (
  <motion.div
    className="absolute bottom-[-120px] bg-bb-blue/30 border border-bb-blue backdrop-blur-sm"
    style={{
      left: `${x}%`,
      width: size,
      height: size,
      clipPath: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
    }}
    animate={{
      y: -1300,
      rotate: 720,
      opacity: [0, 0.9, 0],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "linear",
    }}
  />
);

export default function HeroBreakingBad() {
  return (
    <section className="relative min-h-screen bg-black overflow-hidden flex items-center justify-center">

      {/* LAB ATMOSPHERE */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#1b3a1b,_#000)]" />
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(#00ff8855_1px,transparent_1px),linear-gradient(90deg,#00ff8855_1px,transparent_1px)] bg-[size:60px_60px]" />
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* SCANLINES */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(transparent_95%,white_100%)] bg-[length:100%_4px]" />

      {/* CRYSTALS */}
      <Crystal delay={0} x={10} size={40} duration={14} />
      <Crystal delay={3} x={30} size={60} duration={18} />
      <Crystal delay={6} x={50} size={30} duration={12} />
      <Crystal delay={1} x={70} size={50} duration={16} />
      <Crystal delay={5} x={85} size={35} duration={20} />

      {/* CONTENT */}
      <div className="relative z-10 text-center">

        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-bb-green tracking-[0.5em] text-xs uppercase font-mono"
        >
          Respect the Process
        </motion.p>

        {/* DEVELOPER */}
        <div className="flex flex-wrap gap-3 justify-center">
          <ElementBlock symbol="De" number="01" name="Design" />
          <ElementBlock symbol="V" number="23" name="Velocity" />
          <ElementBlock symbol="El" number="11" name="Engineering" type="blue" />
          <ElementBlock symbol="Op" number="99" name="Optimization" type="blue" />
          <ElementBlock symbol="Er" number="68" name="Reliability" type="blue" />
        </div>

        {/* PROFESSIONAL LINE */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="mt-10 text-bb-blue font-mono text-xs tracking-widest"
        >
          Design • Architecture • Performance • Reliability

        </motion.div>

        {/* SCROLL */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 mt-24"
          animate={{ y: [0, 12, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="h-14 w-[1px] bg-gradient-to-b from-bb-green to-transparent mx-auto" />
        </motion.div>
      </div>
    </section>
  );
}
