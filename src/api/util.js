const BASE_URL = 'https://vpic.nhtsa.dot.gov/api/vehicles';

export const fetch = async (endpoint) => {
  return window.fetch(`${BASE_URL}/${endpoint}`).then((res) => res.json());
};
