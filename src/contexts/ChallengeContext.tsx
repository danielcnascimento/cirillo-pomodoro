import { createContext, ReactNode, useState } from "react";
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
  activeChallenge: Challenge;
  resetChallenge: () => void;
  newLevelUp: () => void;
  startNewChallenge: () => void;
}

//criando o context para challenge.
export const ChallengeContext = createContext({} as ChallengeContextData);

//pega o conteudo do _app e aplica o context provider.
interface ChallengeProvider {
  children: ReactNode; //aceita elementos React (components, html, funções, etc).
}

export function ChallengeProvider({ children }: ChallengeProvider) {
  const [level, setLevel] = useState(0);
  const [experience, setExperience] = useState(0);
  const [challengesCompleted, setChallengesCompleted] = useState(0);
  const [activeChallenge, setActiveChallenge] = useState(null);

  // CONTEXT FUNCTIONS

  function resetChallenge() {
    setActiveChallenge(null);
  }

  function newLevelUp() {
    setLevel(level + 1);
  }

  function startNewChallenge() {
    let challengeProposal = Math.floor(Math.random() * challenges.length);
    let randomChallenge = challenges[challengeProposal];

    setActiveChallenge(randomChallenge);
  }

  return (
    <ChallengeContext.Provider
      value={{
        level,
        experience,
        challengesCompleted,
        activeChallenge,
        resetChallenge,
        newLevelUp,
        startNewChallenge,
      }}
    >
      {children}
    </ChallengeContext.Provider>
  );
}
