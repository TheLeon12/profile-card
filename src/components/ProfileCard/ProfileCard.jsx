import PropTypes from "prop-types";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Send, UserPlus, Check } from "lucide-react";
import styles from "./ProfileCard.module.css";

import Avatar from "../Avatar/Avatar.jsx";
import SkillTag from "../SkillTag/SkillTag.jsx";
import SocialLinks from "../SocialLinks/SocialLinks.jsx";
import MessageModal from "../MessageModal/MessageModal.jsx";

export default function ProfileCard({ profile }) {
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  if (!profile) return null;

  const { name, title, location, bio, avatarUrl, skills, links } = profile;

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.article
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={styles.card}
      aria-label={`Tarjeta de perfil de ${name}`}
    >
      <header className={styles.header}>
        <div className={styles.avatarWrapper}>
          <Avatar name={name} src={avatarUrl} size={100} />
          <div className={styles.statusIndicator} title="Disponible para trabajar" />
        </div>

        <div className={styles.identity}>
          <motion.h1 variants={itemVariants} className={styles.name}>
            {name}
          </motion.h1>
          <motion.p variants={itemVariants} className={styles.title}>
            {title}
          </motion.p>
          <motion.div variants={itemVariants} className={styles.location}>
            <MapPin size={14} className={styles.icon} />
            <span>{location}</span>
          </motion.div>
        </div>
      </header>

      <section className={styles.body}>
        <motion.p variants={itemVariants} className={styles.bio}>
          {bio}
        </motion.p>

        <motion.div variants={itemVariants} className={styles.skillsBlock}>
          <h2 className={styles.sectionTitle}>Habilidades Especializadas</h2>
          <ul className={styles.skillsList}>
            {skills.map((skill) => (
              <li key={skill}>
                <SkillTag label={skill} />
              </li>
            ))}
          </ul>
        </motion.div>

        <div className={styles.actionsRow}>
          <div className={styles.buttons}>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`${styles.primaryButton} ${isFollowing ? styles.following : ""}`}
              onClick={() => setIsFollowing(!isFollowing)}
            >
              {isFollowing ? (
                <>
                  <Check size={18} />
                  <span>Siguiendo</span>
                </>
              ) : (
                <>
                  <UserPlus size={18} />
                  <span>Seguir</span>
                </>
              )}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={styles.secondaryButton}
              onClick={() => setIsMessageOpen(true)}
            >
              <Send size={18} />
              <span>Mensaje</span>
            </motion.button>
          </div>

          <SocialLinks links={links} />
        </div>
      </section>

      <AnimatePresence>
        {isMessageOpen && (
          <MessageModal
            isOpen={isMessageOpen}
            onClose={() => setIsMessageOpen(false)}
          />
        )}
      </AnimatePresence>
    </motion.article>
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
      github: PropTypes.string,
      linkedin: PropTypes.string,
      twitter: PropTypes.string,
    }),
  }),
};
