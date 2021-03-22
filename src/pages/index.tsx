import Head from "next/head";
import { GetServerSideProps } from "next";
import CompletedChallenges from "../components/CompletedChallenges";
import Countdown from "../components/Countdown";
import ExperienceBar from "../components/ExperienceBar";
import Profile from "../components/Profile";
import styles from "../styles/pages/Home.module.css";
import ChallengeBox from "../components/ChallengeBox";
import { CountdownProvider } from "../contexts/CountdownContext";
import { ChallengeProvider } from "../contexts/ChallengeContext";
import { SettingProvider } from "../contexts/SettingContext";

interface getUserDataProps {
  level: number;
  experience: number;
  challengesCompleted: number;
}

export default function Home(props: getUserDataProps) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Homepage | Cirillo Pomodoro</title>
      </Head>
      <SettingProvider>
        <ChallengeProvider
          level={props.level}
          experience={props.experience}
          challengeCompleted={props.challengesCompleted}
        >
          <CountdownProvider>
            <aside>
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
                      <img
                        src="assets/sound-on.svg"
                        alt="Sound setting switcher."
                      />
                    </button>
                  </li>
                  <li>
                    <button>
                      <img
                        src="assets/light-mode.svg"
                        alt="Theme setting switcher."
                      />
                    </button>
                  </li>
                </ul>
              </nav>
            </aside>
            <ExperienceBar />
            <section>
              <div>
                <Profile />
                <CompletedChallenges />
                <Countdown />
              </div>
              <div>
                <ChallengeBox />
              </div>
            </section>
          </CountdownProvider>
        </ChallengeProvider>
      </SettingProvider>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { user_level, user_exp, user_completed_challenges } = ctx.req.cookies;

  const user = {
    level: Number(user_level),
    experience: Number(user_exp),
    challengesCompleted: Number(user_completed_challenges),
  };

  return {
    props: user,
  };
};
