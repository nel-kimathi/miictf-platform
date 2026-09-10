import { getSettings } from "./actions";
import { SettingsForm } from "./settings-form";

export default async function SettingsPage() {
  const settings = await getSettings();

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-heading text-3xl font-bold text-primary">Settings</h1>
        <p className="mt-1 text-muted-foreground">
          Manage site-wide configuration used across the public website.
        </p>
      </div>

      <div className="rounded-lg border bg-card p-6">
        <SettingsForm settings={settings} />
      </div>
    </div>
  );
}
