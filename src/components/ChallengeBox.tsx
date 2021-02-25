import styles from "../styles/components/ChallengeBox.module.css";

const ChallengeBox = () => {
  const hasFinished = true;
  return (
    <div className={styles.challengeBoxContainer}>
      {hasFinished ? (
        <div className={styles.challengeBoxActive}>
          <header>
            <strong>Ganhe 400 xp</strong>
          </header>

          <main>
            <img src="icons/body.svg" />
            <strong>Novo desafio</strong>
            <p>
              É agora Daniel, bora lá meu parça. Caminhe por 3 minutos e estique
              suas pernas pra você ficar saudável.
            </p>
          </main>

          <footer>
            <button type="button" className={styles.challengeFailedButton}>
              Falhei
            </button>
            <button type="button" className={styles.challengeSucceededButton}>
              Completei
            </button>
          </footer>
        </div>
      ) : (
        <div className={styles.challengeBoxNotActive}>
          <strong>
            Inicie um ciclo para receber desafios a serem completados
          </strong>
          <p>
            <img src="icons/level-up.svg" alt="PomodUp" />
            Avance de level completando os desafios.
          </p>
        </div>
      )}
    </div>
  );
};

export default ChallengeBox;
