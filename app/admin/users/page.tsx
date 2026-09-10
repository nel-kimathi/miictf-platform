import { getUsers } from "./actions";
import { UserTable } from "./user-table";
import { UserSearch } from "./user-search";

export default async function UsersPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const users = await getUsers(q);

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-heading text-3xl font-bold text-primary">User Management</h1>
        <p className="mt-1 text-muted-foreground">
          List, search, edit roles and registration status, or remove users.
        </p>
      </div>

      <UserSearch initialQuery={q} />

      <div className="mt-4">
        <UserTable users={users} />
      </div>
    </div>
  );
}
