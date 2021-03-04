import styles from "../styles/components/LevelUpModal.module.css";

function LevelUpModal() {
  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <header>2</header>

        <strong>Parabéns</strong>

        <p>Você alcançou um novo nível!</p>

        <button>
          <img src="icons/close.svg" />
        </button>
      </div>
    </div>
  );
}

export default LevelUpModal;
