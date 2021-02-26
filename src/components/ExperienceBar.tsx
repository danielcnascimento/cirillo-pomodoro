import { useContext } from "react";
import { ChallengeContext } from "../contexts/ChallengeContext";
import styles from "../styles/components/ExperienceBar.module.css";

const ExperienceBar = () => {
  const { experience, expToNextLevel } = useContext(ChallengeContext);

  const expProgress = Math.round((experience * 100) / expToNextLevel);

  return (
    <header className={styles.experienceBar}>
      <span>0 xp</span>
      <div>
        <div style={{ width: `${expProgress}%` }} />
        <span
          className={styles.currentExperience}
          style={{ left: `${expProgress}%` }}
        >
          {experience} xp
        </span>
      </div>
      <span>{expToNextLevel} xp</span>
    </header>
  );
};

export default ExperienceBar;
