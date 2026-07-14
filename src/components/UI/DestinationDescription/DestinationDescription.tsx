import styles from './DestinationDescription.module.css';

interface DestinationSectionProps {
  destinationName: string;
  description: string;
  photos: string[];
  onDescriptionChange: (value: string) => void;
}

const DestinationSection = (props: DestinationSectionProps) => {
  const {
    destinationName,
    description,
    photos,
    onDescriptionChange,
  } = props;

  if (!destinationName.trim()) {
    return null;
  }

  return (
    <section className={`${styles['event__section']} ${styles['event__section--destination']}`}>
      <h3 className={`${styles['event__section-title']} ${styles['event__section-title--destination']}`}>
        Destination
      </h3>

      <textarea
        className={styles['event__destination-description']}
        value={description}
        placeholder="Type your destination info here"
        onChange={(event) => onDescriptionChange(event.target.value)}
      />

      {photos.length > 0 && (
        <div className={styles['event__photos-container']}>
          <div className={styles['event__photos-tape']}>
            {photos.map((photo) => (
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
