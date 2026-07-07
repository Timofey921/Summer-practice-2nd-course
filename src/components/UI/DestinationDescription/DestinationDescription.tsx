import styles from './DestinationDescription.module.css';
import type { Destination } from '../../../types/event';

interface DestinationSectionProps {
  destination: Destination | null;
}

const DestinationSection = (props: DestinationSectionProps) => {
  const {
    destination,
  } = props;

  if (!destination || (!destination.description && destination.photos.length === 0)) {
    return null;
  }

  return (
    <section className={`${styles['event__section']} ${styles['event__section--destination']}`}>
      <h3 className={`${styles['event__section-title']} ${styles['event__section-title--destination']}`}>
        Destination
      </h3>

      {destination.description && (
        <p className={styles['event__destination-description']}>
          {destination.description}
        </p>
      )}

      {destination.photos.length > 0 && (
        <div className={styles['event__photos-container']}>
          <div className={styles['event__photos-tape']}>
            {destination.photos.map((photo) => (
              <img
                className={styles['event__photo']}
                src={photo}
                alt="Event photo"
                key={photo}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default DestinationSection;