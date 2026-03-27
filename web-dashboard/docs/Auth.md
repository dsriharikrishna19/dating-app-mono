# Auth Feature

Handles user authentication using Redux Toolkit and React Query.

## Structure

- `schema.ts`: Zod validation schemas.
- `api/`: API integration functions.
- `store/`: RTK slice for auth state.
- `hooks/`: Custom hooks for login/logout and session access.
- `forms/`: RHF form implementations.

## Global State

The auth state is stored in Redux:
- `user`: Currently logged-in user object.
- `isAuthenticated`: Boolean flag for authentication status.

## Usage

```tsx
const { login, logout, user, isAuthenticated } = useAuth()
```
