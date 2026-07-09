import emailIcon from '../../../../../public/img/envelope.svg';
import telegramIcon from '../../../../../public/img/plane.svg';
import vkIcon from '../../../../../public/img/chat.svg';
import phoneIcon from '../../../../../public/img/phone.svg';
import styles from './WelcomeFooter.module.css';

const WelcomeFooter = () => {
  return (
    <footer id="contacts" className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.brand}>
            <h3 className={styles.title}>Big Trip</h3>
            <p className={styles.description}>
              We help you plan your route and budget 
              so that you can only think about the trip itself.
            </p>
          </div>

          <div className={styles.contacts}>
            <h4 className={styles.heading}>Contacts</h4>
            <div className={styles.grid}>
              <a href="mailto:info@bolshoe-puteshestvie.ru" className={styles.item}>
                <img src={emailIcon} className={styles.icon} alt="Email"/>
                <span className={styles.text}>info@big-trip.com</span>
              </a>

              <a href="https://t.me/bolshoe_puteshestvie" target="_blank" rel="noopener noreferrer" className={styles.item}>
                <img src={telegramIcon} className={styles.icon} alt="Telegram"/>
                <span className={styles.text}>@big-trip</span>
              </a>

              <a href="https://vk.com/bolshoeputeshestvie" target="_blank" rel="noopener noreferrer" className={styles.item}>
                <img src={vkIcon} className={styles.icon} alt="VK"/>
                <span className={styles.text}>vk.com/big-trip</span>
              </a>

              <a href="tel:+79991234567" className={styles.item}>
                <img src={phoneIcon} className={styles.icon} alt="Phone number"/>
                <span className={styles.text}>+7 (9XX) XXX-XX-XX</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default WelcomeFooter;
