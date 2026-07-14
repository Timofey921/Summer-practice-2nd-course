import styles from './OffersSection.module.css';
import type { Offer } from '../../../types/event.ts';

interface OffersSectionProps {
  offers: Offer[];
  onChange: (offers: Offer[]) => void;
  idPrefix: string;
}

const OffersSection = (props: OffersSectionProps) => {
  const {
    offers,
    onChange,
    idPrefix,
  } = props;

  const handleTitleChange = (offerId: string, title: string) => {
    onChange(offers.map((offer) => (offer.id === offerId ? { ...offer, title } : offer)));
  };

  const handlePriceChange = (offerId: string, price: string) => {
    onChange(
      offers.map((offer) =>
        offer.id === offerId ? { ...offer, price: Number(price) || 0 } : offer,
      ),
    );
  };

  const handleAddOffer = () => {
    onChange([...offers, { id: crypto.randomUUID(), title: '', price: 0 }]);
  };

  const handleRemoveOffer = (offerId: string) => {
    onChange(offers.filter((offer) => offer.id !== offerId));
  };

  return (
    <section className={`${styles['event__section']} ${styles['event__section--offers']}`}>
      <h3 className={`${styles['event__section-title']} ${styles['event__section-title--offers']}`}>
        Offers
      </h3>

      <div className={styles['event__available-offers']}>
        {offers.map((offer) => (
          <div className={styles['event__offer-row']} key={offer.id}>
            <input
              className={styles['event__offer-title-input']}
              id={`${idPrefix}-offer-title-${offer.id}`}
              type="text"
              name={`event-offer-title-${offer.id}`}
              value={offer.title}
              placeholder="Offer"
              onChange={(event) => handleTitleChange(offer.id, event.target.value)}
            />
            <span className={styles['event__offer-plus']}>&#43;&euro;&nbsp;</span>
            <input
              className={styles['event__offer-price-input']}
              id={`${idPrefix}-offer-price-${offer.id}`}
              type="number"
              min="0"
              name={`event-offer-price-${offer.id}`}
              value={offer.price}
              onChange={(event) => handlePriceChange(offer.id, event.target.value)}
            />
            <button
              className={styles['event__offer-remove-btn']}
              type="button"
              onClick={() => handleRemoveOffer(offer.id)}
            >
              <span className="visually-hidden">Remove offer</span>
              &times;
            </button>
          </div>
        ))}

        <button className={styles['event__offer-add-btn']} type="button" onClick={handleAddOffer}>
          Add offer
        </button>
      </div>
    </section>
  );
};

export default OffersSection;
