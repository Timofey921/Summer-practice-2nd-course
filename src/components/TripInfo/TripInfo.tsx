import styles from './TripInfo.module.css';

interface TripInfoProps {
  title: string;
  dates: string;
  totalCost: number;
}

const TripInfo = (props: TripInfoProps) => {
  const {
    title,
    dates,
    totalCost,
  } = props;

  return (
    <section className={`${styles['trip-main__trip-info']} ${styles['trip-info']}`}>
      <div className={styles['trip-info__main']}>
        <h1 className={styles['trip-info__title']}>{title}</h1>
        <p className={styles['trip-info__dates']}>{dates}</p>
      </div>

      <p className={styles['trip-info__cost']}>
        Total: &euro;&nbsp;<span className={styles['trip-info__cost-value']}>{totalCost}</span>
      </p>
    </section>
  );
};

export default TripInfo;