import styles from './DestinationField.module.css';
import { DESTINATIONS } from '../../../mock/data';

interface DestinationFieldProps {
  id: string;
  eventTypeLabel: string;
  destinationName: string;
  onDestinationChange: (name: string) => void;
}

const DestinationField = (props: DestinationFieldProps) => {
  const {
    id,
    eventTypeLabel,
    destinationName,
    onDestinationChange,
  } = props;

  return (
    <div className={`${styles['event__field-group']} ${styles['event__field-group--destination']}`}>
      <label
        className={`${styles['event__label']} ${styles['event__type-output']}`}
        htmlFor={`${id}-destination`}
      >
        {eventTypeLabel}
      </label>

      <input
        className={`${styles['event__input']} ${styles['event__input--destination']}`}
        id={`${id}-destination`}
        type="text"
        name="event-destination"
        value={destinationName}
        onChange={(e) => onDestinationChange(e.target.value)}
        list={`${id}-destination-list`}
      />

      <datalist id={`${id}-destination-list`}>
        {DESTINATIONS.map((d) => (
          <option value={d.name} key={d.name} />
        ))}
      </datalist>
    </div>
  );
};

export default DestinationField;