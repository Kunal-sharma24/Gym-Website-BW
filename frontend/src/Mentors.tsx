import type React from "react";
import { motion } from "framer-motion";

const MENTORS = [
  {
    name: "Coach Avery Lane",
    avatar: "https://randomuser.me/api/portraits/men/20.jpg",
    title: "Strength & Conditioning",
    bio: "10+ years guiding athletes and helping members break plateaus.",
  },
  {
    name: "Coach Samira Patel",
    avatar: "https://randomuser.me/api/portraits/women/31.jpg",
    title: "HIIT & Mobility",
    bio: "Certified HIIT trainer bringing energy, variety, and science to every workout.",
  },
  {
    name: "Coach Damian Fox",
    avatar: "https://randomuser.me/api/portraits/men/11.jpg",
    title: "Muscle Gain Specialist",
    bio: "Helping you build results with expert routines & motivation.",
  },
  {
    name: "Coach Thea Rossi",
    avatar: "https://randomuser.me/api/portraits/women/22.jpg",
    title: "Mind & Body Coach",
    bio: "Yoga and mobility coach blending strength, balance, and recovery.",
  },
  {
    name: "Coach Max Kim",
    avatar: "https://randomuser.me/api/portraits/men/35.jpg",
    title: "Cardio & Endurance",
    bio: "Turning long sessions into exciting, transformative routines.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1 } }),
};

const Mentors: React.FC = () => (
  <section className="py-16 px-6 max-w-5xl mx-auto">
    <h2 className="text-3xl md:text-4xl font-extrabold mb-8 text-center tracking-tight">Mentors</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {MENTORS.map((m, i) => (
        <motion.div
          key={m.name}
          custom={i}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
          variants={cardVariants}
          whileHover={{ scale: 1.03, boxShadow: "0px 4px 48px #00000022" }}
          className="flex flex-col items-center bg-white dark:bg-black border border-neutral-200 dark:border-neutral-700 rounded-xl shadow-lg p-7 pb-5 min-h-[270px] relative overflow-hidden transition-all duration-300"
        >
          <img
            src={m.avatar}
            alt={m.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-neutral-300 dark:border-neutral-700 mb-3 grayscale"
            loading="lazy"
          />
          <div className="text-lg font-semibold text-black dark:text-white mb-0.5 text-center">{m.name}</div>
          <div className="text-sm uppercase tracking-widest text-neutral-700 dark:text-neutral-200 mb-2 text-center opacity-75">{m.title}</div>
          <div className="italic text-neutral-500 dark:text-neutral-300 text-center">{m.bio}</div>
          <div className="absolute right-4 top-4 text-[32px] text-neutral-200 dark:text-neutral-700 pointer-events-none select-none opacity-15">★</div>
        </motion.div>
      ))}
    </div>
  </section>
);
export default Mentors;
