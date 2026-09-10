import Link from "next/link";
import { Plus } from "lucide-react";
import { getNewsArticles } from "./actions";
import { DeleteNewsButton } from "./delete-button";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default async function NewsAdminPage() {
  const articles = await getNewsArticles();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold text-primary">News Management</h1>
          <p className="mt-1 text-muted-foreground">Create, edit, publish and delete news articles.</p>
        </div>
        <Button render={<Link href="/admin/news/new" />}>
          <Plus className="mr-2 h-4 w-4" />
          New Article
        </Button>
      </div>

      {articles.length === 0 ? (
        <div className="rounded-lg border bg-card p-6 text-sm text-muted-foreground">
          No news articles yet.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="px-4 py-3 font-medium">Title</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Published</th>
                <th className="px-4 py-3 font-medium">Updated</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {articles.map((article) => (
                <tr key={article.id} className="hover:bg-muted/50">
                  <td className="px-4 py-3">
                    <p className="font-medium">{article.title}</p>
                    <p className="text-xs text-muted-foreground">/{article.slug}</p>
                  </td>
                  <td className="px-4 py-3">{article.category || "—"}</td>
                  <td className="px-4 py-3">
                    <Badge
                      variant={
                        article.status === "PUBLISHED"
                          ? "default"
                          : article.status === "SCHEDULED"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {article.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {article.publishedAt
                      ? new Date(article.publishedAt).toLocaleDateString("en-KE", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })
                      : "—"}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {new Date(article.updatedAt).toLocaleDateString("en-KE", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="ghost" render={<Link href={`/admin/news/${article.id}/edit`} />}>
                        Edit
                      </Button>
                      <DeleteNewsButton id={article.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
