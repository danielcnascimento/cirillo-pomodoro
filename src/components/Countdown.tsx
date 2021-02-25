import { useState, useEffect } from "react";
import styles from "../styles/components/Countdown.module.css";

const Countdown = () => {
  const [time, setTime] = useState(24 * 60);
  const [counting, setCounting] = useState(false);

  let minutes = Math.floor(time / 60);
  let seconds = time % 60;

  /*
   *torna "minutes" em string ->
   *caso seja retornado apenas 1 casa, o (padStart) aloca '0' à esquerda ->
   *divide cada caracter de string em elementos de array ->
   *desestrutura as duas casas para 2 constantes.
   */

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, "0").split("");
  const [secondLeft, secondRight] = String(seconds).padStart(2, "0").split("");

  function handleCountdownStart() {
    setCounting(true);
  }

  useEffect(() => {
    if (counting && time > 0) {
      setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else {
      return;
    }
  }, [time, counting]);

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
      <button
        type="button"
        className={styles.startCountdownBtn}
        onClick={handleCountdownStart}
      >
        Começar cronômetor
      </button>
    </div>
  );
};

export default Countdown;
