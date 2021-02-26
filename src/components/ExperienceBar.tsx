import { useContext } from "react";
import { ChallengeContext } from "../contexts/ChallengeContext";
import styles from "../styles/components/ExperienceBar.module.css";

const ExperienceBar = () => {
  const { experience } = useContext(ChallengeContext);

  return (
    <header className={styles.experienceBar}>
      <span>0 xp</span>
      <div>
        <div style={{ width: `50%` }} />
        <span className={styles.currentExperience} style={{ left: `50%` }}>
          {experience} xp
        </span>
      </div>
      <span>600 xp</span>
    </header>
  );
};

export default ExperienceBar;
