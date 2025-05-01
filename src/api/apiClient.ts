import { ApiError } from '../types';

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
    body?: any,
    isFormData: boolean = false
  ): Promise<T> {
    const headerObj: Record<string, string> = {};

    if (!isFormData && body && method !== 'GET') {
      headerObj['Content-Type'] = 'application/json';
    }

    const options: RequestInit = {
      method: method,
      headers: headerObj,
      credentials: 'include',
    };

    if (isFormData) {
      // For FormData, we don't need to set Content-Type, browser does it automatically
      options.body = body;
    } else if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, options);

    const responseData = await response.json().catch(() => ({}));

    if (!response.ok) {
      const error: ApiError = {
        errors: responseData.errors || undefined,
        message: responseData.message || `Request failed with status ${response.status}`,
      };
      throw error;
    }

    return responseData as T;
  }

  get = <T>(endpoint: string): Promise<T> => this.request<T>('GET', endpoint);

  post = <T>(endpoint: string, body: any): Promise<T> => this.request<T>('POST', endpoint, body);

  put = <T>(endpoint: string, body: any): Promise<T> => this.request<T>('PUT', endpoint, body);

  patch = <T>(endpoint: string, body: any, isFormData: boolean = false): Promise<T> =>
    this.request<T>('PATCH', endpoint, body, isFormData);

  delete = <T>(endpoint: string) => this.request<T>('DELETE', endpoint);
}
