import { createContext, ReactNode, useEffect, useState } from "react";

interface SettingContext {
  soundActiveted: boolean;
  isDarkStyle: boolean;
  soundSwitcher: () => void;
  themeSwitcher: () => void;
}

export const SettingContext = createContext({} as SettingContext);

interface SettingProviderProps {
  children: ReactNode;
}

export function SettingProvider({ children }: SettingProviderProps) {
  const [soundActiveted, setSoundActiveted] = useState(false);
  const [isDarkStyle, setIsDarkStyle] = useState(false);

  const soundSwitcher = () => setSoundActiveted(!soundActiveted);
  const themeSwitcher = () => setIsDarkStyle(!isDarkStyle);

  return (
    <SettingContext.Provider
      value={{
        soundActiveted,
        isDarkStyle,
        soundSwitcher,
        themeSwitcher,
      }}
    >
      {children}
    </SettingContext.Provider>
  );
}
