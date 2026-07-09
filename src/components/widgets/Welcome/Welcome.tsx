import WelcomeHeader from '../../UI/WelcomeComponents/WelcomeHeader/WelcomeHeader';
import HeroComp from '../../UI/WelcomeComponents/HeroComp/HeroComp';
import AboutComp from '../../UI/WelcomeComponents/AboutComp/AboutComp';
import WelcomeFooter from '../../UI/WelcomeComponents/WelcomeFooter/WelcomeFooter';
import styles from './Welcome.module.css';

const Welcome = () => {
  return (
    <div className={styles.page}>
      <WelcomeHeader />
      <HeroComp />
      <div id="about"><AboutComp /></div>
      <WelcomeFooter />
    </div>
  );
};

export default Welcome;
