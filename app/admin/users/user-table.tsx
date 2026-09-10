"use client";

import { useState } from "react";
import { updateUser, deleteUser } from "./actions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2 } from "lucide-react";

type User = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  organization: string | null;
  country: string | null;
  role: string;
  category: string;
  registrationStatus: string;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
};

const ROLES = ["SUPER_ADMIN", "ADMIN", "DELEGATE", "SPONSOR", "EXHIBITOR"] as const;
const STATUSES = ["PENDING", "APPROVED", "REJECTED"] as const;

export function UserTable({ users }: { users: User[] }) {
  const [message, setMessage] = useState<string | null>(null);

  if (users.length === 0) {
    return (
      <div className="rounded-lg border bg-card p-6 text-sm text-muted-foreground">
        No users found.
      </div>
    );
  }

  return (
    <>
      {message ? (
        <div className="mb-4 rounded-lg border bg-accent/10 p-3 text-sm text-accent-foreground">
          {message}
        </div>
      ) : null}
      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Role</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Verified</th>
              <th className="px-4 py-3 font-medium">Joined</th>
              <th className="w-24 px-4 py-3 font-medium" />
            </tr>
          </thead>
          <tbody className="divide-y">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-muted/50">
                <td className="px-4 py-3">
                  <div>
                    <p className="font-medium">{user.name}</p>
                    {user.organization ? (
                      <p className="text-xs text-muted-foreground">{user.organization}</p>
                    ) : null}
                  </div>
                </td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3">
                  <form
                    action={async (formData) => {
                      const result = await updateUser(formData);
                      setMessage(result.error ?? "User updated");
                      setTimeout(() => setMessage(null), 3000);
                    }}
                    className="flex items-center gap-2"
                  >
                    <input type="hidden" name="id" value={user.id} />
                    <input type="hidden" name="registrationStatus" value={user.registrationStatus} />
                    <Select name="role" defaultValue={user.role}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {ROLES.map((role) => (
                          <SelectItem key={role} value={role}>
                            {role}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button type="submit" size="sm" variant="ghost">
                      Save
                    </Button>
                  </form>
                </td>
                <td className="px-4 py-3">
                  <form
                    action={async (formData) => {
                      const result = await updateUser(formData);
                      setMessage(result.error ?? "User updated");
                      setTimeout(() => setMessage(null), 3000);
                    }}
                    className="flex items-center gap-2"
                  >
                    <input type="hidden" name="id" value={user.id} />
                    <input type="hidden" name="role" value={user.role} />
                    <Select name="registrationStatus" defaultValue={user.registrationStatus}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {STATUSES.map((status) => (
                          <SelectItem key={status} value={status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button type="submit" size="sm" variant="ghost">
                      Save
                    </Button>
                  </form>
                </td>
                <td className="px-4 py-3">
                  <Badge variant={user.emailVerified ? "default" : "secondary"}>
                    {user.emailVerified ? "Yes" : "No"}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {new Date(user.createdAt).toLocaleDateString("en-KE", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </td>
                <td className="px-4 py-3">
                  <form
                    action={async (formData) => {
                      if (!confirm("Are you sure you want to delete this user?")) return;
                      const result = await deleteUser(formData);
                      setMessage(result.error ?? "User deleted");
                      setTimeout(() => setMessage(null), 3000);
                    }}
                  >
                    <input type="hidden" name="id" value={user.id} />
                    <Button type="submit" size="icon" variant="ghost" className="text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
