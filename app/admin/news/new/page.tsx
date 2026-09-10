import { createNewsArticle } from "../actions";
import { NewsForm } from "../news-form";

export default function NewNewsArticlePage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="font-heading text-3xl font-bold text-primary">New Article</h1>
        <p className="mt-1 text-muted-foreground">Create a new news article.</p>
      </div>
      <NewsForm action={createNewsArticle} />
    </div>
  );
}
