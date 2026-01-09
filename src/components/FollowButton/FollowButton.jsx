import { useState } from "react";
import styles from "./FollowButton.module.css";

export default function FollowButton() {
  const [isFollowing, setIsFollowing] = useState(false);

  const handleToggle = () => {
    setIsFollowing((prev) => !prev);
  };

  return (
    <button
      type="button"
      className={isFollowing ? styles.following : styles.primary}
      onClick={handleToggle}
      aria-pressed={isFollowing}
    >
      {isFollowing ? "Siguiendo" : "Seguir"}
    </button>
  );
}
