import styles from "../styles/components/Aside.module.css";
import { useContext } from "react";
import { SettingContext } from "../contexts/SettingContext";

const Aside = () => {
  const { soundSwitcher, soundActiveted } = useContext(SettingContext);
  return (
    <aside className={styles.asideContainer}>
      <img src="logo.svg" />
      <nav>
        <ul>
          <li className={styles.active}>
            <button>
              <img src="assets/home.svg" alt="Homepage." />
            </button>
          </li>
          <li>
            <button type="button" onClick={soundSwitcher}>
              <img
                src={`${
                  soundActiveted
                    ? "assets/sound-on.svg"
                    : "assets/sound-off.svg"
                }`}
                alt={`${
                  soundActiveted
                    ? "Sound switcher - on."
                    : "Sound switcher - off."
                }`}
              />
            </button>
          </li>
          <li>
            <button>
              <img src="assets/light-mode.svg" alt="Theme setting switcher." />
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Aside;
