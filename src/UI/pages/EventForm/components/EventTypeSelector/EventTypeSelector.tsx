import { useState } from 'react';
import styles from './EventTypeSelector.module.css';
import type { EventType } from '../../../../../types/event';
import { EVENT_TYPES, EVENT_TYPE_LABELS } from '../../../../../mock/data';

interface EventTypeSelectorProps {
  selectedType: EventType;
  onTypeChange: (type: EventType) => void;
  id: string;
}

const EventTypeSelector = (props: EventTypeSelectorProps) => {
  const {
    selectedType,
    onTypeChange,
    id,
  } = props;

  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (type: EventType) => {
    onTypeChange(type);
    setIsOpen(false);
  };

  return (
    <div className={styles['event__type-wrapper']}>
      <label
        className={`${styles['event__type']} ${styles['event__type-btn']}`}
        htmlFor={`${id}-type-toggle`}
      >
        <span className="visually-hidden">Choose event type</span>
        <img
          className={styles['event__type-icon']}
          width={17}
          height={17}
          src={`/img/${selectedType}.png`}
          alt="Event type icon"
        />
      </label>

      <input
        className={`${styles['event__type-toggle']} visually-hidden`}
        id={`${id}-type-toggle`}
        type="checkbox"
        checked={isOpen}
        onChange={() => setIsOpen((prev) => !prev)}
      />

      <div className={styles['event__type-list']}>
        <fieldset className={styles['event__type-group']}>
          <legend className="visually-hidden">Event type</legend>

          {EVENT_TYPES.map((type) => (
            <div className={styles['event__type-item']} key={type}>
              <input
                id={`${id}-type-${type}`}
                className={`${styles['event__type-input']} visually-hidden`}
                type="radio"
                name={`${id}-event-type`}
                value={type}
                checked={selectedType === type}
                onChange={() => handleSelect(type)}
              />
              <label
                className={`${styles['event__type-label']} ${styles[`event__type-label--${type}`]}`}
                htmlFor={`${id}-type-${type}`}
              >
                {EVENT_TYPE_LABELS[type]}
              </label>
            </div>
          ))}
        </fieldset>
      </div>
    </div>
  );
};

export default EventTypeSelector;