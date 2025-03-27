class ApiClient {
  private baseUrl: string = import.meta.env.VITE_API_BASE_URL + '/api';

  constructor() {
    if (!this.baseUrl) {
      throw new Error('API base URL is not set. Check your .env file.');
    }
  }

  private async request(
    method: string,
    endpoint: string,
    sessionToken?: string,
    body?: any
  ): Promise<any> {
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

  get = (endpoint: string, sessionToken?: string) =>
    this.request('GET', endpoint, sessionToken, undefined);

  post = (endpoint: string, sessionToken: string, body: any) =>
    this.request('POST', endpoint, sessionToken, body);

  put = (endpoint: string, sessionToken: string, body: any) =>
    this.request('PUT', endpoint, sessionToken, body);

  patch = (endpoint: string, sessionToken: string, body: any) =>
    this.request('PATCH', endpoint, sessionToken, body);

  delete = (endpoint: string, sessionToken: string) =>
    this.request('DELETE', endpoint, sessionToken, undefined);
}

export default ApiClient;
