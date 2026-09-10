import { getReportData, exportReportCsv } from "./actions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default async function ReportsPage() {
  const { users, roleCounts, statusCounts, countryCounts, categoryCounts } = await getReportData();

  const totalUsers = users.length;
  const delegates = roleCounts.find((r) => r.role === "DELEGATE")?._count.role ?? 0;
  const sponsors = roleCounts.find((r) => r.role === "SPONSOR")?._count.role ?? 0;
  const exhibitors = roleCounts.find((r) => r.role === "EXHIBITOR")?._count.role ?? 0;
  const pending = statusCounts.find((s) => s.registrationStatus === "PENDING")?._count.registrationStatus ?? 0;
  const approved = statusCounts.find((s) => s.registrationStatus === "APPROVED")?._count.registrationStatus ?? 0;

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-heading text-3xl font-bold text-primary">Reports</h1>
        <p className="mt-1 text-muted-foreground">
          Registration statistics, breakdowns and exports.
        </p>
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Registrations</CardDescription>
            <CardTitle className="text-3xl">{totalUsers}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Pending</CardDescription>
            <CardTitle className="text-3xl">{pending}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Approved</CardDescription>
            <CardTitle className="text-3xl">{approved}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Delegates / Sponsors / Exhibitors</CardDescription>
            <CardTitle className="text-2xl">
              {delegates} / {sponsors} / {exhibitors}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="font-heading text-xl">Countries Represented</CardTitle>
            <CardDescription>Top countries by registration</CardDescription>
          </CardHeader>
          <CardContent>
            {countryCounts.length === 0 ? (
              <p className="text-sm text-muted-foreground">No country data.</p>
            ) : (
              <ul className="space-y-2">
                {countryCounts.slice(0, 10).map((c) => (
                  <li key={c.country ?? "unknown"} className="flex items-center justify-between rounded-lg border p-3">
                    <span className="font-medium">{c.country || "Unspecified"}</span>
                    <Badge variant="secondary">{c._count.country}</Badge>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-heading text-xl">Categories</CardTitle>
            <CardDescription>Registration by category</CardDescription>
          </CardHeader>
          <CardContent>
            {categoryCounts.length === 0 ? (
              <p className="text-sm text-muted-foreground">No category data.</p>
            ) : (
              <ul className="space-y-2">
                {categoryCounts.map((c) => (
                  <li key={c.category} className="flex items-center justify-between rounded-lg border p-3">
                    <span className="font-medium">{c.category}</span>
                    <Badge variant="secondary">{c._count.category}</Badge>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="font-heading text-xl">Export Data</CardTitle>
          <CardDescription>Download report CSVs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <ExportButton label="All Users" name="users" filename="users-report" />
            <ExportButton label="Countries" name="countries" filename="countries-report" />
            <ExportButton label="Categories" name="categories" filename="categories-report" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ExportButton({
  label,
  name,
  filename,
}: {
  label: string;
  name: "users" | "countries" | "categories";
  filename: string;
}) {
  return (
    <form
      action={async () => {
        "use server";
        const csv = await exportReportCsv(name);
        const blob = new Blob([csv], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${filename}-${new Date().toISOString().split("T")[0]}.csv`;
        a.click();
        URL.revokeObjectURL(url);
      }}
    >
      <Button type="submit" variant="outline">
        <Download className="mr-2 h-4 w-4" />
        {label}
      </Button>
    </form>
  );
}
