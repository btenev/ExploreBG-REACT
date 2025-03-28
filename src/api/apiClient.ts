export class ApiClient {
  private baseUrl: string = import.meta.env.VITE_API_BASE_URL + '/api';

  constructor() {
    if (!this.baseUrl) {
      throw new Error('API base URL is not set. Check your .env file.');
    }
  }

  private async request<T>(
    method: string,
    endpoint: string,
    sessionToken?: string,
    body?: any
  ): Promise<T> {
    const headerObj: Record<string, string> = {};

    if (body && method !== 'GET') {
      headerObj['Content-Type'] = 'application/json';
    }

    if (sessionToken) {
      headerObj['Authorization'] = `Bearer ${sessionToken}`;
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: method,
      headers: headerObj,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    return response.json();
  }

  get = <T>(endpoint: string, sessionToken?: string) =>
    this.request<T>('GET', endpoint, sessionToken, undefined);

  post = <T>(endpoint: string, sessionToken: string, body: any) =>
    this.request<T>('POST', endpoint, sessionToken, body);

  put = <T>(endpoint: string, sessionToken: string, body: any) =>
    this.request<T>('PUT', endpoint, sessionToken, body);

  patch = <T>(endpoint: string, sessionToken: string, body: any) =>
    this.request<T>('PATCH', endpoint, sessionToken, body);

  delete = <T>(endpoint: string, sessionToken: string) =>
    this.request<T>('DELETE', endpoint, sessionToken, undefined);
}
