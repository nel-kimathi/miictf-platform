"use client";

import { useState } from "react";
import { Pencil, Trash2, Plus, UserCheck, UserX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { saveBooth, deleteBooth, assignExhibitor } from "./booth-actions";
import type { BoothStatus } from "@/lib/generated/prisma/client";

type Hall = { id: string; name: string };

type Exhibitor = {
  id: string;
  name: string;
  email: string;
  organization: string | null;
};

type Booth = {
  id: string;
  hallId: string;
  number: string;
  size: string | null;
  category: string | null;
  status: BoothStatus;
  price: string | null;
  notes: string | null;
  exhibitorId: string | null;
  hall: Hall;
  exhibitor: Exhibitor | null;
};

const STATUS_VARIANTS: Record<BoothStatus, "default" | "secondary" | "destructive" | "outline"> = {
  AVAILABLE: "default",
  RESERVED: "secondary",
  ALLOCATED: "default",
  OCCUPIED: "destructive",
};

export function BoothManager({
  halls,
  booths,
  exhibitors,
}: {
  halls: Hall[];
  booths: Booth[];
  exhibitors: Exhibitor[];
}) {
  const [message, setMessage] = useState<string | null>(null);
  const [editing, setEditing] = useState<Booth | null>(null);
  const [selectedHall, setSelectedHall] = useState<string>(halls[0]?.id ?? "all");

  const filteredBooths =
    selectedHall === "all" ? booths : booths.filter((b) => b.hallId === selectedHall);

  return (
    <>
      {message ? (
        <div className="mb-4 rounded-lg border bg-accent/10 p-3 text-sm text-accent-foreground">
          {message}
        </div>
      ) : null}

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Label htmlFor="hall-filter" className="whitespace-nowrap">
            Filter by hall:
          </Label>
          <Select value={selectedHall} onValueChange={(value) => setSelectedHall(value ?? "all")}>
            <SelectTrigger id="hall-filter" className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All halls</SelectItem>
              {halls.map((hall) => (
                <SelectItem key={hall.id} value={hall.id}>
                  {hall.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={() => setEditing({} as Booth)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Booth
        </Button>
      </div>

      {filteredBooths.length === 0 ? (
        <div className="rounded-lg border bg-card p-6 text-sm text-muted-foreground">
          No booths found. Add one to get started.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="px-4 py-3 font-medium">Hall</th>
                <th className="px-4 py-3 font-medium">Number</th>
                <th className="px-4 py-3 font-medium">Size</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Price</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Exhibitor</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredBooths.map((booth) => (
                <tr key={booth.id} className="hover:bg-muted/50">
                  <td className="px-4 py-3">{booth.hall.name}</td>
                  <td className="px-4 py-3 font-medium">{booth.number}</td>
                  <td className="px-4 py-3">{booth.size || "—"}</td>
                  <td className="px-4 py-3">{booth.category || "—"}</td>
                  <td className="px-4 py-3">
                    {booth.price ? `KES ${Number(booth.price).toLocaleString("en-KE")}` : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={STATUS_VARIANTS[booth.status]}>{booth.status}</Badge>
                  </td>
                  <td className="px-4 py-3">
                    {booth.exhibitor ? (
                      <div>
                        <p className="font-medium">{booth.exhibitor.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {booth.exhibitor.organization || booth.exhibitor.email}
                        </p>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost" onClick={() => setEditing(booth)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <form
                        action={async (formData) => {
                          const result = await deleteBooth(formData);
                          setMessage(result.error ?? "Booth deleted");
                          setTimeout(() => setMessage(null), 3000);
                        }}
                      >
                        <input type="hidden" name="id" value={booth.id} />
                        <Button type="submit" size="sm" variant="ghost" className="text-destructive">
                          <Trash2 className="h-4 w-4" />
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

      {editing ? (
        <BoothForm
          halls={halls}
          booth={editing.id ? editing : null}
          onDone={() => setEditing(null)}
          onMessage={setMessage}
        />
      ) : null}

      {editing?.id ? (
        <AssignExhibitor
          booth={editing}
          exhibitors={exhibitors}
          onMessage={setMessage}
          onDone={() => setEditing(null)}
        />
      ) : null}
    </>
  );
}

function BoothForm({
  halls,
  booth,
  onDone,
  onMessage,
}: {
  halls: Hall[];
  booth: Booth | null;
  onDone: () => void;
  onMessage: (msg: string) => void;
}) {
  return (
    <form
      action={async (formData) => {
        const result = await saveBooth(null, formData);
        onMessage(result.error ?? (booth ? "Booth updated" : "Booth created"));
        onDone();
        setTimeout(() => onMessage(""), 3000);
      }}
      className="mt-6 rounded-lg border bg-card p-6"
    >
      <h3 className="mb-4 font-heading text-lg font-semibold">
        {booth ? "Edit Booth" : "Add Booth"}
      </h3>
      {booth ? <input type="hidden" name="id" value={booth.id} /> : null}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-2">
          <Label htmlFor="booth-hall">Hall</Label>
          <Select name="hallId" defaultValue={booth?.hallId ?? halls[0]?.id}>
            <SelectTrigger id="booth-hall">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {halls.map((hall) => (
                <SelectItem key={hall.id} value={hall.id}>
                  {hall.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="booth-number">Number</Label>
          <Input
            id="booth-number"
            name="number"
            defaultValue={booth?.number ?? ""}
            placeholder="e.g. A12"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="booth-size">Size</Label>
          <Input
            id="booth-size"
            name="size"
            defaultValue={booth?.size ?? ""}
            placeholder="e.g. 3x3"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="booth-category">Category</Label>
          <Input
            id="booth-category"
            name="category"
            defaultValue={booth?.category ?? ""}
            placeholder="e.g. Standard"
          />
        </div>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="booth-status">Status</Label>
          <Select name="status" defaultValue={booth?.status ?? "AVAILABLE"}>
            <SelectTrigger id="booth-status">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="AVAILABLE">Available</SelectItem>
              <SelectItem value="RESERVED">Reserved</SelectItem>
              <SelectItem value="ALLOCATED">Allocated</SelectItem>
              <SelectItem value="OCCUPIED">Occupied</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="booth-price">Price (KES)</Label>
          <Input
            id="booth-price"
            name="price"
            type="number"
            min={0}
            step={0.01}
            defaultValue={booth?.price ?? ""}
          />
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <Label htmlFor="booth-notes">Notes</Label>
        <Textarea
          id="booth-notes"
          name="notes"
          defaultValue={booth?.notes ?? ""}
          placeholder="Optional notes"
        />
      </div>

      <div className="mt-4 flex gap-2">
        <Button type="submit">{booth ? "Update Booth" : "Add Booth"}</Button>
        <Button type="button" variant="outline" onClick={onDone}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

function AssignExhibitor({
  booth,
  exhibitors,
  onMessage,
  onDone,
}: {
  booth: Booth;
  exhibitors: Exhibitor[];
  onMessage: (msg: string) => void;
  onDone: () => void;
}) {
  return (
    <form
      action={async (formData) => {
        const result = await assignExhibitor(null, formData);
        onMessage(result.error ?? "Exhibitor assignment updated");
        onDone();
        setTimeout(() => onMessage(""), 3000);
      }}
      className="mt-6 rounded-lg border bg-card p-6"
    >
      <h3 className="mb-4 font-heading text-lg font-semibold">Assign Exhibitor</h3>
      <input type="hidden" name="boothId" value={booth.id} />

      <div className="flex gap-3">
        <Select name="exhibitorId" defaultValue={booth.exhibitorId ?? "none"}>
          <SelectTrigger className="w-80">
            <SelectValue placeholder="Select an exhibitor" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">No exhibitor</SelectItem>
            {exhibitors.map((exhibitor) => (
              <SelectItem key={exhibitor.id} value={exhibitor.id}>
                {exhibitor.name} ({exhibitor.organization || exhibitor.email})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button type="submit">
          <UserCheck className="mr-2 h-4 w-4" />
          Assign
        </Button>
        {booth.exhibitorId ? (
          <Button
            type="button"
            variant="outline"
            onClick={async () => {
              const formData = new FormData();
              formData.set("boothId", booth.id);
              const result = await assignExhibitor(null, formData);
              onMessage(result.error ?? "Exhibitor removed");
              onDone();
              setTimeout(() => onMessage(""), 3000);
            }}
          >
            <UserX className="mr-2 h-4 w-4" />
            Remove
          </Button>
        ) : null}
      </div>
    </form>
  );
}
