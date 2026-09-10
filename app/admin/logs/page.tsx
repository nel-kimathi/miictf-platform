import { getSystemLogs } from "@/lib/admin/system-log";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function LogsPage() {
  const logs = await getSystemLogs(200);

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-heading text-3xl font-bold text-primary">System Logs</h1>
        <p className="mt-1 text-muted-foreground">
          Audit log of admin actions — who did what, when.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-heading text-xl">Recent Activity</CardTitle>
          <CardDescription>Last {logs.length} recorded actions</CardDescription>
        </CardHeader>
        <CardContent>
          {logs.length === 0 ? (
            <p className="text-sm text-muted-foreground">No activity logged yet.</p>
          ) : (
            <div className="overflow-x-auto rounded-lg border">
              <table className="w-full text-left text-sm">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-4 py-3 font-medium">Time</th>
                    <th className="px-4 py-3 font-medium">User</th>
                    <th className="px-4 py-3 font-medium">Action</th>
                    <th className="px-4 py-3 font-medium">Entity</th>
                    <th className="px-4 py-3 font-medium">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {logs.map((log) => (
                    <tr key={log.id} className="hover:bg-muted/50">
                      <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">
                        {new Date(log.createdAt).toLocaleString("en-KE", {
                          dateStyle: "short",
                          timeStyle: "short",
                        })}
                      </td>
                      <td className="px-4 py-3">
                        {log.user ? (
                          <div>
                            <p className="font-medium">{log.user.name}</p>
                            <p className="text-xs text-muted-foreground">{log.user.role}</p>
                          </div>
                        ) : (
                          <span className="text-muted-foreground">System</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant="outline">{log.action}</Badge>
                      </td>
                      <td className="px-4 py-3">
                        <span className="font-medium">{log.entityType}</span>
                        {log.entityId ? (
                          <p className="max-w-[120px] truncate text-xs text-muted-foreground">
                            {log.entityId}
                          </p>
                        ) : null}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {log.details ? (
                          <pre className="max-w-xs overflow-x-auto text-xs">
                            {JSON.stringify(log.details, null, 2)}
                          </pre>
                        ) : (
                          "—"
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
