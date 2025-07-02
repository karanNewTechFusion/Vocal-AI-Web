// import imagePath from "../assets/images/imagePath";

// export default function AboutSection() {
//   return (
    
//     <section className="py-24 px-4 md:px-16 flex flex-col md:flex-row items-center gap-12" id="about">
      
//       <div className="flex-1 max-w-xl">
//         <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-accent-blue via-accent-purple to-accent-pink bg-clip-text text-transparent">Meet Your AI Vocal Coach</h2>
//         <p className="text-lg mb-6 text-gray-300">Our AI vocal coach listens, analyzes, and guides you to your best performance. Get instant feedback on pitch, articulation, and style. Practice smarter with personalized recommendations and track your progress with exportable reports.</p>
//         <ul className="list-disc list-inside text-gray-400">
//           <li>Real-time vocal analysis</li>
//           <li>Personalized practice routines</li>
//           <li>Actionable feedback and scoring</li>
//         </ul>
//       </div>
//       <div className="flex-1 flex justify-center">
//         {/* Colorful gradient border and curved image */}
//         <div className="w-80 h-56 flex items-center justify-center bg-gradient-to-br from-accent-blue via-accent-purple to-accent-pink p-1 rounded-2xl shadow-xl">
//           <div className="w-full h-full bg-dark rounded-2xl flex items-center justify-center">
//             <img src={imagePath.ai2} alt="AI coaching illustration" className="w-80 h-52 object-cover rounded-2xl" />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// } 

import imagePath from "../assets/images/imagePath";

export default function AboutSection() {
  return (
    <section className="py-24 px-4 md:px-16" id="about">
      
      {/* Centered Section Heading */}
      <div className="text-center mb-16">
        <h3 className="text-4xl font-bold text-accent-pink">About Us</h3>
      </div>

      {/* Content below the heading */}
      <div className="flex flex-col md:flex-row items-center gap-12">
        
        <div className="flex-1 max-w-xl">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-accent-blue via-accent-purple to-accent-pink bg-clip-text text-transparent">
            Meet Your AI Vocal Coach
          </h2>
          <p className="text-lg mb-6 text-gray-300">
            Our AI vocal coach listens, analyzes, and guides you to your best performance. Get instant feedback on pitch, articulation, and style. Practice smarter with personalized recommendations and track your progress with exportable reports.
          </p>
          <ul className="list-disc list-inside text-gray-400">
            <li>Real-time vocal analysis</li>
            <li>Personalized practice routines</li>
            <li>Actionable feedback and scoring</li>
          </ul>
        </div>

        <div className="flex-1 flex justify-center">
          <div className=" flex items-center justify-center bg-gradient-to-br from-accent-blue via-accent-purple to-accent-pink p-1 rounded-2xl shadow-xl">
            <div className="w-full h-full bg-dark rounded-2xl flex items-center justify-center">
              <img
                src={imagePath.ai2}
                alt="AI coaching illustration"
                className="w-80 h-80 object-cover rounded-2xl"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
