import { useContext } from "react";
import { ChallengeContext } from "../contexts/ChallengeContext";
import styles from "../styles/components/LevelUpModal.module.css";

interface LevelUpModalProps {
  level: number;
}

function LevelUpModal(props: LevelUpModalProps) {
  const { closeLevelUpModal } = useContext(ChallengeContext);

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <header>{props.level}</header>

        <strong>Parabéns</strong>

        <p>Você alcançou um novo nível!</p>

        <button
          onClick={() => {
            closeLevelUpModal();
          }}
        >
          <img src="icons/close.svg" />
        </button>
      </div>
    </div>
  );
}

export default LevelUpModal;
