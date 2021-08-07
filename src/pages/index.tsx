import Head from "next/head";
import styles from "../styles/pages/Home.module.css";
import { GetServerSideProps } from "next";
import CompletedChallenges from "../components/CompletedChallenges";
import Countdown from "../components/Countdown";
import ExperienceBar from "../components/ExperienceBar";
import Profile from "../components/Profile";
import ChallengeBox from "../components/ChallengeBox";
import Aside from "../components/Aside";
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
            <Aside />
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
