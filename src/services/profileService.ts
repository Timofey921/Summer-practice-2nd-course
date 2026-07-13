import api from '../api/axiosInstance';
import { toReadableError } from '../utils/apiError';
import type { ProfileUpdatePayload, UserProfile } from '../types/profile';

class ProfileService {
  async getProfile(): Promise<UserProfile> {
    try {
      const { data } = await api.get<UserProfile>('/profile');
      return data;
    } catch (error) {
      throw toReadableError(error, 'Failed to load profile');
    }
  }

  async updateProfile(payload: ProfileUpdatePayload): Promise<UserProfile> {
    try {
      const { data } = await api.patch<UserProfile>('/profile', payload);
      return data;
    } catch (error) {
      throw toReadableError(error, 'Failed to save profile');
    }
  }

  async uploadAvatar(file: File): Promise<{ avatarUrl: string }> {
    const formData = new FormData();
    formData.append('avatar', file);

    try {
      const { data } = await api.post<{ avatarUrl: string }>('/profile/avatar', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      return data;
    } catch (error) {
      throw toReadableError(error, 'Failed to load avatar');
    }
  }
}

export default new ProfileService();
