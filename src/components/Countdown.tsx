import { useState, useEffect, useContext } from "react";
import { ChallengeContext } from "../contexts/ChallengeContext";
import styles from "../styles/components/Countdown.module.css";

let countdownTimeOut: NodeJS.Timeout;

const Countdown = () => {
  const [time, setTime] = useState(0.1 * 60);
  const [isCounting, setIsCounting] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  let minutes = Math.floor(time / 60);
  let seconds = time % 60;

  const { startNewChallenge } = useContext(ChallengeContext);

  /*
   *torna "minutes" em string ->
   *caso seja retornado apenas 1 casa, o (padStart) aloca '0' à esquerda ->
   *divide cada caracter de string em elementos de array ->
   *desestrutura as duas casas para 2 constantes.
   */

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, "0").split("");
  const [secondLeft, secondRight] = String(seconds).padStart(2, "0").split("");

  function handleCountDownReset() {
    clearTimeout(countdownTimeOut);
    setIsCounting(false);
    setTime(0.1 * 60);
  }

  function handleCountdownStart() {
    setIsCounting(true);
    setHasFinished(false);
  }

  useEffect(() => {
    if (isCounting && time > 0) {
      countdownTimeOut = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (isCounting && time === 0) {
      setIsCounting(false);
      setHasFinished(true);
      handleCountDownReset();
      startNewChallenge();
    }
  }, [time, isCounting]);

  return (
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>
      {hasFinished ? (
        <button disabled className={styles.startCountdownBtn}>
          Fim do pomodoro
        </button>
      ) : (
        <>
          {isCounting ? (
            <button
              type="button"
              className={`${styles.startCountdownBtn} ${styles.startCountdownBtnActive}`}
              onClick={handleCountDownReset}
            >
              Abandonar pomodoro
            </button>
          ) : (
            <button
              type="button"
              className={styles.startCountdownBtn}
              onClick={handleCountdownStart}
            >
              Começar pomodoro
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default Countdown;
