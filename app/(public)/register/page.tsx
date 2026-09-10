import type { Metadata } from "next";
import { RegisterForm } from "@/components/auth/register-form";

export const metadata: Metadata = { title: "Register" };

export default function RegisterPage() {
  return (
    <section className="mx-auto max-w-xl px-4 pb-12 pt-28">
      <h1 className="font-heading text-center text-3xl font-bold text-primary">Register</h1>
      <p className="mt-2 text-center text-sm text-muted-foreground">
        Create your MIICCOF account as a delegate, sponsor or exhibitor.
      </p>
      <div className="mt-8">
        <RegisterForm />
      </div>
    </section>
  );
}