import styles from "./AboutComp.module.css";

const AboutComp = () => {
  return (
    <section className={styles.section}>
      <div className={styles.row}>
        <div className={styles.media}>
          <svg viewBox="0 0 480 360" xmlns="http://www.w3.org/2000/svg" className={styles.illustration}>
            <rect x="0" y="0" width="480" height="360" rx="16" fill="var(--sand)" />
            <path
              d="M60 260 C 130 200, 150 300, 220 220 S 340 120, 420 150"
              stroke="var(--route)"
              strokeWidth="3"
              strokeDasharray="1 12"
              strokeLinecap="round"
              fill="none"
            />
            <circle cx="60" cy="260" r="7" fill="var(--navy)" />
            <circle cx="220" cy="220" r="7" fill="var(--route)" />
            <circle cx="420" cy="150" r="7" fill="var(--navy)" />
            <path d="M40 300 L 440 300" stroke="var(--hairline)" strokeWidth="1" />
            <path d="M40 60 L 40 300" stroke="var(--hairline)" strokeWidth="1" />
          </svg>
        </div>

        <div className={styles.text}>
          <h2 className={styles.title}>Set your route by days</h2>
          <p className={styles.description}>
            Set the date of arrival and departure of the route point.
            This way you can track the duration of the entire trip. 
            and plan your vacation more optimally.
          </p>
        </div>
      </div>

      <div className={`${styles.row} ${styles.rowReverse}`}>
        <div className={styles.text}>
          <h2 className={styles.title}>Calculate the cost of the trip in advance</h2>
          <p className={styles.description}>
            Tickets, accommodation, food and activities are all in one calculation.
            Change your route and immediately see how it affects the total amount 
            in order to plan a trip for your budget.
          </p>
        </div>

        <div className={styles.media}>
          <svg viewBox="0 0 480 360" xmlns="http://www.w3.org/2000/svg" className={styles.illustration}>
            <rect x="0" y="0" width="480" height="360" rx="16" fill="var(--navy)" />
            <rect x="150" y="60" width="180" height="240" rx="8" fill="#f2f2f2" />
            <line x1="172" y1="100" x2="308" y2="100" stroke="var(--hairline)" strokeWidth="2" />
            <line x1="172" y1="130" x2="290" y2="130" stroke="var(--hairline)" strokeWidth="2" />
            <line x1="172" y1="160" x2="300" y2="160" stroke="var(--hairline)" strokeWidth="2" />
            <line x1="172" y1="190" x2="270" y2="190" stroke="var(--hairline)" strokeWidth="2" />
            <line x1="172" y1="230" x2="308" y2="230" stroke="var(--route)" strokeWidth="3" />
            <text x="172" y="264" fontFamily="JetBrains Mono, monospace" fontSize="22" fill="var(--route)">
              5 420 $
            </text>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default AboutComp;
