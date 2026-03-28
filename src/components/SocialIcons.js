import { motion } from "framer-motion";

const SocialIcons = ({ animateOnLoad = false, delay = 0 }) => {
  const styles = {
    icon: {
      textDecoration: "none",
      fontSize: "22px",
      padding: "10px",
      transition: "0.2s ease-in",
    },
  };

  return (
    <motion.div
      className="socialIcons"
      style={styles.socialIcons}
      initial={animateOnLoad ? { y: 18, opacity: 0 } : false}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.38, delay, ease: "easeInOut" }}
    >
      <a
        className="icon"
        style={styles.icon}
        href="https://www.researchgate.net/profile/Salim-Rostami"
        target="_blank"
        rel="noreferrer"
      >
        <i
          className="fa-brands fa-researchgate"
          aria-hidden="true"
          title="Salim's ResearchGate Profile"
        ></i>
      </a>
      <a
        className="icon"
        style={styles.icon}
        href="https://www.linkedin.com/in/salim-rostami-96897431/"
        target="_blank"
        rel="noreferrer"
      >
        <i
          className="fa-brands fa-linkedin"
          aria-hidden="true"
          title="Salim's LinkedIn Profile"
        ></i>
      </a>
      <a
        className="icon"
        style={styles.icon}
        href="https://github.com/salimrostami"
        target="_blank"
        rel="noreferrer"
      >
        <i
          className="fa-brands fa-github"
          aria-hidden="true"
          title="Salim's github Profile"
        ></i>
      </a>
      <a
        className="icon"
        style={styles.icon}
        href="https://www.instagram.com/salimrostami/"
        target="_blank"
        rel="noreferrer"
      >
        <i
          className="fa-brands fa-instagram"
          aria-hidden="true"
          title="Salim's Instagram Profile"
        ></i>
      </a>
      {/* <a className="icon" style={styles.icon} href="https://www.researchgate.net/profile/Mina-Hajizadeh">
        <i className="fa-brands fa-researchgate" aria-hidden="true" title="Mina's ResearchGate Profile"></i>
      </a>
      <a className="icon" style={styles.icon} href="https://www.linkedin.com/in/mina-hajizadeh-5b1999168/">
        <i className="fa-brands fa-linkedin" aria-hidden="true" title="Mina's LinkedIn Profile"></i>
      </a>
      <a className="icon" style={styles.icon} href="https://www.instagram.com/mina_hajizadeh_/">
        <i className="fa-brands fa-instagram" aria-hidden="true" title="Mina's Instagram Profile"></i>
      </a>
      <a className="icon" style={styles.icon} href="https://twitter.com/miinariiiii">
        <i className="fa-brands fa-twitter" aria-hidden="true" title="Mina's Twitter Profile"></i>
      </a> */}
    </motion.div>
  );
};

export default SocialIcons;
