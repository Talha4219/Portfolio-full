
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import SkillsExplorer from '@/components/SkillsExplorer';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getAbout } from '@/lib/actions/about-actions';

export default async function AboutPage() {
  const aboutInfo = await getAbout();

  // If no info, render a placeholder state instead of crashing
  if (!aboutInfo) {
    return (
      <div className="container mx-auto px-4 py-12 md:py-20 text-center">
        <h1 className="font-headline text-4xl font-bold">About Me</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          No "About Me" information has been added yet.
        </p>
        <Button asChild className="mt-6">
          <Link href="/admin/about">
            Go to Admin to Add Info
          </Link>
        </Button>
      </div>
    )
  }

  const bioParagraphs = aboutInfo.bio.split('\n\n');

  return (
    <div className="container mx-auto px-4 py-12 md:py-20 animate-fade-in-up">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        <div className="lg:col-span-1 flex flex-col items-center text-center">
          <div className="relative">
            <Image
              src={aboutInfo.headshot || "https://placehold.co/250x250.png"}
              alt="Professional Headshot"
              width={250}
              height={250}
              className="rounded-full object-cover border-4 border-primary shadow-lg"
              data-ai-hint="professional headshot"
            />
          </div>
          <h1 className="font-headline text-4xl font-bold mt-6">{aboutInfo.name}</h1>
          {aboutInfo.resumeUrl && (
            <Button asChild className="mt-6 w-full max-w-xs" variant="outline">
              <Link href={aboutInfo.resumeUrl} target="_blank" rel="noopener noreferrer">
                <Download className="mr-2 h-4 w-4" />
                Download Resume
              </Link>
            </Button>
          )}
        </div>
        <div className="lg:col-span-2 space-y-8">
          <Card className="bg-card/40 backdrop-blur-md border border-white/10 shadow-xl">
            <CardHeader>
              <CardTitle className="font-headline text-3xl text-primary">About Me</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-4 text-lg leading-relaxed">
              {bioParagraphs.map((p: string, i: number) => <p key={i}>{p}</p>)}
            </CardContent>
          </Card>
          <div className="bg-card/40 backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-xl">
            <SkillsExplorer />
          </div>
        </div>
      </div>
    </div>
  );
}
