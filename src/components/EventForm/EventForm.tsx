import { useState, type SubmitEventHandler } from 'react';
import type { EventType, TripEvent } from '../../types/event.ts';
import { AVAILABLE_OFFERS, EVENT_TYPE_LABELS } from '../../mock/data.ts';
import { findDestinationByName } from '../../utils/destinations.ts';
import EventTypeSelector from './components/EventTypeSelector/EventTypeSelector.tsx';
import OffersSection from './components/OffersSection/OffersSection.tsx';
import DestinationSection from './components/DestinationDescription/DestinationDescription.tsx';
import DestinationField from './components/DestinationField/DestinationField.tsx';
import TimeField from './components/TimeField/TimeField.tsx';
import PriceField from './components/PriceField/PriceField.tsx';
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

  const [type, setType] = useState<EventType>(event?.type ?? 'flight');
  const [destinationName, setDestinationName] = useState(event?.destination.name ?? '');
  const [dateFrom, setDateFrom] = useState(event?.dateFrom ?? '');
  const [dateTo, setDateTo] = useState(event?.dateTo ?? '');
  const [price, setPrice] = useState(event ? String(event.price) : '');
  const [selectedOfferIds, setSelectedOfferIds] = useState<string[]>(
    event?.offers.map((offer) => offer.id) ?? [],
  );

  const id = event?.id ?? 'new-event';
  const destination = findDestinationByName(destinationName);

  const handleOfferToggle = (offerId: string) => {
    setSelectedOfferIds((prev) =>
      prev.includes(offerId) ? prev.filter((selectedId) => selectedId !== offerId) : [...prev, offerId],
    );
  };

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (formEvent) => {
    formEvent.preventDefault();

    const submittedEvent: TripEvent = {
      id: event?.id ?? crypto.randomUUID(),
      type,
      destination: destination ?? { name: destinationName, description: '', photos: [] },
      dateFrom,
      dateTo,
      price: Number(price) || 0,
      offers: AVAILABLE_OFFERS.filter((offer) => selectedOfferIds.includes(offer.id)),
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
        <OffersSection
          offers={AVAILABLE_OFFERS}
          selectedOfferIds={selectedOfferIds}
          onToggle={handleOfferToggle}
          idPrefix={id}
        />
        <DestinationSection destination={destination} />
      </section>
    </form>
  );
};

export default EventForm;