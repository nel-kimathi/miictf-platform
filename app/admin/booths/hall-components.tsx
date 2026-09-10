"use client";

import { useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { saveHall, deleteHall } from "./hall-actions";

type Hall = {
  id: string;
  name: string;
  description: string | null;
  order: number;
  _count: { booths: number };
};

export function HallList({ halls }: { halls: Hall[] }) {
  const [editing, setEditing] = useState<Hall | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  return (
    <>
      {message ? (
        <div className="mb-4 rounded-lg border bg-accent/10 p-3 text-sm text-accent-foreground">
          {message}
        </div>
      ) : null}

      <div className="rounded-lg border">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Description</th>
              <th className="px-4 py-3 font-medium">Order</th>
              <th className="px-4 py-3 font-medium">Booths</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {halls.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-muted-foreground">
                  No halls yet. Add one to get started.
                </td>
              </tr>
            ) : (
              halls.map((hall) => (
                <tr key={hall.id} className="hover:bg-muted/50">
                  <td className="px-4 py-3 font-medium">{hall.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{hall.description || "—"}</td>
                  <td className="px-4 py-3">{hall.order}</td>
                  <td className="px-4 py-3">{hall._count.booths}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost" onClick={() => setEditing(hall)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <form
                        action={async (formData) => {
                          const result = await deleteHall(formData);
                          setMessage(result.error ?? "Hall deleted");
                          setTimeout(() => setMessage(null), 3000);
                        }}
                      >
                        <input type="hidden" name="id" value={hall.id} />
                        <Button type="submit" size="sm" variant="ghost" className="text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <HallForm editing={editing} onDone={() => setEditing(null)} onMessage={setMessage} />
    </>
  );
}

function HallForm({
  editing,
  onDone,
  onMessage,
}: {
  editing: Hall | null;
  onDone: () => void;
  onMessage: (msg: string) => void;
}) {
  return (
    <form
      action={async (formData) => {
        const result = await saveHall(null, formData);
        onMessage(result.error ?? (editing ? "Hall updated" : "Hall created"));
        onDone();
        setTimeout(() => onMessage(""), 3000);
      }}
      className="mt-6 rounded-lg border bg-card p-6"
    >
      <h3 className="mb-4 font-heading text-lg font-semibold">
        {editing ? "Edit Hall" : "Add Hall"}
      </h3>
      {editing ? <input type="hidden" name="id" value={editing.id} /> : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="hall-name">Name</Label>
          <Input
            id="hall-name"
            name="name"
            defaultValue={editing?.name ?? ""}
            placeholder="e.g. Hall A"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="hall-order">Display Order</Label>
          <Input
            id="hall-order"
            name="order"
            type="number"
            defaultValue={editing?.order ?? 0}
          />
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <Label htmlFor="hall-description">Description</Label>
        <Textarea
          id="hall-description"
          name="description"
          defaultValue={editing?.description ?? ""}
          placeholder="Optional description"
        />
      </div>

      <div className="mt-4 flex gap-2">
        <Button type="submit">
          <Plus className="mr-2 h-4 w-4" />
          {editing ? "Update Hall" : "Add Hall"}
        </Button>
        {editing ? (
          <Button type="button" variant="outline" onClick={onDone}>
            Cancel
          </Button>
        ) : null}
      </div>
    </form>
  );
}
