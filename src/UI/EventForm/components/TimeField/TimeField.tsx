import styles from './TimeField.module.css';

interface TimeFieldProps {
  id: string;
  labelText: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
}

const TimeField = (props: TimeFieldProps) => {
  const {
    id,
    labelText,
    name,
    value,
    onChange,
  } = props;

  return (
    <>
      <label className="visually-hidden" htmlFor={id}>
        {labelText}
      </label>
      <input
        className={`${styles['event__input']} ${styles['event__input--time']}`}
        id={id}
        type="text"
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </>
  );
};

export default TimeField;