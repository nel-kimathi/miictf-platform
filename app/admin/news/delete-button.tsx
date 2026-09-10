"use client";

import { useState } from "react";
import { deleteNewsArticle } from "./actions";
import { Button } from "@/components/ui/button";

export function DeleteNewsButton({ id }: { id: string }) {
  const [status, setStatus] = useState<string | null>(null);

  return (
    <form
      action={async (formData) => {
        if (!confirm("Delete this article?")) return;
        const result = await deleteNewsArticle(formData);
        setStatus(result.error ?? null);
        setTimeout(() => setStatus(null), 3000);
      }}
    >
      <input type="hidden" name="id" value={id} />
      <Button type="submit" size="sm" variant="ghost" className="text-destructive">
        Delete
      </Button>
      {status ? <span className="ml-2 text-xs text-destructive">{status}</span> : null}
    </form>
  );
}
