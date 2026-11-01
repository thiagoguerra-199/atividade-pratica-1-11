const API_URL = '/api';

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, options);
  if (!response.ok) {
    throw new Error(`Erro HTTP ${response.status}`);
  }
  return response.json();
}

export function getProducts({ signal } = {}) {
  return request('/produtos', { signal });
}

export function getProductById(id, { signal } = {}) {
  return request(`/produtos/${encodeURIComponent(id)}`, { signal });
}
