import styles from "../styles/components/Aside.module.css";

const Aside = () => {
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
            <button>
              <img src="assets/sound-on.svg" alt="Sound setting switcher." />
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
