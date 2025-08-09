import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import webIcon from "@/assets/web.svg";
import mobileIcon from "@/assets/mobile.svg";

const Index = () => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background">
      <Helmet>
        <title>React Quiz Start</title>
        <meta
          name="description"
          content="React JS ve React Native quizleri — her test için 5 dakikalık süre ve skor tablosu."
        />
        <link rel="canonical" href="/" />
      </Helmet>
      <div className="container text-center py-10">
        <h1 className="text-3xl font-bold mb-8">
          React JS Sınavına Hoş Geldiniz 📝
        </h1>
        <div className="grid sm:grid-cols-2 gap-6 justify-center">
          <Card className="p-6 hover:shadow-elevate transition-shadow">
            <CardContent className="flex flex-col items-center gap-4">
              <img
                src={webIcon}
                alt="React JS quiz ikon"
                loading="lazy"
                width={160}
                height={160}
              />
              <Button asChild variant="hero">
                <Link to="/react">React Js Quiz</Link>
              </Button>
            </CardContent>
          </Card>
          <Card className="p-6 hover:shadow-elevate transition-shadow">
            <CardContent className="flex flex-col items-center gap-4">
              <img
                src={mobileIcon}
                alt="React Native quiz ikon"
                loading="lazy"
                width={160}
                height={160}
              />
              <Button asChild variant="hero">
                <Link to="/react-native">React Native Quiz</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default Index;
