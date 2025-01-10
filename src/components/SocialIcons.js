const SocialIcons = () => {
  const styles = {
    icon: {
      textDecoration: "none",
      fontSize: "22px",
      padding: "10px",
      transition: "0.2s ease-in",
    },
  };

  return (
    <div className="socialIcons" style={styles.socialIcons}>
      <a className="icon" style={styles.icon} href="https://www.researchgate.net/profile/Salim-Rostami">
        <i className="fa-brands fa-researchgate" aria-hidden="true" title="Salim's ResearchGate Profile"></i>
      </a>
      <a className="icon" style={styles.icon} href="https://www.linkedin.com/in/salim-rostami-96897431/">
        <i className="fa-brands fa-linkedin" aria-hidden="true" title="Salim's LinkedIn Profile"></i>
      </a>
      <a className="icon" style={styles.icon} href="https://github.com/salimrostami">
        <i className="fa-brands fa-github" aria-hidden="true" title="Salim's github Profile"></i>
      </a>
      <a className="icon" style={styles.icon} href="https://www.instagram.com/salimrostami/">
        <i className="fa-brands fa-instagram" aria-hidden="true" title="Salim's Instagram Profile"></i>
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
    </div>
  );
};

export default SocialIcons;
