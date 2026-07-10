import type { ProfileUpdatePayload, UserProfile } from '../types/profile';

const API_BASE = '/api/profile';

class ProfileService {
  async getProfile(): Promise<UserProfile> {
    const response = await fetch(API_BASE, {
      method: 'GET',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to load profile');
    }

    return response.json() as Promise<UserProfile>;
  }

  async updateProfile(data: ProfileUpdatePayload): Promise<UserProfile> {
    const response = await fetch(API_BASE, {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to save profile');
    }

    return response.json() as Promise<UserProfile>;
  }

  async uploadAvatar(file: File): Promise<{ avatarUrl: string }> {
    const formData = new FormData();
    formData.append('avatar', file);

    const response = await fetch(`${API_BASE}/avatar`, {
      method: 'POST',
      credentials: 'include',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to load avatar');
    }

    return response.json() as Promise<{ avatarUrl: string }>;
  }
}

export default new ProfileService();
