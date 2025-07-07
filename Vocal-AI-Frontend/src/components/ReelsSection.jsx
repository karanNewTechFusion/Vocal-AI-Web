import { useState, useEffect, useRef } from 'react';

const reels = [
  {
    id: 1,
    url: "https://www.w3schools.com/html/mov_bbb.mp4",
    caption: "Vocal warmup by Sarah",
    likes: 24,
  },
  {
    id: 2,
    url: "https://www.w3schools.com/html/movie.mp4",
    caption: "Pitch practice by Alex",
    likes: 18,
  },
  {
    id: 3,
    url: "https://www.w3schools.com/html/mov_bbb.mp4",
    caption: "VocalAI demo session",
    likes: 31,
  },
];

export default function ReelsSection() {
  const [playingIndex, setPlayingIndex] = useState(null);
  const [likes, setLikes] = useState(reels.map(r => r.likes));
  const [liked, setLiked] = useState(reels.map(() => false));
  const [loaded, setLoaded] = useState(reels.map(() => false));
  const videoRefs = useRef([]);

  useEffect(() => {
    videoRefs.current.forEach((video) => {
      if (video) video.pause();
    });
  }, []);

  const handlePlayPause = (idx) => {
    videoRefs.current.forEach((video, i) => {
      if (!video) return;
      if (i === idx) {
        if (playingIndex === idx) {
          video.pause();
          setPlayingIndex(null);
        } else {
          video.play();
          setPlayingIndex(idx);
        }
      } else {
        video.pause();
      }
    });
  };

  const handleLike = (idx) => {
    setLiked((prev) => {
      const arr = [...prev];
      arr[idx] = !arr[idx];
      return arr;
    });
    setLikes((prev) => {
      const arr = [...prev];
      arr[idx] = liked[idx] ? arr[idx] - 1 : arr[idx] + 1;
      return arr;
    });
  };

  return (
    <section className="py-8 px-4 md:px-16" id="reels">
      <h2 className="text-4xl font-bold mb-10 text-center bg-gradient-to-r from-accent-blue via-accent-purple to-accent-pink bg-clip-text text-transparent">
        Reels
      </h2>

      <div className="flex sm:hidden gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-4">
        {reels.map((reel, idx) => (
          <div
            key={reel.id}
            className="snap-center shrink-0 w-[90vw] h-[120vw] rounded-2xl relative group glass flex flex-col items-center shadow-xl"

          >
            <div className="relative w-full h-full bg-black overflow-hidden rounded-2xl flex justify-center items-center">
              <video
                ref={(el) => (videoRefs.current[idx] = el)}
                id={`reel-video-${idx}`}
                src={reel.url}
                controls={false}
                loop
                muted
                playsInline
                onLoadedData={() =>
                  setLoaded((prev) => {
                    const arr = [...prev];
                    arr[idx] = true;
                    return arr;
                  })
                }
                className={`rounded-2xl w-full h-full object-cover transition-opacity duration-300 ${
                  loaded[idx] ? "opacity-100" : "opacity-0"
                }`}
              />
              {!loaded[idx] && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <div className="animate-spin w-8 h-8 border-4 border-accent-blue border-t-transparent rounded-full" />
                </div>
              )}

              {/* Play/Pause Button */}
              <button
                onClick={() => handlePlayPause(idx)}
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                {playingIndex === idx ? (
                  <svg
                    className="w-14 h-14 text-white/80 bg-dark/60 rounded-full p-3 shadow-lg"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <rect x="6" y="5" width="4" height="14" rx="2" fill="currentColor" />
                    <rect x="14" y="5" width="4" height="14" rx="2" fill="currentColor" />
                  </svg>
                ) : (
                  <svg
                    className="w-14 h-14 text-white/80 bg-dark/60 rounded-full p-3 shadow-lg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <polygon points="5,3 19,12 5,21" />
                  </svg>
                )}
              </button>
            </div>

            {/* Caption */}
            <div className="text-white text-sm font-medium text-center px-2 pt-2 truncate w-full">
              {reel.caption}
            </div>

            {/* Like below video on mobile */}
            <button
              onClick={() => handleLike(idx)}
              className={`mt-2 mb-4 flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all ${
                liked[idx] ? "bg-accent-pink/90 text-white" : "bg-dark/70 text-accent-pink hover:bg-accent-pink/70 hover:text-white"
              }`}
            >
              <svg
                className={`w-5 h-5 ${liked[idx] ? "text-white" : "text-accent-pink"}`}
                fill={liked[idx] ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 
                  2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 
                  4.5 2.09C13.09 3.81 14.76 3 16.5 3 
                  19.58 3 22 5.42 22 8.5c0 3.78-3.4 
                  6.86-8.55 11.54L12 21.35z"
                />
              </svg>
              <span>{likes[idx]}</span>
            </button>
          </div>
        ))}
      </div>

      {/* Desktop version - 3 cards center aligned */}
      <div className="hidden sm:flex flex-wrap justify-center gap-8">
        {reels.map((reel, idx) => (
          <div
            key={reel.id}
            className="relative group glass rounded-2xl shadow-2xl w-[44%] lg:w-[30%] max-w-xs h-72 md:h-96 flex flex-col items-center"
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden flex items-center justify-center bg-black">
              <video
                ref={(el) => (videoRefs.current[idx] = el)}
                src={reel.url}
                controls={false}
                loop
                muted
                playsInline
                onLoadedData={() => {
                  setLoaded((prev) => {
                    const arr = [...prev];
                    arr[idx] = true;
                    return arr;
                  });
                }}
                className={`rounded-2xl w-full h-full object-cover transition-opacity duration-300 ${
                  loaded[idx] ? "opacity-100" : "opacity-0"
                }`}
              />
              {!loaded[idx] && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <div className="animate-spin w-8 h-8 border-4 border-accent-blue border-t-transparent rounded-full" />
                </div>
              )}

              {/* Play/Pause Button */}
              <button
                onClick={() => handlePlayPause(idx)}
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                {playingIndex === idx ? (
                  <svg
                    className="w-14 h-14 text-white/80 bg-dark/60 rounded-full p-3 shadow-lg"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <rect x="6" y="5" width="4" height="14" rx="2" fill="currentColor" />
                    <rect x="14" y="5" width="4" height="14" rx="2" fill="currentColor" />
                  </svg>
                ) : (
                  <svg
                    className="w-14 h-14 text-white/80 bg-dark/60 rounded-full p-3 shadow-lg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <polygon points="5,3 19,12 5,21" />
                  </svg>
                )}
              </button>

              {/* Like Button on top for desktop */}
              <button
                onClick={() => handleLike(idx)}
                className={`absolute bottom-3 right-3 flex items-center gap-1 px-3 py-1.5 rounded-full shadow-md transition-all duration-200 ${
                  liked[idx] ? "bg-accent-pink/90" : "bg-dark/70 hover:bg-accent-pink/70"
                }`}
              >
                <svg
                  className={`w-6 h-6 ${
                    liked[idx] ? "text-white scale-110" : "text-accent-pink"
                  }`}
                  fill={liked[idx] ? "currentColor" : "none"}
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 
                    2 12.28 2 8.5 2 5.42 4.42 3 
                    7.5 3c1.74 0 3.41 0.81 4.5 
                    2.09C13.09 3.81 14.76 3 
                    16.5 3 19.58 3 22 5.42 
                    22 8.5c0 3.78-3.4 6.86-8.55 
                    11.54L12 21.35z"
                  />
                </svg>
                <span className="text-white text-sm font-semibold ml-1">{likes[idx]}</span>
              </button>
            </div>

            <div className="text-white text-sm font-medium text-center px-2 pb-4 pt-2 truncate w-full" title={reel.caption}>
              {reel.caption}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}









































// import { useState } from 'react';

// const reels = [
//   {
//     id: 1,
//     url: "https://www.w3schools.com/html/mov_bbb.mp4",
//     caption: "Vocal warmup by Sarah",
//     likes: 24,
//   },
//   {
//     id: 2,
//     url: "https://www.w3schools.com/html/movie.mp4",
//     caption: "Pitch practice by Alex",
//     likes: 18,
//   },
//   {
//     id: 3,
//     url: "https://www.w3schools.com/html/mov_bbb.mp4",
//     caption: "VocalAI demo session",
//     likes: 31,
//   },
// ];

// export default function ReelsSection() {
//   const [playing, setPlaying] = useState(Array(reels.length).fill(true));
//   const [likes, setLikes] = useState(reels.map(r => r.likes));
//   const [liked, setLiked] = useState(Array(reels.length).fill(false));
//   const [loaded, setLoaded] = useState(Array(reels.length).fill(false));

//   const handlePlayPause = (idx) => {
//     const updatedPlaying = playing.map((_, i) => i === idx ? !playing[idx] : false);
//     setPlaying(updatedPlaying);

//     reels.forEach((_, i) => {
//       const video = document.getElementById(`reel-video-${i}`);
//       if (video) {
//         if (i === idx) {
//           playing[idx] ? video.pause() : video.play();
//         } else {
//           video.pause();
//         }
//       }
//     });
//   };

//   const handleLike = (idx) => {
//     setLiked((prev) => {
//       const arr = [...prev];
//       arr[idx] = !arr[idx];
//       return arr;
//     });
//     setLikes((prev) => {
//       const arr = [...prev];
//       arr[idx] = liked[idx] ? arr[idx] - 1 : arr[idx] + 1;
//       return arr;
//     });
//   };

//   return (
//     <section className="py-8 px-4 md:px-16" id="reels">
//       <h2 className="text-4xl font-bold mb-10 text-center bg-gradient-to-r from-accent-blue via-accent-purple to-accent-pink bg-clip-text text-transparent">
//         Reels
//       </h2>

//       <div className="flex gap-8 overflow-x-auto pb-4 no-scrollbar snap-x snap-mandatory">
//         {reels.map((reel, idx) => (
//           <div
//             key={reel.id}
//             className="relative group glass rounded-2xl shadow-2xl snap-center w-[85vw] sm:w-52 md:w-56 h-[60vw] sm:h-72 md:h-96 flex flex-col items-center"
//           >
//             <div className="relative w-full h-full rounded-2xl overflow-hidden flex items-center justify-center bg-black">
//               {/* Video Element */}
//               <video
//                 id={`reel-video-${idx}`}
//                 src={reel.url}
//                 controls={false}
//                 autoPlay
//                 loop
//                 muted
//                 playsInline
//                 onLoadedData={() => {
//                   setLoaded((prev) => {
//                     const arr = [...prev];
//                     arr[idx] = true;
//                     return arr;
//                   });
//                 }}
//                 className={`rounded-2xl w-full h-full object-cover shadow-lg transition-opacity duration-300 ${
//                   loaded[idx] ? 'opacity-100' : 'opacity-0'
//                 }`}
//                 style={{ boxShadow: '0 0 24px 0 rgba(162,89,255,0.25)' }}
//               />
//               {/* Spinner while loading */}
//               {!loaded[idx] && (
//                 <div className="absolute inset-0 flex items-center justify-center bg-black/50">
//                   <div className="animate-spin w-8 h-8 border-4 border-accent-blue border-t-transparent rounded-full" />
//                 </div>
//               )}

//               {/* Play/Pause Button Overlay */}
//               <button
//                 onClick={() => handlePlayPause(idx)}
//                 className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
//                 tabIndex={-1}
//                 aria-label={playing[idx] ? 'Pause' : 'Play'}
//               >
//                 {playing[idx] ? (
//                   <svg
//                     className="w-14 h-14 text-white/80 bg-dark/60 rounded-full p-3 shadow-lg"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     viewBox="0 0 24 24"
//                   >
//                     <rect x="6" y="5" width="4" height="14" rx="2" fill="currentColor" />
//                     <rect x="14" y="5" width="4" height="14" rx="2" fill="currentColor" />
//                   </svg>
//                 ) : (
//                   <svg
//                     className="w-14 h-14 text-white/80 bg-dark/60 rounded-full p-3 shadow-lg"
//                     fill="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <polygon points="5,3 19,12 5,21" />
//                   </svg>
//                 )}
//               </button>

//               {/* Like Button */}
//               <button
//                 onClick={() => handleLike(idx)}
//                 className={`absolute bottom-3 right-3 flex items-center gap-1 px-3 py-1.5 rounded-full shadow-md transition-all duration-200 ${
//                   liked[idx] ? 'bg-accent-pink/90' : 'bg-dark/70 hover:bg-accent-pink/70'
//                 }`}
//                 aria-label="Like"
//               >
//                 <svg
//                   className={`w-6 h-6 transition-transform duration-200 ${
//                     liked[idx] ? 'text-white scale-110' : 'text-accent-pink'
//                   }`}
//                   fill={liked[idx] ? 'currentColor' : 'none'}
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   viewBox="0 0 24 24"
//                 >
//                   <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
//                     2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 
//                     4.5 2.09C13.09 3.81 14.76 3 16.5 3 
//                     19.58 3 22 5.42 22 8.5c0 3.78-3.4 
//                     6.86-8.55 11.54L12 21.35z"
//                   />
//                 </svg>
//                 <span
//                   className={`text-white text-sm font-semibold ml-1 transition-transform duration-200 ${
//                     liked[idx] ? 'scale-110' : ''
//                   }`}
//                 >
//                   {likes[idx]}
//                 </span>
//               </button>
//             </div>

//             {/* Caption with Tooltip */}
//             <div
//               className="text-white text-sm font-medium text-center px-2 pb-4 pt-2 truncate w-full"
//               title={reel.caption}
//             >
//               {reel.caption}
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }




















































// import { useState } from 'react';

// const reels = [
//   {
//     id: 1,
//     url: "https://www.w3schools.com/html/mov_bbb.mp4",
//     caption: "Vocal warmup by Sarah",
//     likes: 24,
//   },
//   {
//     id: 2,
//     url: "https://www.w3schools.com/html/movie.mp4",
//     caption: "Pitch practice by Alex",
//     likes: 18,
//   },
//   {
//     id: 3,
//     url: "https://www.w3schools.com/html/mov_bbb.mp4",
//     caption: "VocalAI demo session",
//     likes: 31,
//   },
//   // {
//   //   id: 4,
//   //   url: "https://www.w3schools.com/html/movie.mp4",
//   //   caption: "High notes challenge",
//   //   likes: 12,
//   // },
//   // {
//   //   id: 5,
//   //   url: "https://www.w3schools.com/html/mov_bbb.mp4",
//   //   caption: "Vocal warmup by Sarah",
//   //   likes: 24,
//   // },
//   // {
//   //   id: 6,
//   //   url: "https://www.w3schools.com/html/movie.mp4",
//   //   caption: "Pitch practice by Alex",
//   //   likes: 18,
//   // },
//   // {
//   //   id: 7,
//   //   url: "https://www.w3schools.com/html/mov_bbb.mp4",
//   //   caption: "VocalAI demo session",
//   //   likes: 31,
//   // },
//   // {
//   //   id: 8,
//   //   url: "https://www.w3schools.com/html/movie.mp4",
//   //   caption: "High notes challenge",
//   //   likes: 12,
//   // },
// ];

// export default function ReelsSection() {
//   const [playing, setPlaying] = useState(Array(reels.length).fill(true));
//   const [likes, setLikes] = useState(reels.map(r => r.likes));
//   const [liked, setLiked] = useState(Array(reels.length).fill(false));

//   const handlePlayPause = (idx) => {
//     setPlaying((prev) => {
//       const arr = [...prev];
//       arr[idx] = !arr[idx];
//       return arr;
//     });
//     const video = document.getElementById(`reel-video-${idx}`);
//     if (video) {
//       if (playing[idx]) video.pause();
//       else video.play();
//     }
//   };

//   const handleLike = (idx) => {
//     setLiked((prev) => {
//       const arr = [...prev];
//       arr[idx] = !arr[idx];
//       return arr;
//     });
//     setLikes((prev) => {
//       const arr = [...prev];
//       arr[idx] = liked[idx] ? arr[idx] - 1 : arr[idx] + 1;
//       return arr;
//     });
//   };

//   return (
//     <section className="py-8 px-4 md:px-16" id="reels">
//       <h2 className="text-4xl font-bold mb-10 text-center bg-gradient-to-r from-accent-blue via-accent-purple to-accent-pink bg-clip-text text-transparent">Reels</h2>
//       <div className="flex gap-8 overflow-x-auto pb-4 no-scrollbar">
//         {reels.map((reel, idx) => (
//           <div
//             key={reel.id}
//             className="relative group glass rounded-2xl shadow-2xl min-w-[11rem] max-w-[14rem] w-44 md:w-56 h-72 md:h-96 flex flex-col items-center"
//           >
//             <div className="relative w-full h-full rounded-2xl overflow-hidden flex items-center justify-center bg-black">
//               <video
//                 id={`reel-video-${idx}`}
//                 src={reel.url}
//                 controls={false}
//                 autoPlay
//                 loop
//                 muted
//                 playsInline
//                 className="rounded-2xl w-full h-full object-cover shadow-lg"
//                 style={{ boxShadow: '0 0 24px 0 rgba(162,89,255,0.25)' }}
//               />
//               {/* Play/Pause Button Overlay */}
//               <button
//                 onClick={() => handlePlayPause(idx)}
//                 className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
//                 tabIndex={-1}
//                 aria-label={playing[idx] ? 'Pause' : 'Play'}
//               >
//                 {playing[idx] ? (
//                   <svg className="w-14 h-14 text-white/80 bg-dark/60 rounded-full p-3 shadow-lg" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//                     <rect x="6" y="5" width="4" height="14" rx="2" fill="currentColor" />
//                     <rect x="14" y="5" width="4" height="14" rx="2" fill="currentColor" />
//                   </svg>
//                 ) : (
//                   <svg className="w-14 h-14 text-white/80 bg-dark/60 rounded-full p-3 shadow-lg" fill="currentColor" viewBox="0 0 24 24">
//                     <polygon points="5,3 19,12 5,21" />
//                   </svg>
//                 )}
//               </button>
//               {/* Like Button */}
//               <button
//                 onClick={() => handleLike(idx)}
//                 className={`absolute bottom-3 right-3 flex items-center gap-1 px-3 py-1.5 rounded-full shadow-md transition-all duration-200 ${liked[idx] ? 'bg-accent-pink/90' : 'bg-dark/70 hover:bg-accent-pink/70'}`}
//                 aria-label="Like"
//               >
//                 <svg
//                   className={`w-6 h-6 transition-colors duration-200 ${liked[idx] ? 'text-white scale-110' : 'text-accent-pink'}`}
//                   fill={liked[idx] ? 'currentColor' : 'none'}
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   viewBox="0 0 24 24"
//                 >
//                   <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
//                 </svg>
//                 <span className="text-white text-sm font-semibold ml-1">{likes[idx]}</span>
//               </button>
//             </div>
//             <div className="text-white text-base font-semibold text-center px-2 pb-4 pt-2">
//               {reel.caption}
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// } 