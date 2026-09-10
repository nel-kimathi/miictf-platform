"use client";

import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type NewsArticle = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  coverImage: string | null;
  category: string | null;
  status: "DRAFT" | "SCHEDULED" | "PUBLISHED";
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

export function NewsForm({
  article,
  action,
}: {
  article?: NewsArticle | null;
  action: (prevState: unknown, formData: FormData) => Promise<{ error?: string }>;
}) {
  const [state, formAction] = useActionState(action, null);

  return (
    <form action={formAction} className="max-w-2xl space-y-5">
      {state?.error ? (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
          {state.error}
        </div>
      ) : null}

      {article ? <input type="hidden" name="id" value={article.id} /> : null}

      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          defaultValue={article?.title}
          placeholder="Article title"
          required
          minLength={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Input
          id="category"
          name="category"
          defaultValue={article?.category ?? ""}
          placeholder="e.g. Announcement, Sponsorship"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="excerpt">Excerpt</Label>
        <Textarea
          id="excerpt"
          name="excerpt"
          defaultValue={article?.excerpt ?? ""}
          placeholder="Short summary shown on the news list page"
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          name="content"
          defaultValue={article?.content}
          placeholder="Full article content"
          rows={10}
          required
          minLength={10}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="coverImage">Cover Image URL</Label>
        <Input
          id="coverImage"
          name="coverImage"
          type="url"
          defaultValue={article?.coverImage ?? ""}
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select name="status" defaultValue={article?.status ?? "DRAFT"}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="DRAFT">Draft</SelectItem>
              <SelectItem value="SCHEDULED">Scheduled</SelectItem>
              <SelectItem value="PUBLISHED">Published</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="publishedAt">Publish Date &amp; Time</Label>
          <Input
            id="publishedAt"
            name="publishedAt"
            type="datetime-local"
            defaultValue={
              article?.publishedAt
                ? new Date(article.publishedAt).toISOString().slice(0, 16)
                : ""
            }
          />
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <Button type="submit">{article ? "Update Article" : "Create Article"}</Button>
        <Button type="button" variant="outline" render={<a href="/admin/news">Cancel</a>} />
      </div>
    </form>
  );
}
