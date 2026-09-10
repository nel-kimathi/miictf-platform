import Link from "next/link";
import { getSession } from "@/lib/session";
import { getDashboardStats } from "@/lib/admin/dashboard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const SUMMARY_CARDS = [
  { label: "Total Delegates", key: "totalDelegates", href: "/admin/delegates" },
  { label: "Total Sponsors", key: "totalSponsors", href: "/admin/sponsors" },
  { label: "Total Exhibitors", key: "totalExhibitors", href: "/admin/exhibitors" },
  { label: "Pending Registrations", key: "pendingRegistrations", href: "/admin/users" },
  { label: "Approved Registrations", key: "approvedRegistrations", href: "/admin/users" },
  { label: "Rejected Registrations", key: "rejectedRegistrations", href: "/admin/users" },
] as const;

export default async function AdminPage() {
  const session = await getSession();
  const userName = session?.user?.name ?? "Admin";
  const userRole = (session?.user as { role?: string }).role ?? "ADMIN";
  const stats = await getDashboardStats();

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-primary">Dashboard</h1>
        <p className="mt-1 text-muted-foreground">
          Welcome back, {userName}. Role: {userRole}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SUMMARY_CARDS.map((card) => (
          <Link key={card.label} href={card.href}>
            <Card className="transition-colors hover:bg-accent/5">
              <CardHeader className="pb-2">
                <CardDescription>{card.label}</CardDescription>
                <CardTitle className="text-3xl">
                  {stats[card.key].toLocaleString("en-KE")}
                </CardTitle>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="font-heading text-xl">Latest Registrations</CardTitle>
            <CardDescription>Most recent user sign-ups</CardDescription>
          </CardHeader>
          <CardContent>
            {stats.latestRegistrations.length === 0 ? (
              <p className="text-sm text-muted-foreground">No registrations yet.</p>
            ) : (
              <ul className="space-y-3">
                {stats.latestRegistrations.map((user) => (
                  <li
                    key={user.id}
                    className="flex items-center justify-between rounded-lg border p-3"
                  >
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant="outline">{user.role}</Badge>
                      <Badge
                        variant={
                          user.registrationStatus === "APPROVED"
                            ? "default"
                            : user.registrationStatus === "REJECTED"
                              ? "destructive"
                              : "secondary"
                        }
                      >
                        {user.registrationStatus}
                      </Badge>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-heading text-xl">Recent News</CardTitle>
            <CardDescription>
              {stats.publishedNews} published of {stats.totalNews} total
            </CardDescription>
          </CardHeader>
          <CardContent>
            {stats.recentNews.length === 0 ? (
              <p className="text-sm text-muted-foreground">No news articles yet.</p>
            ) : (
              <ul className="space-y-3">
                {stats.recentNews.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center justify-between rounded-lg border p-3"
                  >
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.publishedAt
                          ? new Date(item.publishedAt).toLocaleDateString("en-KE", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })
                          : "Unpublished"}
                      </p>
                    </div>
                    <Badge
                      variant={
                        item.status === "PUBLISHED"
                          ? "default"
                          : item.status === "SCHEDULED"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {item.status}
                    </Badge>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
