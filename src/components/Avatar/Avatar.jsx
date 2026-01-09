import PropTypes from "prop-types";
import { useMemo, useState } from "react";
import styles from "./Avatar.module.css";

function getInitials(fullName) {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}

export default function Avatar({ name, src, size }) {
  const [imgFailed, setImgFailed] = useState(false);

  const initials = useMemo(() => getInitials(name), [name]);

  return (
    <div
      className={styles.wrapper}
      style={{ width: size, height: size }}
      aria-label="Avatar"
    >
      {!imgFailed ? (
        <img
          className={styles.image}
          src={src}
          alt={`Avatar de ${name}`}
          loading="lazy"
          onError={() => setImgFailed(true)}
        />
      ) : (
        <div className={styles.fallback} aria-label={`Iniciales de ${name}`}>
          {initials}
        </div>
      )}
    </div>
  );
}

Avatar.propTypes = {
  name: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  size: PropTypes.number,
};

Avatar.defaultProps = {
  size: 88,
};
