"use client";

import { useActionState } from "react";
import { subscribeNewsletter } from "@/app/(public)/actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function NewsletterForm() {
  const [state, formAction, pending] = useActionState(subscribeNewsletter, {
    ok: false,
    message: "",
  });

  return (
    <form action={formAction} className="flex w-full max-w-sm gap-2">
      <Input
        type="email"
        name="email"
        required
        placeholder="Your email address"
        aria-label="Email address"
      />
      <Button type="submit" variant="secondary" disabled={pending}>
        {pending ? "Subscribing..." : "Subscribe"}
      </Button>
      {state.message ? (
        <p
          className={`mt-1 text-xs ${
            state.ok ? "text-green-600" : "text-destructive"
          }`}
        >
          {state.message}
        </p>
      ) : null}
    </form>
  );
}