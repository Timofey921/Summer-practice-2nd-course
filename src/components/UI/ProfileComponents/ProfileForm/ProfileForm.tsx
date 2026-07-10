import { useState, useEffect, useRef } from 'react';
import type { ChangeEvent, SubmitEventHandler } from 'react';
import profileService from '../../../../services/profileService';
import styles from './ProfileForm.module.css';

const FORM_STORAGE_KEY = 'profile_form_draft';

interface StoredDraft {
  name?: string;
  about?: string;
  email?: string;
}

const getStoredDraft = (): StoredDraft => {
  if (typeof window === 'undefined') return {};
  const saved = localStorage.getItem(FORM_STORAGE_KEY);
  return saved ? (JSON.parse(saved) as StoredDraft) : {};
};

const ProfileForm = () => {
  const [name, setName] = useState<string>('');
  const [about, setAbout] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const shouldSaveRef = useRef<boolean>(true);

  useEffect(() => {
    const loadProfile = async (): Promise<void> => {
      try {
        setInitialLoading(true);

        const profileData = await profileService.getProfile();
        const stored = getStoredDraft();

        setName(stored.name !== undefined ? stored.name : profileData.name || '');
        setAbout(stored.about !== undefined ? stored.about : profileData.about || '');
        setEmail(stored.email !== undefined ? stored.email : profileData.email || '');
      } catch (error) {
        setErrorMessage(error instanceof Error ? error.message : 'Failed to load profile');
      } finally {
        setInitialLoading(false);
      }
    };

    loadProfile();
  }, []);

  useEffect(() => {
    if (shouldSaveRef.current && !initialLoading) {
      localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify({ name, about, email }));
    }
  }, [name, about, email, initialLoading]);

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      await profileService.updateProfile({ name, about, email });

      shouldSaveRef.current = false;
      localStorage.removeItem(FORM_STORAGE_KEY);

      alert('Profile successfully updated');
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Failed to save');
      shouldSaveRef.current = true;
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = (): void => {
    shouldSaveRef.current = false;
    localStorage.removeItem(FORM_STORAGE_KEY);

    setInitialLoading(true);
    profileService
      .getProfile()
      .then((profileData) => {
        setName(profileData.name || '');
        setAbout(profileData.about || '');
        setEmail(profileData.email || '');
        setErrorMessage('');
      })
      .catch((error) => setErrorMessage(error instanceof Error ? error.message : 'Filed to load'))
      .finally(() => {
        setInitialLoading(false);
        shouldSaveRef.current = true;
      });
  };

  const handleAvatarClick = (): void => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (event: Event): Promise<void> => {
      const target = event.target as HTMLInputElement;
      const file = target.files?.[0];
      if (!file) return;

      try {
        setLoading(true);
        await profileService.uploadAvatar(file);
        alert('Avatar successfully loaded');
      } catch (error) {
        setErrorMessage(error instanceof Error ? error.message : 'Failed to load avatar');
      } finally {
        setLoading(false);
      }
    };
    input.click();
  };

  if (initialLoading) {
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>Personal account</h2>
        <p className={styles.loadingText}>Loading...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Personal account</h2>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.avatarSection}>
          <button
            type="button"
            className={styles.avatarButton}
            onClick={handleAvatarClick}
            aria-label="Upload profile photo"
            disabled={loading}
          >
            <svg className={styles.avatarIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5V19" stroke="var(--navy)" strokeWidth="2" strokeLinecap="round" />
              <path d="M5 12H19" stroke="var(--navy)" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>

          <div className={styles.formGroup}>
            <input
              id="name"
              type="text"
              placeholder="Your name"
              className={styles.input}
              value={name}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
              disabled={loading}
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="about" className={styles.label}>
            About me
          </label>
          <textarea
            id="about"
            placeholder="About me"
            rows={4}
            className={styles.textarea}
            value={about}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setAbout(e.target.value)}
            disabled={loading}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            className={styles.input}
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            disabled={loading}
            required
          />
        </div>

        <div className={styles.buttonGroup}>
          <button type="button" onClick={handleCancel} disabled={loading} className={styles.cancelButton}>
            Cancel
          </button>
          <button type="submit" disabled={loading} className={styles.submitButton}>
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>

      <div className={errorMessage ? styles.error : styles.errorPlaceholder} aria-live="polite" role="alert">
        {errorMessage || '\u00A0'}
      </div>
    </div>
  );
};

export default ProfileForm;
