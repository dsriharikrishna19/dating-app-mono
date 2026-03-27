import { AUTH_ENDPOINTS } from './endpoints/authEndpoints'
import { USER_ENDPOINTS } from './endpoints/userEndpoints'
import { DASHBOARD_ENDPOINTS } from './endpoints/dashboardEndpoints'

export const ENDPOINTS = {
  AUTH: AUTH_ENDPOINTS,
  USERS: USER_ENDPOINTS,
  DASHBOARD: DASHBOARD_ENDPOINTS,
} as const
