import PropTypes from "prop-types";
import styles from "./SocialLinks.module.css";

function IconGitHub() {
  return (
    <svg viewBox="0 0 24 24" className={styles.icon} aria-hidden="true">
      <path d="M12 .6a11.4 11.4 0 0 0-3.6 22.2c.6.1.8-.3.8-.6v-2.1c-3.3.7-4-1.4-4-1.4-.5-1.3-1.2-1.7-1.2-1.7-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 1.7 2.7 1.2 3.3.9.1-.7.4-1.2.7-1.5-2.6-.3-5.2-1.3-5.2-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.3.8 1 .8 2.1v3.1c0 .3.2.7.8.6A11.4 11.4 0 0 0 12 .6Z" />
    </svg>
  );
}

function IconLinkedIn() {
  return (
    <svg viewBox="0 0 24 24" className={styles.icon} aria-hidden="true">
      <path d="M4.98 3.5A2.48 2.48 0 1 1 5 8.46 2.48 2.48 0 0 1 4.98 3.5ZM3 9h4v12H3V9Zm7 0h3.8v1.64h.05c.53-1 1.82-2.06 3.74-2.06 4 0 4.74 2.63 4.74 6.06V21h-4v-5.55c0-1.32-.02-3.02-1.84-3.02-1.85 0-2.13 1.44-2.13 2.93V21h-4V9Z" />
    </svg>
  );
}

function IconX() {
  return (
    <svg viewBox="0 0 24 24" className={styles.icon} aria-hidden="true">
      <path d="M18.9 2H22l-6.8 7.8L23 22h-6.7l-5.2-6.6L5.3 22H2l7.3-8.4L1.9 2h6.8l4.7 6.1L18.9 2Zm-1.2 18h1.7L7.8 3.9H6L17.7 20Z" />
    </svg>
  );
}

function SocialLink({ href, label, Icon }) {
  return (
    <a
      className={styles.link}
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      title={label}
    >
      <Icon />
      <span className={styles.srOnly}>{label}</span>
    </a>
  );
}

SocialLink.propTypes = {
  href: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  Icon: PropTypes.elementType.isRequired,
};

export default function SocialLinks({ links }) {
  return (
    <nav aria-label="Redes sociales">
      <ul className={styles.list}>
        <li>
          <SocialLink href={links.github} label="GitHub" Icon={IconGitHub} />
        </li>
        <li>
          <SocialLink
            href={links.linkedin}
            label="LinkedIn"
            Icon={IconLinkedIn}
          />
        </li>
        <li>
          <SocialLink href={links.twitter} label="X (Twitter)" Icon={IconX} />
        </li>
      </ul>
    </nav>
  );
}

SocialLinks.propTypes = {
  links: PropTypes.shape({
    github: PropTypes.string.isRequired,
    linkedin: PropTypes.string.isRequired,
    twitter: PropTypes.string.isRequired,
  }).isRequired,
};
