import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { ChallengeContext } from "./ChallengeContext";

interface CountdownContext {
  time: number;
  isCounting: boolean;
  hasFinished: boolean;
  handleCountdownReset: () => void;
  handleCountdownStart: () => void;
  minutes: number;
  seconds: number;
}

interface CountdownContextProps {
  children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContext);

export function CountdownProvider({ children }: CountdownContextProps) {
  let countdownTimeOut: NodeJS.Timeout;
  const [time, setTime] = useState(25 * 60);
  const [isCounting, setIsCounting] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);
  const [audio] = useState(
    typeof Audio !== "undefined" && new Audio("/sounds/clock-ticking-3.mp3")
  );
  const [isPlaying, setIsPlaying] = useState(false);

  /*
   *torna "minutes" em string ->
   *caso seja retornado apenas 1 casa, o (padStart) aloca '0' à esquerda ->
   *divide cada caracter de string em elementos de array ->
   *desestrutura as duas casas para 2 constantes.
   */
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;
  const { startNewChallenge } = useContext(ChallengeContext);

  function handleCountdownReset() {
    clearTimeout(countdownTimeOut);
    setIsCounting(false);
    setHasFinished(false);
    setTime(25 * 60);
    setIsPlaying(false);
  }

  function handleCountdownStart() {
    setIsCounting(true);
    setHasFinished(false);
    setIsPlaying(true);
  }

  useEffect(() => {
    if (isCounting && time > 0) {
      countdownTimeOut = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (isCounting && time === 0) {
      setIsCounting(false);
      setIsPlaying(false);
      setHasFinished(true);
      startNewChallenge();
    }
  }, [time, isCounting]);

  useEffect(() => {
    isPlaying ? audio.play() && (audio.loop = true) : audio.pause();
  }, [isPlaying, time]);

  return (
    <CountdownContext.Provider
      value={{
        time,
        isCounting,
        hasFinished,
        handleCountdownReset,
        handleCountdownStart,
        minutes,
        seconds,
      }}
    >
      {children}
    </CountdownContext.Provider>
  );
}
