import type React from "react";
import { motion } from "framer-motion";

const TESTIMONIALS = [
  {
    name: "Alex Carter",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    quote: "Monochrome Gym gave me the confidence and discipline I needed. The atmosphere is inspiring, and the staff are just incredible!",
  },
  {
    name: "Jamie Lee",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    quote: "From day one, the trainers pushed me to my best. I've never felt stronger! Beautiful, focused interiors too.",
  },
  {
    name: "Morgan Tate",
    avatar: "https://randomuser.me/api/portraits/men/88.jpg",
    quote: "Every class has a great vibe, and I love the motivation I get here. Really premium experience.",
  },
  {
    name: "Riley Singh",
    avatar: "https://randomuser.me/api/portraits/men/55.jpg",
    quote: "Sleek, minimalist space and all the right equipment. I can actually see my progress week by week.",
  },
  {
    name: "Jordan Chen",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    quote: "I joined for the expert trainers, but stayed for the supportive community. Easily the best gym in town.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1 } }),
};

const Testimonials: React.FC = () => (
  <section className="py-16 px-6 max-w-5xl mx-auto">
    <h2 className="text-3xl md:text-4xl font-extrabold mb-8 text-center tracking-tight">Testimonials</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {TESTIMONIALS.map((t, i) => (
        <motion.div
          key={t.name}
          custom={i}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
          variants={cardVariants}
          whileHover={{ scale: 1.03, boxShadow: "0px 4px 48px #00000022" }}
          className="flex flex-col items-center bg-white dark:bg-black border border-neutral-200 dark:border-neutral-700 rounded-xl shadow-lg p-7 pb-5 min-h-[270px] relative overflow-hidden transition-all duration-300"
        >
          <img
            src={t.avatar}
            alt={t.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-neutral-300 dark:border-neutral-700 mb-4 grayscale"
            loading="lazy"
          />
          <blockquote className="italic text-neutral-700 dark:text-neutral-100 font-medium mb-4 text-center">
            “{t.quote}”
          </blockquote>
          <div className="font-semibold text-base tracking-wide text-black dark:text-white mb-2">{t.name}</div>
          <div className="absolute right-4 top-4 text-[40px] text-neutral-200 dark:text-neutral-700 pointer-events-none select-none opacity-25">“</div>
        </motion.div>
      ))}
    </div>
  </section>
);
export default Testimonials;
