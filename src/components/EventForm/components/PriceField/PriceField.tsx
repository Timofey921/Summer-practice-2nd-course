import styles from './PriceField.module.css';

interface PriceFieldProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
}

const PriceField = (props: PriceFieldProps) => {
  const {
    id,
    value,
    onChange,
  } = props;

  return (
    <div className={`${styles['event__field-group']} ${styles['event__field-group--price']}`}>
      <label className={styles['event__label']} htmlFor={`${id}-price`}>
        <span className="visually-hidden">Price</span>
        &euro;
      </label>
      <input
        className={`${styles['event__input']} ${styles['event__input--price']}`}
        id={id}
        type="number"
        name="event-price"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default PriceField;