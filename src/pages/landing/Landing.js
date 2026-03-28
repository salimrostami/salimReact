import { motion } from "framer-motion";
import landingImage from "../../images/salim.webp";
import SocialIcons from "../../components/SocialIcons";
import "./landing.css";

const Landing = ({ name, tagline }) => {
  return (
    <section className="landing">
      <div className="textContainer">
        <motion.h1
          className="name"
          initial={{ y: -26, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {name}
        </motion.h1>
        <motion.p
          className="description"
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {tagline}
        </motion.p>
      </div>
      <div className="image-container">
        <motion.img
          className="landingImage"
          initial={{ y: 22, opacity: 0 }}
          animate={{ y: 0, opacity: 0.4 }}
          transition={{ duration: 0.58, ease: "easeInOut" }}
          src={landingImage}
          alt="Salim Rostami portrait on the homepage hero section"
          decoding="async"
          fetchpriority="high"
        />
      </div>

      <SocialIcons animateOnLoad delay={0.18} />
    </section>
  );
};

export default Landing;
