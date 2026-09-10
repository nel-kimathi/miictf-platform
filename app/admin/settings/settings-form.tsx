"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateSettings } from "./actions";

const SETTING_FIELDS = [
  { key: "siteName", label: "Site Name", placeholder: "MIICCOF" },
  { key: "siteTagline", label: "Site Tagline", placeholder: "Meru International Investment Conference & Consumer Fair" },
  { key: "contactEmail", label: "Contact Email", placeholder: "secretariat@example.com", type: "email" },
  { key: "supportPhone", label: "Support Phone", placeholder: "+254 ..." },
  { key: "eventStartDate", label: "Event Start Date", type: "date" },
  { key: "eventEndDate", label: "Event End Date", type: "date" },
  { key: "eventLocation", label: "Event Location", placeholder: "Meru, Kenya" },
  { key: "socialFacebook", label: "Facebook URL", placeholder: "https://facebook.com/..." },
  { key: "socialTwitter", label: "Twitter/X URL", placeholder: "https://x.com/..." },
  { key: "socialLinkedIn", label: "LinkedIn URL", placeholder: "https://linkedin.com/..." },
];

export function SettingsForm({ settings }: { settings: Record<string, string> }) {
  const [message, setMessage] = useState<string | null>(null);

  return (
    <form
      action={async (formData) => {
        const result = await updateSettings(formData);
        setMessage(result.error ?? "Settings saved");
        setTimeout(() => setMessage(null), 3000);
      }}
      className="space-y-6"
    >
      {message ? (
        <div className="rounded-lg border bg-accent/10 p-3 text-sm text-accent-foreground">
          {message}
        </div>
      ) : null}

      <div className="grid gap-6 md:grid-cols-2">
        {SETTING_FIELDS.map((field) => (
          <div key={field.key} className="space-y-2">
            <Label htmlFor={field.key}>{field.label}</Label>
            <Input
              id={field.key}
              name={field.key}
              type={field.type ?? "text"}
              defaultValue={settings[field.key] ?? ""}
              placeholder={field.placeholder}
            />
          </div>
        ))}
      </div>

      <Button type="submit">Save Settings</Button>
    </form>
  );
}
