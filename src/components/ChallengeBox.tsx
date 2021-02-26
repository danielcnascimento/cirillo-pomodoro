import { useContext } from "react";
import { ChallengeContext } from "../contexts/ChallengeContext";
import { CountdownContext } from "../contexts/CountdownContext";
import styles from "../styles/components/ChallengeBox.module.css";

const ChallengeBox = () => {
  const { activeChallenge, resetChallenge, completedChallenge } = useContext(
    ChallengeContext
  );

  const { handleCountdownReset } = useContext(CountdownContext);

  function handleFailedChallenge() {
    resetChallenge();
    handleCountdownReset();
  }

  function handleSucceededChallenge() {
    completedChallenge();
    handleCountdownReset();
  }
  return (
    <div className={styles.challengeBoxContainer}>
      {activeChallenge ? (
        <div className={styles.challengeBoxActive}>
          <header>
            <strong>Ganhe {activeChallenge.amount} xp</strong>
          </header>

          <main>
            <img src={`icons/${activeChallenge.type}.svg`} />
            <strong>Novo desafio</strong>
            <p>
              É agora Daniel, bora lá meu parça. {activeChallenge.description}
              Assim mantendo-se saudável.
            </p>
          </main>

          <footer>
            <button
              type="button"
              className={styles.challengeFailedButton}
              onClick={handleFailedChallenge}
            >
              Falhei
            </button>
            <button
              type="button"
              className={styles.challengeSucceededButton}
              onClick={handleSucceededChallenge}
            >
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
