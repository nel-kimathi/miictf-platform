import { prisma } from "@/lib/db";

export type LogAction =
  | "CREATE"
  | "UPDATE"
  | "DELETE"
  | "APPROVE"
  | "REJECT"
  | "ASSIGN"
  | "UNASSIGN"
  | "PUBLISH"
  | "LOGIN"
  | "LOGOUT";

export type LogEntityType =
  | "USER"
  | "DELEGATE"
  | "SPONSOR"
  | "EXHIBITOR"
  | "BOOTH"
  | "HALL"
  | "NEWS"
  | "SYSTEM";

export async function logAdminAction({
  userId,
  action,
  entityType,
  entityId,
  details,
}: {
  userId?: string;
  action: LogAction;
  entityType: LogEntityType;
  entityId?: string;
  details?: Record<string, unknown>;
}) {
  try {
    await prisma.systemLog.create({
      data: {
        userId,
        action,
        entityType,
        entityId,
        details: details as object,
      },
    });
  } catch {
    // Never fail the user-facing action because logging failed.
    // In production you might want to send this to a separate error tracker.
  }
}

export async function getSystemLogs(limit = 100) {
  return prisma.systemLog.findMany({
    take: limit,
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: { id: true, name: true, email: true, role: true } },
    },
  });
}
