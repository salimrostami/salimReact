import aboutMeImg from "../images/aboutSalim.webp";
import { motion } from "framer-motion";
import SocialIcons from "../components/SocialIcons";
import resume from "../pages/about/CV_RostamiSalim.pdf";

const AboutMe = ({
  name,
  email,
  location,
  affiliation,
  brand,
  intro,
  birthday,
  language,
}) => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = resume;
    link.download = "CV_RostamiSalim.pdf";
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const getAge = (dateString) => {
    if (typeof dateString !== "string") {
      return "";
    }

    const isoMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateString);
    let birthDate;
    if (isoMatch) {
      const [, year, month, day] = isoMatch;
      birthDate = new Date(Number(year), Number(month) - 1, Number(day));
    } else {
      birthDate = new Date(dateString);
    }

    if (Number.isNaN(birthDate.getTime())) {
      return "";
    }

    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const age = getAge(birthday);

  return (
    <div className="aboutContainer container">
      <div className="row">
        <motion.div
          className="personalImage col-12 col-lg-4"
          initial={{ x: -22, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.34, ease: "easeInOut" }}
        >
          <img src={aboutMeImg} alt={name} decoding="async" />
        </motion.div>
        <motion.div
          className="personalInfo col-12 col-lg-8"
          initial={{ x: 22, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.34, ease: "easeInOut" }}
        >
          <div className="contentContainer">
            <h4>Nice to meet you</h4>
            <h5>{brand}</h5>
            <div className="contentDescription">
              <p>{intro}</p>
            </div>
            <div className="infoContainer">
              <div className="row">
                <div className="col-12 col-md-6 info">
                  <span>Name:</span>
                  <p>{name}</p>
                </div>
                <div className="col-12 col-md-6 info">
                  <span>Email:</span>
                  <p>{email}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-12 col-md-6 info">
                  <span>Location:</span>
                  <p>{location}</p>
                </div>
                <div className="col-12 col-md-6 info">
                  <span>Affiliation:</span>
                  <p>{affiliation}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-12 col-md-6 info">
                  <span>Age:</span>
                  <p>{age === "" ? "N/A" : `${age} years old`}</p>
                </div>
                <div className="col-12 col-md-6 info">
                  <span>Language:</span>
                  <p>{language}</p>
                </div>
              </div>
            </div>
            <div className="buttonContainer">
              <button
                type="button"
                className="btn downloadCV"
                onClick={handleDownload}
              >
                Download Resume
              </button>
              <SocialIcons />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutMe;
