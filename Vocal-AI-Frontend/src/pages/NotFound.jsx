import { useNavigate } from 'react-router-dom';
import imagePath  from '../assets/images/imagePath'; // Adjust if needed

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div
      className="w-full h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage: `url(${imagePath.w404})`, // Use the 404 image
      }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      <div className="z-10 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Oops! Page not found</h1>
        <p className="text-lg text-gray-300 mb-8">The page you're looking for doesn't exist.</p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-accent-blue via-accent-purple to-accent-pink text-white font-semibold shadow-lg hover:scale-105 transition"
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
};

export default NotFound;
