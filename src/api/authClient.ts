import { LoginDto, RegisterDto } from '../schemas';
import { ApiError } from '../types';

interface LoginResponse extends RegisterResponse {
  imageUrl: string;
}

interface RegisterResponse {
  id: number;
  username: string;
  roles: string[];
}

interface LogoutResponse {
  message: string;
}

class AuthClient {
  private baseUrl = import.meta.env.VITE_API_BASE_URL + '/auth';

  constructor() {
    if (!this.baseUrl) {
      throw new Error('API base URL is not set. Check your .env file.');
    }
  }

  private async request<T>(method: string, endpoint: string, body?: any): Promise<T> {
    const headerObj: Record<string, string> = {};

    if (body && method !== 'GET') {
      headerObj['Content-Type'] = 'application/json';
    }

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: method,
        headers: headerObj,
        credentials: 'include',
        body: body ? JSON.stringify(body) : undefined,
      });

      const responseData = await response.json().catch(() => ({}));

      if (!response.ok) {
        // Structure the error to match your ApiError interface
        const error: ApiError = {
          errors: responseData.errors || undefined,
          message: responseData.message || `Request failed with status ${response.status}`,
        };
        throw error;
      }

      return responseData as T;
    } catch (error) {
      // Ensure all errors conform to ApiError interface
      if (error instanceof Error) {
        throw {
          message: error.message || 'Network request failed',
        } satisfies ApiError;
      }
      throw error;
    }
  }

  login = (data: LoginDto): Promise<LoginResponse> => this.request('POST', '/login', data);

  register = (data: RegisterDto): Promise<RegisterResponse> =>
    this.request('POST', '/register', data);

  logout = (): Promise<LogoutResponse> => this.request('POST', '/logout');

  refreshAccessToken = () => this.request('POST', '/token/refresh');
}

export const authApi = new AuthClient();
