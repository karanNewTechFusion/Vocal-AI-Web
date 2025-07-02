import imagePath from '../assets/images/imagePath';
import { motion } from 'framer-motion';

const features = [
  {
    title: " Pitch & Articulation Analysis",
    icon: "🎤",
    desc: "Instantly see your pitch and clarity in real time as you sing.",
  },
  {
    title: "Smart Practice Recommendations",
    icon: "💡",
    desc: "Personalized exercises to target your unique vocal needs.",
  },
  {
    title: "AI-powered Voice Feedback",
    icon: "⭐",
    desc: "Get a detailed score and feedback after every session.",
  },
  {
    title: "Exportable Artist Reports",
    icon: "📄",
    desc: "Download your progress and share with coaches or fans.",
  },
];

const cardVariants = {
  offscreen: { opacity: 0, y: 40 },
  onscreen: { opacity: 1, y: 0, transition: { type: 'spring', bounce: 0.3, duration: 0.7 } },
};

export default function FeaturesSection() {
  return (
    <section className="py-8 px-8 sm:px-12 md:px-16 bg-dark/80" id="features">
      <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-accent-blue via-accent-purple to-accent-pink bg-clip-text text-transparent">
        Features
      </h2>

      <div className="flex flex-col md:flex-row items-center gap-12 mb-12">
        {/* Image with colorful, curved border */}
        <div className="flex-1 flex justify-center">
          <div className="w-72 sm:w-96 md:w-[28rem] max-h-[480px] bg-gradient-to-br from-accent-blue via-accent-purple to-accent-pink p-1 rounded-2xl shadow-2xl flex items-center justify-center">
            <img
              src={imagePath.ai1}
              alt="AI vocal coach teaching"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              className="relative group p-[2px] rounded-2xl bg-gradient-to-br from-accent-blue via-accent-purple to-accent-pink shadow-lg max-w-xs mx-auto"
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.3 }}
              variants={cardVariants}
            >
              <div className="glass rounded-2xl h-full flex flex-col items-center text-center p-5 transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl group-hover:bg-dark/70">
                <div className="mb-3 flex items-center justify-center">
                  <span className="text-3xl md:text-4xl flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-accent-blue via-accent-purple to-accent-pink shadow-md group-hover:scale-110 transition-transform duration-300 animate-pulse-slow">
                    {f.icon}
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-white">
                  {f.title}
                </h3>
                <div className="w-12 h-1 mx-auto mb-3 rounded-full bg-gradient-to-r from-accent-blue via-accent-purple to-accent-pink opacity-80" />
                <p className="text-gray-300 min-h-[44px] text-sm">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
