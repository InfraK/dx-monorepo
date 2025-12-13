import createFetchClient from 'openapi-fetch';
import createReactQueryClient from 'openapi-react-query';
import type { paths } from './types';

const fetchClient = createFetchClient<paths>({
  baseUrl: import.meta.env.VITE_API_BASE_URL || '/api',
});

export const $api = createReactQueryClient(fetchClient);
