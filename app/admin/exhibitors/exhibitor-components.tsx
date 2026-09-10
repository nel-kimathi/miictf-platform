"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Download, CheckCircle, XCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { updateExhibitorStatus, exportExhibitorsCsv } from "./actions";

type Exhibitor = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  organization: string | null;
  country: string | null;
  category: string;
  registrationStatus: string;
  emailVerified: boolean;
  createdAt: Date;
};

function StatusBadge({ status }: { status: string }) {
  const variant =
    status === "APPROVED" ? "default" : status === "REJECTED" ? "destructive" : "secondary";
  return <Badge variant={variant}>{status}</Badge>;
}

export function ExhibitorSearch({ initialQuery }: { initialQuery?: string }) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery ?? "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const url = query.trim()
      ? `/admin/exhibitors?q=${encodeURIComponent(query.trim())}`
      : "/admin/exhibitors";
    router.push(url);
  };

  return (
    <form onSubmit={handleSubmit} className="flex max-w-md gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search exhibitors..."
          className="pl-9"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <Button type="submit">Search</Button>
    </form>
  );
}

export function ExhibitorTable({ exhibitors }: { exhibitors: Exhibitor[] }) {
  const [message, setMessage] = useState<string | null>(null);

  const handleExport = async () => {
    const csv = await exportExhibitorsCsv();
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `exhibitors-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      {message ? (
        <div className="mb-4 rounded-lg border bg-accent/10 p-3 text-sm text-accent-foreground">
          {message}
        </div>
      ) : null}

      <div className="mb-4 flex justify-end">
        <Button variant="outline" onClick={handleExport}>
          <Download className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
      </div>

      {exhibitors.length === 0 ? (
        <div className="rounded-lg border bg-card p-6 text-sm text-muted-foreground">
          No exhibitors found.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Company</th>
                <th className="px-4 py-3 font-medium">Industry</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Registered</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {exhibitors.map((exhibitor) => (
                <tr key={exhibitor.id} className="hover:bg-muted/50">
                  <td className="px-4 py-3">
                    <p className="font-medium">{exhibitor.name}</p>
                    <p className="text-xs text-muted-foreground">{exhibitor.phone || "No phone"}</p>
                  </td>
                  <td className="px-4 py-3">{exhibitor.email}</td>
                  <td className="px-4 py-3">{exhibitor.organization || "—"}</td>
                  <td className="px-4 py-3">{exhibitor.category}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={exhibitor.registrationStatus} />
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {new Date(exhibitor.createdAt).toLocaleDateString("en-KE", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <form
                        action={async (formData) => {
                          const result = await updateExhibitorStatus(null, formData);
                          setMessage(result.error ?? "Exhibitor approved");
                          setTimeout(() => setMessage(null), 3000);
                        }}
                      >
                        <input type="hidden" name="id" value={exhibitor.id} />
                        <input type="hidden" name="registrationStatus" value="APPROVED" />
                        <Button
                          type="submit"
                          size="sm"
                          variant="ghost"
                          disabled={exhibitor.registrationStatus === "APPROVED"}
                          className="text-green-600"
                        >
                          <CheckCircle className="mr-1 h-4 w-4" />
                          Approve
                        </Button>
                      </form>
                      <form
                        action={async (formData) => {
                          const result = await updateExhibitorStatus(null, formData);
                          setMessage(result.error ?? "Exhibitor rejected");
                          setTimeout(() => setMessage(null), 3000);
                        }}
                      >
                        <input type="hidden" name="id" value={exhibitor.id} />
                        <input type="hidden" name="registrationStatus" value="REJECTED" />
                        <Button
                          type="submit"
                          size="sm"
                          variant="ghost"
                          disabled={exhibitor.registrationStatus === "REJECTED"}
                          className="text-destructive"
                        >
                          <XCircle className="mr-1 h-4 w-4" />
                          Reject
                        </Button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
