export type AppRole =
  | "SUPER_ADMIN"
  | "ADMIN"
  | "DELEGATE"
  | "SPONSOR"
  | "EXHIBITOR";

/** Maps a user role to its dashboard path. */
export function dashboardPathForRole(role?: string | null): string {
  switch (role) {
    case "SUPER_ADMIN":
    case "ADMIN":
      return "/admin";
    case "SPONSOR":
      return "/sponsor";
    case "EXHIBITOR":
      return "/exhibitor";
    default:
      return "/delegate";
  }
}

/** Paths served by the (dashboard)/[role] route group. */
export const ROLE_DASHBOARD_PATHS = ["/delegate", "/sponsor", "/exhibitor"];