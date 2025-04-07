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

  get = <T>(endpoint: string) => this.request<T>('GET', endpoint);

  post = <T>(endpoint: string, body: any) =>
    this.request<T>('POST', endpoint, body);

  put = <T>(endpoint: string, body: any) =>
    this.request<T>('PUT', endpoint, body);

  patch = <T>(endpoint: string, body: any) =>
    this.request<T>('PATCH', endpoint, body);

  delete = <T>(endpoint: string) => this.request<T>('DELETE', endpoint);
}
