export class AuthClient {
  private baseUrl = import.meta.env.VITE_API_BASE_URL + '/auth';

  constructor() {
    if (!this.baseUrl) {
      throw new Error('API base URL is not set. Check your .env file.');
    }
  }

  private async request<T>(
    method: string,
    endpoint: string,
    body?: any
  ): Promise<T> {
    const headerObj: Record<string, string> = {};

    if (body && method !== 'GET') {
      headerObj['Content-Type'] = 'application/json';
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: method,
      headers: headerObj,
      credentials: 'include',
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    return response.json();
  }

  login = <T>(data: { email: string; password: string }) =>
    this.request<T>('POST', '/login', data);

  register = <T>(data: {
    email: string;
    password: string;
    confirtmPassword: string;
    username: string;
  }) => this.request<T>('POST', '/register', data);

  refreshAccessToken = () => this.request('POST', '/token/refresh');
}
