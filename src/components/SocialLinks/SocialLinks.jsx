import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter } from "lucide-react";
import styles from "./SocialLinks.module.css";

function SocialLink({ href, label, Icon }) {
  return (
    <motion.a
      whileHover={{ y: -2, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
      whileTap={{ scale: 0.95 }}
      className={styles.link}
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      title={label}
    >
      <Icon size={20} strokeWidth={2} />
      <span className={styles.srOnly}>{label}</span>
    </motion.a>
  );
}

SocialLink.propTypes = {
  href: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  Icon: PropTypes.elementType.isRequired,
};

export default function SocialLinks({ links }) {
  if (!links) return null;

  return (
    <nav aria-label="Redes sociales">
      <ul className={styles.list}>
        {links.github && (
          <li>
            <SocialLink href={links.github} label="GitHub" Icon={Github} />
          </li>
        )}
        {links.linkedin && (
          <li>
            <SocialLink
              href={links.linkedin}
              label="LinkedIn"
              Icon={Linkedin}
            />
          </li>
        )}
        {links.twitter && (
          <li>
            <SocialLink href={links.twitter} label="Twitter / X" Icon={Twitter} />
          </li>
        )}
      </ul>
    </nav>
  );
}

SocialLinks.propTypes = {
  links: PropTypes.shape({
    github: PropTypes.string,
    linkedin: PropTypes.string,
    twitter: PropTypes.string,
  }),
};
