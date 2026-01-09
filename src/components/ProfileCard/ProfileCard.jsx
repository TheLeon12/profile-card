import PropTypes from "prop-types";
import { useState } from "react";
import styles from "./ProfileCard.module.css";

import Avatar from "../Avatar/Avatar.jsx";
import SkillTag from "../SkillTag/SkillTag.jsx";
import SocialLinks from "../SocialLinks/SocialLinks.jsx";
import FollowButton from "../FollowButton/FollowButton.jsx";
import MessageModal from "../MessageModal/MessageModal.jsx";

export default function ProfileCard({ profile }) {
  // ✅ Evita pantalla en blanco si profile aún no está (import mal, etc.)
  if (!profile) {
    return (
      <article className={styles.card} aria-label="Tarjeta de perfil">
        <div className={styles.body}>
          <p className={styles.bio}>
            No hay datos de perfil para mostrar. Revisa que estés pasando la prop
            <strong> profile</strong> correctamente.
          </p>
        </div>
      </article>
    );
  }

  const [isMessageOpen, setIsMessageOpen] = useState(false);

  const { name, title, location, bio, avatarUrl, skills, links } = profile;

  return (
    <article className={styles.card} aria-label={`Tarjeta de perfil de ${name}`}>
      <header className={styles.header}>
        <Avatar name={name} src={avatarUrl} size={88} />

        <div className={styles.identity}>
          <h1 className={styles.name} title={name}>
            {name}
          </h1>
          <p className={styles.title}>{title}</p>
          <p className={styles.meta}>
            <span className={styles.location} aria-label="Ubicación">
              {location}
            </span>
          </p>
        </div>
      </header>

      <section className={styles.body} aria-label="Información del perfil">
        <p className={styles.bio}>{bio}</p>

        <div className={styles.skillsBlock} aria-label="Habilidades">
          <h2 className={styles.sectionTitle}>Habilidades</h2>

          <ul className={styles.skillsList}>
            {skills.map((skill) => (
              <li key={skill}>
                <SkillTag label={skill} />
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.actionsRow}>
          <div className={styles.buttons}>
            <FollowButton />

            <button
              type="button"
              className={styles.secondaryButton}
              onClick={() => setIsMessageOpen(true)}
            >
              Mensaje
            </button>
          </div>

          <SocialLinks links={links} />
        </div>
      </section>

      <MessageModal
        isOpen={isMessageOpen}
        onClose={() => setIsMessageOpen(false)}
      />
    </article>
  );
}

ProfileCard.propTypes = {
  profile: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string.isRequired,
    skills: PropTypes.arrayOf(PropTypes.string).isRequired,
    links: PropTypes.shape({
      github: PropTypes.string.isRequired,
      linkedin: PropTypes.string.isRequired,
      twitter: PropTypes.string.isRequired,
    }).isRequired,
  }),
};
