const API_BASE = process.env.REACT_APP_API_URL || 'https://react-rent.onrender.com';
const API_HEADERS = new Headers({
  'X-SimpleOvpApi': 'USER_KEY_2',
});

export function mediaUrl(path) {
  if (!path) {
    return '';
  }
  if (/^https?:\/\//.test(path)) {
    return path;
  }
  return `${API_BASE}/${path.replace(/^\//, '')}`;
}

export function fetchCatalog() {
  return Promise.all([
    fetch(`${API_BASE}/api/movie`, { headers: API_HEADERS }),
    fetch(`${API_BASE}/api/serie`, { headers: API_HEADERS }),
  ]).then(([movies, series]) => Promise.all([movies.json(), series.json()]));
}
