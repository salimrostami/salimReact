import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import landingImage from "../../images/salim.png";
import SocialIcons from "../../components/SocialIcons";

const Landing = ({ name, tagline }) => {
  const styles = {
    landing: {
      height: "calc(100% - 93px)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  };

  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section className="landing" style={styles.landing}>
      <div className="textContainer">
        <motion.h1
          className="name"
          ref={ref}
          initial={{ y: -26, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : { y: -26, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {name}
        </motion.h1>
        <motion.p
          className="description"
          ref={ref}
          initial={{ y: 24, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : { y: 24, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {tagline}
        </motion.p>
      </div>
      <div className="image-container">
        <motion.img
          className="landingImage"
          ref={ref}
          initial={{ y: 22, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 0.4 } : { y: 22, opacity: 0 }}
          transition={{ duration: 0.58, ease: "easeInOut" }}
          src={landingImage}
          alt=""
        />
      </div>

      <SocialIcons animateOnLoad delay={0.18} />
    </section>
  );
};

export default Landing;
