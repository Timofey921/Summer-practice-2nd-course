export interface UserProfile {
  name: string;
  about: string;
  email: string;
  avatarUrl?: string;
}

export interface ProfileUpdatePayload {
  name: string;
  about: string;
  email: string;
}
