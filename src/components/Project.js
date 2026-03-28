import { motion } from "framer-motion";
import Modal from "react-modal";
import { useMemo, useState } from "react";
import closeModal from "../images/close.svg";
import { normalizeLinks } from "../utils/links";

const modalStyles = {
  overlay: {
    backgroundColor: "rgba(8, 8, 8, 0.72)",
    backdropFilter: "blur(2px)",
    zIndex: "1300",
  },
  content: {
    backgroundColor: "#101010",
    color: "#9f9f9f",
    border: "1px solid rgba(255, 255, 255, 0.12)",
    borderRadius: "8px",
    padding: "60px",
    display: "flex",
    flexDirection: "column",
    width: "min(400px, calc(100vw - 32px))",
    maxHeight: "calc(100vh - 32px)",
    overflowY: "auto",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    zIndex: "1301",
  },
};

if (typeof document !== "undefined") {
  Modal.setAppElement("#root");
}

const Project = ({
  top,
  title,
  image,
  color,
  id,
  links,
  description,
  bottom,
  oddEven,
}) => {
  const numericId = Number.parseInt(id, 10);
  const parity = Number.isNaN(numericId) ? 0 : numericId % 2;

  const variants = useMemo(
    () => ({
      hidden: { x: parity === oddEven ? 24 : -24, opacity: 0 },
      visible: { x: 0, opacity: 1 },
    }),
    [parity, oddEven],
  );

  const [showModal, setShowModal] = useState(false);
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const projectLinks = useMemo(() => normalizeLinks(links), [links]);

  return (
    <motion.div
      className="col-sm-12 col-lg-6"
      variants={variants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.34, ease: "easeInOut" }}
    >
      <div
        style={{ backgroundColor: color }}
        className="projectCard d-flex align-items-center justify-content-center p-5"
        onClick={handleOpenModal}
        role="button"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            handleOpenModal();
          }
        }}
      >
        <div className="textWrap col-6 d-flex flex-column justify-content-center align-items-center m-5">
          <p className="tech">
            <em>{top}</em>
          </p>
          <h3 className="projectTitle">{title}</h3>
          <span className="viewWork">{bottom} &#8594;</span>
        </div>
        <div className="imageContainer col-6 d-flex align-items-center justify-content-center">
          <img
            src={image}
            alt="Laptop displaying application"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
      <Modal
        isOpen={showModal}
        onRequestClose={handleCloseModal}
        bodyOpenClassName="modalOpen"
        shouldCloseOnEsc
        shouldCloseOnOverlayClick
        preventScroll
        style={modalStyles}
      >
        <button
          type="button"
          className="closeModalButton"
          onClick={handleCloseModal}
          aria-label="Close project details"
        >
          <img src={closeModal} className="closeMenu closeModal" alt="" />
        </button>
        <h3 className="modalTitle">{title}</h3>
        <p className="projectDescription">{description}</p>
        {projectLinks.map((link) => (
          <a
            key={`${id}-${link.label}-${link.url}`}
            className="btn projectModalLink"
            href={link.url}
            target="_blank"
            rel="noreferrer"
          >
            {link.label}
          </a>
        ))}
      </Modal>
    </motion.div>
  );
};

export default Project;
