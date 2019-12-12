import { apiRequest, handleApiErrors } from './helpers';
import * as env from '../config/env';
import { User } from '../models/User';
import { Answer } from '../models/Game';

const API_URL = env.MODE === 'dev' ? env.DEV_API_URL : env.PRODUCTION_API_URL;

export async function registerUser(body: any): Promise<any> {
  const response = await apiRequest(`${API_URL}/register`, 'POST', body);
  if (response.status_code === 201) {
    return {
      user: response.data,
      token: response.meta.access_token,
    };
  }
  handleApiErrors(response);
}

export async function loginUser(body: any): Promise<any> {
  const response = await apiRequest(`${API_URL}/login`, 'POST', body);
  if (response.status_code === 200) {
    return {
      user: response.data,
      token: response.meta.access_token,
    };
  }
  handleApiErrors(response);
}

export async function me(token: string) {
  const response = await apiRequest(`${API_URL}/me`, 'GET', null, token);
  if (response.status_code === 200) {
    return response.data;
  }
  if (response.status_code === 401) {
    localStorage.clear();
  }
  handleApiErrors(response);
}

export async function userLogout(token: string) {
  const response = await apiRequest(`${API_URL}/logout`, 'GET', null, token);
  if (response.status_code !== 204) {
    handleApiErrors(response);
  }
}

export async function fetchUserByGoogleId(googleId: number | undefined): Promise<any> {
  const response = await apiRequest(`${API_URL}/users/google/${googleId}`, 'GET');
  if (response.status_code === 200) {
    return {
      user: response.data,
      token: response.meta.access_token,
    };
  } if (response.status_code === 404) {
    return {
      user: null,
      token: null,
    };
  }
  handleApiErrors(response);
}

export async function storeUser(user: User): Promise<any> {
  const response = await apiRequest(`${API_URL}/users`, 'POST', user);
  if (response.status_code === 201) {
    return {
      user: response.data,
      token: response.meta.access_token,
    };
  }
  handleApiErrors(response);
}

export async function fetchGenres() {
  const response = await apiRequest(`${API_URL}/genres`, 'GET');
  if (response.status_code === 200) {
    return response.data;
  }
  handleApiErrors(response);
}

export async function fetchGenre(id: string|number) {
  const response = await apiRequest(`${API_URL}/genres/${id}`, 'GET');
  if (response.status_code === 200) {
    return response.data;
  }
  handleApiErrors(response);
}

export async function fetchTrack(genreId: string|number) {
  const response = await apiRequest(`${API_URL}/quizz/${genreId}/askTrack`, 'GET');
  handleApiErrors(response);
}

export async function sendAnswer(genreId: number | string, userId: number | undefined, answer: { input: string; order: number | string }) {
  const response = await apiRequest(`${API_URL}/quizz/${genreId}/user/${userId}/song`, 'POST', answer);
  handleApiErrors(response);
}

export async function fetchStats(id: string|number, token: string) {
  const response = await apiRequest(`${API_URL}/users/${id}/stats`, 'GET', null, token);
  if (response.status_code === 200) {
    return response.data;
  } else {
    return null;
  }
  handleApiErrors(response);
}
