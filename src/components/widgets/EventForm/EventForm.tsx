import { useEffect, useState, type SubmitEventHandler } from 'react';
import type { EventType, Offer, TripEvent } from '../../../types/event.ts';
import { EVENT_TYPE_LABELS } from '../../../mock/data.ts';
import { findDestinationByName } from '../../../utils/destinations.ts';
import EventTypeSelector from '../../UI/EventTypeSelector/EventTypeSelector.tsx';
import OffersSection from '../../UI/OffersSection/OffersSection.tsx';
import DestinationSection from '../../UI/DestinationDescription/DestinationDescription.tsx';
import DestinationField from '../../UI/DestinationField/DestinationField.tsx';
import TimeField from '../../UI/TimeField/TimeField.tsx';
import PriceField from '../../UI/PriceField/PriceField.tsx';
import styles from './EventForm.module.css';

interface EventFormProps {
  mode: 'add' | 'edit';
  event?: TripEvent;
  onSubmit: (event: TripEvent) => void;
  onCancel: () => void;
  onDelete?: (id: string) => void;
  onRollup?: () => void;
}

const EventForm = (props: EventFormProps) => {
  const {
    mode,
    event,
    onSubmit,
    onCancel,
    onDelete,
    onRollup,
  } = props;

  const [type, setType] = useState<EventType>(mode === 'add' ? 'flight' : (event?.type ?? 'flight'));
  const [destinationName, setDestinationName] = useState(mode === 'add' ? '' : (event?.destination.name ?? ''));
  const [destinationDescription, setDestinationDescription] = useState(
    mode === 'add' ? '' : (event?.destination.description ?? ''),
  );
  const [dateFrom, setDateFrom] = useState(mode === 'add' ? '' : (event?.dateFrom ?? ''));
  const [dateTo, setDateTo] = useState(mode === 'add' ? '' : (event?.dateTo ?? ''));
  const [price, setPrice] = useState(mode === 'add' ? '0' : String(event?.price ?? 0));
  const [offers, setOffers] = useState<Offer[]>(mode === 'add' ? [] : (event?.offers ?? []));

  const id = event?.id ?? 'new-event';
  const knownDestination = findDestinationByName(destinationName);

  useEffect(() => {
    const handleKeyDown = (keyboardEvent: KeyboardEvent) => {
      if (keyboardEvent.key === 'Escape') {
        if (mode === 'edit') {
          onRollup?.();
        } else {
          onCancel();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [mode, onCancel, onRollup]);

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (formEvent) => {
    formEvent.preventDefault();

    const submittedEvent: TripEvent = {
      id: event?.id ?? crypto.randomUUID(),
      type,
      destination: {
        name: destinationName,
        description: destinationDescription,
        photos: knownDestination?.photos ?? event?.destination.photos ?? [],
      },
      dateFrom,
      dateTo,
      price: Number(price) || 0,
      offers: offers.filter((offer) => offer.title.trim()),
      isFavorite: event?.isFavorite ?? false,
    };

    onSubmit(submittedEvent);
  };

  const handleSecondaryAction = () => {
    if (mode === 'edit' && event) {
      onDelete?.(event.id);
    } else {
      onCancel();
    }
  };

  return (
    <form className={styles['event--edit']} action="#" method="post" onSubmit={handleSubmit}>
      <header className={styles['event__header']}>
        <EventTypeSelector selectedType={type} onTypeChange={setType} id={id} />

        <DestinationField
          id={id}
          eventTypeLabel={EVENT_TYPE_LABELS[type]}
          destinationName={destinationName}
          onDestinationChange={setDestinationName}
        />

        <div className={`${styles['event__field-group']} ${styles['event__field-group--time']}`}>
          <TimeField id={`${id}-start-time`} labelText="From" name="event-start-time" value={dateFrom} onChange={setDateFrom} />
          &mdash;
          <TimeField id={`${id}-end-time`} labelText="To" name="event-end-time" value={dateTo} onChange={setDateTo} />
        </div>

        <PriceField id={`${id}-price`} value={price} onChange={setPrice} />

        <button className={`${styles['event__save-btn']} btn btn--blue`} type="submit">
          Save
        </button>
        <button className={styles['event__reset-btn']} type="button" onClick={handleSecondaryAction}>
          {mode === 'edit' ? 'Delete' : 'Cancel'}
        </button>
        {mode === 'edit' && (
          <button className={styles['event__rollup-btn']} type="button" onClick={onRollup}>
            <span className="visually-hidden">Open event</span>
          </button>
        )}
      </header>

      <section className={styles['event__details']}>
        <OffersSection offers={offers} onChange={setOffers} idPrefix={id} />
        <DestinationSection
          destinationName={destinationName}
          description={destinationDescription}
          photos={knownDestination?.photos ?? []}
          onDescriptionChange={setDestinationDescription}
        />
      </section>
    </form>
  );
};

export default EventForm;
