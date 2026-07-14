import type { TripEvent } from '../../../types/event.ts';
import { EVENT_TYPE_LABELS } from '../../../mock/data.ts';
import { formatEventDate, formatEventDuration, formatEventTime } from '../../../utils/date.ts';
import styles from './EventCard.module.css';

interface EventCardProps {
  event: TripEvent;
  onOpen: (id: string) => void;
}

const EventCard = (props: EventCardProps) => {
  const {
    event,
    onOpen,
  } = props;

  return (
    <div className={styles['event']}>
      <time className={styles['event__date']} dateTime={event.dateFrom}>
        {formatEventDate(event.dateFrom)}
      </time>

      <div className={styles['event__type']}>
        <img
          className={styles['event-card__type-icon']}
          src={`/img/${event.type}.png`}
          alt="Event type icon"
        />
      </div>

      <h3 className={styles['event__title']}>
        {EVENT_TYPE_LABELS[event.type]} {event.destination.name}
      </h3>

      <div className={styles['event__schedule']}>
        <p className={styles['event__time']}>
          <time className={styles['event__start-time']} dateTime={event.dateFrom}>
            {formatEventTime(event.dateFrom)}
          </time>
          &mdash;
          <time className={styles['event__end-time']} dateTime={event.dateTo}>
            {formatEventTime(event.dateTo)}
          </time>
        </p>
        <p className={styles['event__duration']}>{formatEventDuration(event.dateFrom, event.dateTo)}</p>
      </div>

      <p className={styles['event__price']}>
        &euro;&nbsp;<span className={styles['event__price-value']}>{event.price}</span>
      </p>

      {event.offers.length > 0 && (
        <>
          <h4 className="visually-hidden">Offers:</h4>
          <ul className={styles['event__selected-offers']}>
            {event.offers.map((offer) => (
              <li className={styles['event__offer']} key={offer.id}>
                <span className={styles['event__offer-title']}>{offer.title}</span>
                &nbsp;&#43;&euro;&nbsp;
                <span className={styles['event__offer-price']}>{offer.price}</span>
              </li>
            ))}
          </ul>
        </>
      )}

      <button className={styles['event__rollup-btn']} type="button" onClick={() => onOpen(event.id)}>
        <span className="visually-hidden">Open event</span>
      </button>
    </div>
  );
};

export default EventCard;
