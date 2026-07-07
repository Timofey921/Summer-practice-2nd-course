import styles from './OffersSection.module.css';
import type { Offer } from '../../../../../types/event.ts';

interface OffersSectionProps {
  offers: Offer[];
  selectedOfferIds: string[];
  onToggle: (offerId: string) => void;
  idPrefix: string;
}

const OffersSection = (props: OffersSectionProps) => {
  const {
    offers,
    selectedOfferIds,
    onToggle,
    idPrefix,
  } = props;

  if (offers.length === 0) {
    return null;
  }

  return (
    <section className={`${styles['event__section']} ${styles['event__section--offers']}`}>
      <h3 className={`${styles['event__section-title']} ${styles['event__section-title--offers']}`}>
        Offers
      </h3>

      <div className={styles['event__available-offers']}>
        {offers.map((offer) => (
          <div className={styles['event__offer-selector']} key={offer.id}>
            <input
              className={`${styles['event__offer-checkbox']} visually-hidden`}
              id={`${idPrefix}-offer-${offer.id}`}
              type="checkbox"
              name={`event-offer-${offer.id}`}
              checked={selectedOfferIds.includes(offer.id)}
              onChange={() => onToggle(offer.id)}
            />
            <label
              className={styles['event__offer-label']}
              htmlFor={`${idPrefix}-offer-${offer.id}`}
            >
              <span className={styles['event__offer-title']}>{offer.title}</span>
              &nbsp;&#43;&euro;&nbsp;
              <span className={styles['event__offer-price']}>{offer.price}</span>
            </label>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OffersSection;