import { createContext, ReactNode, useEffect, useState } from "react";
import challenges from "../../challenges.json";
import COOKIE from "js-cookie";
import LevelUpModal from "../components/LevelUpModal";

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
  hasLeveledUpModal: boolean;
  resetChallenge: () => void;
  newLevelUp: () => void;
  startNewChallenge: () => void;
  completedChallenge: () => void;
  closeLevelUpModal: () => void;
}

//criando o context para challenge.
export const ChallengeContext = createContext({} as ChallengeContextData);

//pega o conteudo do _app e aplica o context provider.
interface ChallengeProviderProps {
  children: ReactNode; //aceita elementos React (components, html, funções, etc).
  level: number;
  experience: number;
  challengeCompleted: number;
}

// estava com problemas em usar as props, em função de nome dupicado.
// uma solução foi usar o spread oparator.
export function ChallengeProvider({ ...props }: ChallengeProviderProps) {
  const [level, setLevel] = useState(props.level ?? 1);
  const [experience, setExperience] = useState(props.experience ?? 0);
  const [challengesCompleted, setChallengesCompleted] = useState(
    props.challengeCompleted ?? 0
  );
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [hasLeveledUpModal, setHasLeveledUpModal] = useState(false);

  const expToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  useEffect(() => {
    COOKIE.set("user_level", String(level));
    COOKIE.set("user_exp", String(experience));
    COOKIE.set("user_completed_challenges", String(challengesCompleted));
  }, [level, experience, challengesCompleted]);

  /*
   * upa mais um nivel se alcançar expêriencia necessária.
   * level up if current exp is enough.
   */
  function newLevelUp() {
    setLevel(level + 1);
    setHasLeveledUpModal(true);
  }

  function closeLevelUpModal() {
    setHasLeveledUpModal(false);
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
        hasLeveledUpModal,
        closeLevelUpModal,
      }}
    >
      {props.children}
      {hasLeveledUpModal && <LevelUpModal level={level} />}
    </ChallengeContext.Provider>
  );
}
