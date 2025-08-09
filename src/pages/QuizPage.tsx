import { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { findQuizBySlug, BASE_QUESTIONS, Question } from '@/data/quizzes';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/hooks/use-toast';

const DURATION_SECONDS = 5 * 60; // 5 dakika

type AnswerMap = Record<string, number | undefined>;

type ScoreRow = {
  quiz: string;
  date: string;
  score: number;
  total: number;
  timeSpent: number; // seconds
};

function saveScore(row: ScoreRow) {
  const key = `scores:${row.quiz}`;
  const list: ScoreRow[] = JSON.parse(localStorage.getItem(key) || '[]');
  list.unshift(row);
  localStorage.setItem(key, JSON.stringify(list.slice(0, 20)));
}

function useScores(quiz: string) {
  const key = `scores:${quiz}`;
  const [scores, setScores] = useState<ScoreRow[]>(() => JSON.parse(localStorage.getItem(key) || '[]'));
  useEffect(() => {
    const handler = () => setScores(JSON.parse(localStorage.getItem(key) || '[]'));
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, [key]);
  return scores;
}

export default function QuizPage() {
  const { slug } = useParams();
  const found = slug ? findQuizBySlug(slug) : null;
  const [secondsLeft, setSecondsLeft] = useState<number>(DURATION_SECONDS);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [submitted, setSubmitted] = useState(false);

  const questions: Question[] = useMemo(() => BASE_QUESTIONS, []);

  useEffect(() => {
    const t = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(t);
          if (!submitted) {
            toast({ title: 'Süre doldu', description: 'Test otomatik olarak gönderildi.' });
            setSubmitted(true);
          }
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [submitted]);

  if (!found) {
    return (
      <main className="container py-10 text-center">
        <p className="text-lg">Test bulunamadı.</p>
        <Button asChild className="mt-4"><Link to="/">Ana sayfa</Link></Button>
      </main>
    );
  }

  const { quiz } = found;

  const total = questions.length;
  const correct = submitted
    ? questions.reduce((acc, q) => (answers[q.id] === q.correctIndex ? acc + 1 : acc), 0)
    : 0;

  const progress = (1 - secondsLeft / DURATION_SECONDS) * 100;
  const minutes = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;

  const handleSubmit = () => {
    if (submitted) return;
    setSubmitted(true);
    const timeSpent = DURATION_SECONDS - secondsLeft;
    saveScore({ quiz: quiz.slug, date: new Date().toISOString(), score: questions.filter(q => answers[q.id] === q.correctIndex).length, total, timeSpent });
  };

  const scores = useScores(quiz.slug);

  return (
    <main className="container py-8">
      <Helmet>
        <title>{quiz.title} | React JS Quiz Clone</title>
        <meta name="description" content={`${quiz.title} — 5 dakikalık zamanlayıcı ile quiz`} />
        <link rel="canonical" href={`/quiz/${quiz.slug}`} />
      </Helmet>

      <header className="flex items-center justify-between flex-wrap gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold">{quiz.title}</h1>
          <p className="text-muted-foreground text-sm">Süre: 5 dakika • Sorular: {total}</p>
        </div>
        <div className="min-w-[220px]">
          <div className="flex items-center justify-between text-sm mb-1">
            <span>Kalan süre</span>
            <span className="font-mono">{minutes}:{secs.toString().padStart(2, '0')}</span>
          </div>
          <Progress value={progress} />
        </div>
      </header>

      {!submitted && (
        <section className="space-y-4">
          {questions.map((q, idx) => (
            <Card key={q.id} className="hover:shadow-elevate transition-shadow">
              <CardHeader>
                <CardTitle className="text-base">{idx + 1}. {q.q}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  {q.options.map((opt, i) => (
                    <label key={i} className="flex items-center gap-3 cursor-pointer p-3 rounded-md border hover:bg-accent">
                      <input
                        type="radio"
                        name={q.id}
                        className="accent-current"
                        checked={answers[q.id] === i}
                        onChange={() => setAnswers((a) => ({ ...a, [q.id]: i }))}
                      />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}

          <div className="flex justify-end pt-2">
            <Button variant="hero" onClick={handleSubmit}>Gönder</Button>
          </div>
        </section>
      )}

      {submitted && (
        <section className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Skor</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-3xl font-bold">{correct}</div>
                  <div className="text-muted-foreground text-sm">Doğru</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">{total - correct}</div>
                  <div className="text-muted-foreground text-sm">Yanlış</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">{Math.round((correct / total) * 100)}%</div>
                  <div className="text-muted-foreground text-sm">Başarı</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">{Math.floor((DURATION_SECONDS - secondsLeft) / 60)}:{((DURATION_SECONDS - secondsLeft) % 60).toString().padStart(2, '0')}</div>
                  <div className="text-muted-foreground text-sm">Harcanan Süre</div>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <Button asChild variant="secondary"><Link to={`/${found.category}`}>Başka test</Link></Button>
                <Button variant="hero" onClick={() => window.location.reload()}>Yeniden Dene</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Geçmiş Skorlar</CardTitle>
            </CardHeader>
            <CardContent>
              {scores.length === 0 ? (
                <p className="text-muted-foreground text-sm">Henüz kayıtlı skor yok.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="text-left">
                      <tr>
                        <th className="py-2">Tarih</th>
                        <th className="py-2">Skor</th>
                        <th className="py-2">Yüzde</th>
                        <th className="py-2">Süre</th>
                      </tr>
                    </thead>
                    <tbody>
                      {scores.map((s, i) => (
                        <tr key={i} className="border-t">
                          <td className="py-2">{new Date(s.date).toLocaleString()}</td>
                          <td className="py-2">{s.score}/{s.total}</td>
                          <td className="py-2">{Math.round((s.score / s.total) * 100)}%</td>
                          <td className="py-2">{Math.floor(s.timeSpent / 60)}:{(s.timeSpent % 60).toString().padStart(2, '0')}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </section>
      )}
    </main>
  );
}
