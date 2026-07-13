type Listener = () => void;

let listener: Listener | null = null;

export const onForceLogout = (callback: Listener): (() => void) => {
  listener = callback;
  return () => {
    if (listener === callback) listener = null;
  };
};

export const triggerForceLogout = (): void => {
  listener?.();
};
