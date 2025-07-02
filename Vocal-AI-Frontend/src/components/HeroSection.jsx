

import imagePath from '../assets/images/imagePath';

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex flex-col md:flex-row items-center justify-between min-h-screen pt-32 pb-16 px-6 text-center md:text-left gap-10 overflow-hidden"
    >
      {/* Background Animation (can be replaced with Lottie) */}
      <div className="absolute inset-0 -z-10">
        <div className="w-full h-full bg-gradient-to-br from-accent-blue/30 via-accent-purple/20 to-accent-pink/30 animate-pulse" />
      </div>

      {/* Text Section */}
      <div className="flex-1 flex flex-col justify-center items-center md:items-start z-10 text-white">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-tight bg-gradient-to-r from-accent-blue via-accent-purple to-accent-pink bg-clip-text text-transparent">
          Empower Your Voice with AI Coaching
        </h1>
        <p className="text-base sm:text-lg md:text-xl mb-8 max-w-xl text-gray-200">
          AI-driven feedback, pitch analysis, and promotional tools for music artists.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          <a
            href="#trial"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-accent-blue via-accent-purple to-accent-pink text-white font-bold text-base sm:text-lg shadow-lg hover:scale-105 transition duration-200"
          >
            Try Now
          </a>
          <a
            href="#demo"
            className="px-6 py-3 rounded-xl border-2 border-accent-pink text-accent-pink font-bold text-base sm:text-lg hover:bg-accent-pink/10 transition duration-200"
          >
            See Demo
          </a>
        </div>
      </div>

      {/* Image Section */}
      <div className="flex-1 flex justify-center items-center z-10">
        <img
          src={imagePath.ai3}
          alt="AI music coach with student"
          className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg rounded-3xl shadow-2xl object-cover max-h-[450px] sm:max-h-[500px] md:max-h-[550px]"
        />
      </div>
    </section>
  );
}


