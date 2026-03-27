export const USER_ENDPOINTS = {
  LIST: '/users',
  DETAIL: (id: string) => `/users/${id}`,
} as const
