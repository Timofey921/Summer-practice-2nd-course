import styles from './EventAddButton.module.css';

interface EventAddButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

const EventAddButton = (props: EventAddButtonProps) => {
  const {
    onClick,
    disabled,
  } = props;

  return (
    <button
      className={`${styles['trip-main__event-add-btn']} btn btn--big btn--yellow`}
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      New event
    </button>
  );
};

export default EventAddButton;