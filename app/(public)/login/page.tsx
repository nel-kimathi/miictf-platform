import type { Metadata } from "next";
import { Suspense } from "react";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = { title: "Login" };

export default function LoginPage() {
  return (
    <section className="mx-auto max-w-md px-4 pb-12 pt-28">
      <h1 className="font-heading text-center text-3xl font-bold text-primary">Login</h1>
      <p className="mt-2 text-center text-sm text-muted-foreground">
        Sign in to your MAIICTF account.
      </p>
      <div className="mt-8">
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </section>
  );
}