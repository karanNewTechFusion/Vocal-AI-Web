
const testimonials = [
    {
      name: "Alex Singer",
      quote: "VocalAI helped me find my true voice! The feedback is spot on.",
      photo: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 5,
    },
    {
      name: "Maria Melody",
      quote: "The practice recommendations are so smart and effective.",
      photo: "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 5,
    },
    {
      name: "Chris Harmony",
      quote: "I love the exportable reports. Makes sharing progress easy!",
      photo: "https://randomuser.me/api/portraits/men/65.jpg",
      rating: 4,
    },
    {
      name: "Sophie Tune",
      quote: "The best AI coach for singers. Highly recommended!",
      photo: "https://randomuser.me/api/portraits/women/68.jpg",
      rating: 5,
    },
  ];
  
//   export default function TestimonialsSection() {
//     return (
//       <section className="py-24 px-4 md:px-16" id="testimonials">
//         <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-accent-blue via-accent-purple to-accent-pink bg-clip-text text-transparent">
//           What Artists Say
//         </h2>
  
//         {/* Scrollable testimonial container */}
//         <div className="testimonial-swiper no-scrollbar auto-scroll flex gap-8 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4">
//           {testimonials.map((t, i) => (
//             <div
//               key={i}
//               className="glass snap-center min-w-[320px] max-w-xs p-8 rounded-xl flex flex-col items-center text-center hover:neon transition duration-300"
//             >
//               <img
//                 src={t.photo}
//                 alt={t.name}
//                 className="w-20 h-20 rounded-full mb-4 border-4 border-accent-pink object-cover"
//               />
//               <h3 className="text-lg font-semibold mb-2">{t.name}</h3>
//               <div className="flex mb-2">
//                 {Array.from({ length: t.rating }).map((_, idx) => (
//                   <span key={idx} className="text-accent-pink text-xl">★</span>
//                 ))}
//                 {Array.from({ length: 5 - t.rating }).map((_, idx) => (
//                   <span key={idx} className="text-gray-600 text-xl">★</span>
//                 ))}
//               </div>
//               <p className="text-gray-300">"{t.quote}"</p>
//             </div>
//           ))}
//         </div>
//       </section>
//     );
//   }
export default function TestimonialsSection() {
    const repeatedTestimonials = [...testimonials, ...testimonials]; // duplicate for seamless scroll
  
    return (
      <section className="py-24 px-4 md:px-16 overflow-hidden" id="testimonials">
        <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-accent-blue via-accent-purple to-accent-pink bg-clip-text text-transparent">
          What Artists Say
        </h2>
  
        <div className="testimonial-track flex w-max gap-8 animate-scroll-x">
          {repeatedTestimonials.map((t, i) => (
            <div
              key={i}
              className="glass min-w-[320px] max-w-xs p-8 rounded-xl flex flex-col items-center text-center hover:neon transition duration-300"
            >
              <img
                src={t.photo}
                alt={t.name}
                className="w-20 h-20 rounded-full mb-4 border-4 border-accent-pink object-cover"
              />
              <h3 className="text-lg font-semibold mb-2">{t.name}</h3>
              <div className="flex mb-2">
                {Array.from({ length: t.rating }).map((_, idx) => (
                  <span key={idx} className="text-accent-pink text-xl">★</span>
                ))}
                {Array.from({ length: 5 - t.rating }).map((_, idx) => (
                  <span key={idx} className="text-gray-600 text-xl">★</span>
                ))}
              </div>
              <p className="text-gray-300">"{t.quote}"</p>
            </div>
          ))}
        </div>
      </section>
    );
  }
  