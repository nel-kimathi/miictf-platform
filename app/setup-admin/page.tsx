"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setupAdminAccount, setupTestAccounts } from "./actions";

export default function SetupAdminPage() {
  const router = useRouter();
  const [secret, setSecret] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const handleSetupAdmin = async () => {
    const formData = new FormData();
    formData.set("secret", secret);
    const result = await setupAdminAccount(formData);
    setMessage(result.error ?? "Super admin created. You can now log in.");
    if (result.success) setDone(true);
  };

  const handleSetupTests = async () => {
    const formData = new FormData();
    formData.set("secret", secret);
    const result = await setupTestAccounts(formData);
    setMessage(result.error ?? result.results?.join("\n") ?? "Done");
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md rounded-lg border bg-card p-6 shadow-sm">
        <h1 className="font-heading text-2xl font-bold text-primary">Initial Admin Setup</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          This page is temporary. Use it once to create the test accounts on production.
        </p>

        {message ? (
          <div className="mt-4 whitespace-pre-line rounded-lg border bg-accent/10 p-3 text-sm text-accent-foreground">
            {message}
          </div>
        ) : null}

        <div className="mt-4 space-y-2">
          <Label htmlFor="secret">Setup Secret</Label>
          <Input
            id="secret"
            type="password"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            placeholder="Enter setup secret"
          />
        </div>

        <div className="mt-4 space-y-2">
          <Button onClick={handleSetupAdmin} className="w-full">
            Create Super Admin (superadmin@test.local)
          </Button>
          {done ? (
            <Button onClick={handleSetupTests} variant="outline" className="w-full">
              Create Remaining Test Accounts
            </Button>
          ) : null}
          <Button onClick={() => router.push("/login")} variant="ghost" className="w-full">
            Go to Login
          </Button>
        </div>
      </div>
    </div>
  );
}
