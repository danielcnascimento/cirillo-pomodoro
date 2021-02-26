import { send } from "process";
import { createContext, ReactNode, useEffect, useState } from "react";
import challenges from "../../challenges.json";

interface Challenge {
  type: "body" | "eye";
  description: String;
  amount: number;
}

interface ChallengeContextData {
  level: number;
  experience: number;
  challengesCompleted: number;
  expToNextLevel: number;
  activeChallenge: Challenge;
  resetChallenge: () => void;
  newLevelUp: () => void;
  startNewChallenge: () => void;
  completedChallenge: () => void;
}

//criando o context para challenge.
export const ChallengeContext = createContext({} as ChallengeContextData);

//pega o conteudo do _app e aplica o context provider.
interface ChallengeProvider {
  children: ReactNode; //aceita elementos React (components, html, funções, etc).
}

export function ChallengeProvider({ children }: ChallengeProvider) {
  const [level, setLevel] = useState(1);
  const [experience, setExperience] = useState(0);
  const [challengesCompleted, setChallengesCompleted] = useState(0);
  const [activeChallenge, setActiveChallenge] = useState(null);

  const expToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  /*
   * upa mais um nivel se alcançar expêriencia necessária.
   * level up if current exp is enough.
   */
  function newLevelUp() {
    setLevel(level + 1);
  }

  /*
   * rejeita o desafio.
   * decline challenge.
   */
  function resetChallenge() {
    setActiveChallenge(null);
  }

  /*
   * retorna um desafio aleatório quando o cronometro chega a 0s.
   * set a random challenge when countdown reaches 0s.
   */
  function startNewChallenge() {
    let challengeProposal = Math.floor(Math.random() * challenges.length);
    let randomChallenge = challenges[challengeProposal];

    setActiveChallenge(randomChallenge);

    new Audio("/notification.mp3").play();

    if (Notification.permission === "granted") {
      new Notification("Dúvido completar", {
        body: `Valendo ${randomChallenge.amount}xp: ${randomChallenge.description}`,
      });
    }
  }

  /*
   * quando completa um desafio, a função deve gerenciar o estado da experiência atual, se o usuário tiver
   * experiência necessário, a função deve elevar um nível e atualizar o estado da experiência.
   *
   * completing a challenge, the function should handle the experience state, if users have enough experience
   * to level up, so the function must level users and handle the current experience.
   */
  function completedChallenge() {
    if (!activeChallenge) {
      return;
    }

    const { amount } = activeChallenge;
    let finalExpToNextLevel = experience + amount;

    if (finalExpToNextLevel >= expToNextLevel) {
      newLevelUp();
      finalExpToNextLevel = finalExpToNextLevel - expToNextLevel;
    }

    setExperience(finalExpToNextLevel);
    setChallengesCompleted(challengesCompleted + 1);
    setActiveChallenge(null);
  }

  return (
    <ChallengeContext.Provider
      value={{
        level,
        experience,
        challengesCompleted,
        expToNextLevel,
        activeChallenge,
        resetChallenge,
        completedChallenge,
        newLevelUp,
        startNewChallenge,
      }}
    >
      {children}
    </ChallengeContext.Provider>
  );
}
