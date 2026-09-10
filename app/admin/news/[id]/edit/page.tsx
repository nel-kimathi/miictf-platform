import { notFound } from "next/navigation";
import { getNewsArticle, updateNewsArticle } from "../../actions";
import { NewsForm } from "../../news-form";

export default async function EditNewsArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = await getNewsArticle(id);
  if (!article) notFound();

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-heading text-3xl font-bold text-primary">Edit Article</h1>
        <p className="mt-1 text-muted-foreground">Update this news article.</p>
      </div>
      <NewsForm article={article} action={updateNewsArticle} />
    </div>
  );
}
