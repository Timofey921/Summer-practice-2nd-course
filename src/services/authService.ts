export interface AuthTokens {
  access: string;
  refresh: string;
}

interface StoredUser {
  password: string;
  tokens: AuthTokens;
}

const USERS_STORAGE_KEY = 'auth-users';
const ACCESS_TOKEN_KEY = 'accessToken';

const getStoredUsers = (): Record<string, StoredUser> => {
  const raw = localStorage.getItem(USERS_STORAGE_KEY);
  return raw ? JSON.parse(raw) : {};
};

const saveStoredUsers = (users: Record<string, StoredUser>): void => {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
};

const createTokens = (): AuthTokens => ({
  access: `mock_access_${Date.now()}`,
  refresh: `mock_refresh_${Date.now()}`,
});

class AuthService {
  private saveAccessToken(token: string): void {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
  }

  getAccessToken(): string | null {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  }

  clearAccessToken(): void {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  }

  async login(email: string, password: string): Promise<AuthTokens> {
    const users = getStoredUsers();
    const user = users[email];

    if (!user || user.password !== password) {
      throw new Error('Wrong email or password');
    }

    this.saveAccessToken(user.tokens.access);
    return user.tokens;
  }

  async register(email: string, password: string): Promise<AuthTokens> {
    const users = getStoredUsers();

    if (users[email]) {
      throw new Error('User with this email already exists');
    }

    const tokens = createTokens();
    users[email] = { password, tokens };
    saveStoredUsers(users);

    this.saveAccessToken(tokens.access);
    return tokens;
  }

  async validate(): Promise<boolean> {
    return !!this.getAccessToken();
  }

  logout(): void {
    this.clearAccessToken();
  }
}

export default new AuthService();