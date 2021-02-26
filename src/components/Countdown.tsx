import { useContext } from "react";
import { CountdownContext } from "../contexts/CountdownContext";
import styles from "../styles/components/Countdown.module.css";

const Countdown = () => {
  const {
    minutes,
    seconds,
    hasFinished,
    isCounting,
    handleCountdownReset,
    handleCountdownStart,
  } = useContext(CountdownContext);

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, "0").split("");
  const [secondLeft, secondRight] = String(seconds).padStart(2, "0").split("");

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
              onClick={handleCountdownReset}
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
