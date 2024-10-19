import Cookies from 'js-cookie';


const apiFetch = async (url: string, options: RequestInit = {}) => {
  const token = Cookies.get('token');
  console.log('Token in Fetch:', token);
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`http://localhost:5000/api${url}`, {
    ...options,
    headers,
  });
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
};

export const get = async (url: string) => {
  return await apiFetch(url, {
    method: 'GET',
  });
};

export const post = async (url: string, data: any) => {
  return await apiFetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export const put = async (url: string, data: any) => {
  return await apiFetch(url, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
};

export const del = async (url: string) => {
  return await apiFetch(url, {
    method: 'DELETE',
  });
};
