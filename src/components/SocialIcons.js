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
      <a className="icon" style={styles.icon} href="https://github.com/salimrostami">
        <i className="fa-brands fa-github" aria-hidden="true" title="Salim Rostami's GitHub Profile"></i>
      </a>
      <a className="icon" style={styles.icon} href="https://www.linkedin.com/in/salim-rostami-96897431/">
        <i className="fa-brands fa-linkedin" aria-hidden="true" title="Salim Rostami's LinkedIn Profile"></i>
      </a>
      <a className="icon" style={styles.icon} href="https://www.instagram.com/salimrostami/">
        <i className="fa-brands fa-instagram" aria-hidden="true" title="Salim Rostami's Instagram Profile"></i>
      </a>
      <a className="icon" style={styles.icon} href="https://twitter.com/iamcreeptonight">
        <i className="fa-brands fa-twitter" aria-hidden="true" title="Salim Rostami's Twitter Profile"></i>
      </a>
    </div>
  );
};

export default SocialIcons;
