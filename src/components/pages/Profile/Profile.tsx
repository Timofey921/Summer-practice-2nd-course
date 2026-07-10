import ProfileHeader from '../../UI/ProfileComponents/ProfileHeader/ProfileHeader';
import ProfileForm from '../../UI/ProfileComponents/ProfileForm/ProfileForm';
import styles from './Profile.module.css';

const Profile = () => {
  return (
    <div className={styles.page}>
      <ProfileHeader />
      <main className={styles.main}>
        <ProfileForm />
      </main>
    </div>
  );
};

export default Profile;
