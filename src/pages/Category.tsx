import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CATEGORIES, Category } from '@/data/quizzes';

type Props = {
  slug: Category['slug'];
};

export default function CategoryPage({ slug }: Props) {
  const category = CATEGORIES.find((c) => c.slug === slug)!;

  return (
    <main className="container py-10">
      <Helmet>
        <title>{category.title} | React JS Quiz Clone</title>
        <meta name="description" content={`${category.title} listesi ve test başlıkları`} />
        <link rel="canonical" href={`/${slug}`} />
      </Helmet>
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">{category.title}</h1>
        <p className="text-muted-foreground mt-2">Test başlıklarını seç ve 5 dakikalık sınavı başlat.</p>
      </header>

      <section className="grid gap-6 md:grid-cols-2">
        {category.quizzes.map((q) => (
          <Card key={q.slug} className="hover:shadow-elevate transition-shadow">
            <CardHeader>
              <CardTitle className="text-xl">{q.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground">{q.description}</p>
              <Button asChild variant="hero">
                <Link to={`/quiz/${q.slug}`}>Teste Başla</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  );
}
