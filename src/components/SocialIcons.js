import { motion } from "framer-motion";

const SOCIAL_LINKS = [
  {
    href: "https://www.researchgate.net/profile/Salim-Rostami",
    iconClassName: "fa-brands fa-researchgate",
    title: "Salim's ResearchGate profile",
  },
  {
    href: "https://www.linkedin.com/in/salim-rostami-96897431/",
    iconClassName: "fa-brands fa-linkedin",
    title: "Salim's LinkedIn profile",
  },
  {
    href: "https://github.com/salimrostami",
    iconClassName: "fa-brands fa-github",
    title: "Salim's GitHub profile",
  },
  {
    href: "https://www.instagram.com/salimrostami/",
    iconClassName: "fa-brands fa-instagram",
    title: "Salim's Instagram profile",
  },
];

const SocialIcons = ({ animateOnLoad = false, delay = 0 }) => {
  return (
    <motion.div
      className="socialIcons"
      initial={animateOnLoad ? { y: 18, opacity: 0 } : false}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.38, delay, ease: "easeInOut" }}
    >
      {SOCIAL_LINKS.map((link) => (
        <a
          key={link.href}
          className="icon"
          href={link.href}
          target="_blank"
          rel="noreferrer"
          aria-label={link.title}
          title={link.title}
        >
          <i className={link.iconClassName} aria-hidden="true"></i>
        </a>
      ))}
    </motion.div>
  );
};

export default SocialIcons;
