import PropTypes from "prop-types";
import styles from "./SkillTag.module.css";

export default function SkillTag({ label }) {
  return <span className={styles.tag}>{label}</span>;
}

SkillTag.propTypes = {
  label: PropTypes.string.isRequired,
};
