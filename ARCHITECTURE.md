# Project Intelligence: .NET + React Auth Template

## Architecture Overview
- **Pattern:** Minimal API + React Functional Components.
- **Auth Strategy:** HttpOnly Cookies (Opaque Bearer via .NET Identity).
- **Communication:** Axios with `withCredentials: true`.

## Critical Constraints (DO NOT DEVIATE)
1. **No LocalStorage for Tokens:** All authentication must rely on the `.AspNetCore.Identity.Application` cookie.
2. **CORS Integrity:** The Backend `AddCors` must explicitly list the frontend origin and use `.AllowCredentials()`.
3. **Identity Config:** Use `AddIdentityApiEndpoints` and `AddIdentityCookies`. Do not implement manual JWT signing unless requested.
4. **State Management:** Use TanStack Query for the `/api/me` session check.

## Directory Structure
- `/backend`: .NET 8/9 Minimal API project.
- `/frontend`: React 19 + Vite + Tailwind project.
- `/shared`: (Optional) Contract definitions for DTOs.

## Agent Workflow
- **When adding a feature:** Always check the `User` context from `AuthContext.tsx` before building UI.
- **When modifying APIs:** Ensure the `.RequireAuthorization()` attribute is added to protected routes.
- **Testing:** Use the Antigravity Browser Agent to verify that `401 Unauthorized` redirects to `/login`.