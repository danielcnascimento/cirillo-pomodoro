import { useContext } from "react";
import { ChallengeContext } from "../contexts/ChallengeContext";
import styles from "../styles/components/CompletedChallenges.module.css";

const CompletedChallenges = () => {
  const { challengesCompleted } = useContext(ChallengeContext);

  return (
    <div className={styles.completedChallengesContainer}>
      <span>Desafios Completos</span>
      <span>{String(challengesCompleted).padStart(2, "0")}</span>
    </div>
  );
};

export default CompletedChallenges;
