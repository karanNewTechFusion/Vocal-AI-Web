import AboutSection from "../components/AboutSection";
import Navbar from "../components/Navbar";

const About = () => {
  return (
    <>
         <div className="bg-dark min-h-screen text-white font-sans">
          <Navbar/>
    <AboutSection/>
      </div>
    </>
  )
};

export default About;
