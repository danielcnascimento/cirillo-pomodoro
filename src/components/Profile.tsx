import styles from "../styles/components/Profile.module.css";

const Profile = () => {
  return (
    <div className={styles.profileContainer}>
      <img src="https://github.com/danielcnascimento.png" alt="" />
      <div>
        <strong>Daniel Nascimento</strong>
        <p>
          <img src="icons/level.svg" alt="level" />
          Level 1
        </p>
      </div>
    </div>
  );
};

export default Profile;
