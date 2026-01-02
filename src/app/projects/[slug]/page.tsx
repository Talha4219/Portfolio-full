
import { getProjectBySlug, getProjects } from '@/lib/actions/project-actions';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink, ArrowLeft } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

export const dynamic = 'force-dynamic';

export default async function ProjectDetailsPage({ params }: { params: { slug: string } }) {
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }
  const aiHint = project.slug.split('-').join(' ');
  const projectImages = project.images && project.images.length > 0 ? project.images : ['https://placehold.co/1200x800.png'];
  
  return (
    <div className="container mx-auto px-4 py-12 md:py-20 animate-fade-in-up">
      <div className="max-w-4xl mx-auto">
        <Button asChild variant="ghost" className="mb-8 -ml-4">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Link>
        </Button>

        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">{project.title}</h1>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary">{tag}</Badge>
          ))}
        </div>

        <div className="mt-8 flex gap-4">
          {project.links.github && (
            <Button asChild variant="outline">
              <Link href={project.links.github} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Link>
            </Button>
          )}
          {project.links.live && (
            <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href={project.links.live} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                Live Demo
              </Link>
            </Button>
          )}
        </div>

        <div className="mt-12">
            <Carousel className="w-full">
                <CarouselContent>
                    {projectImages.map((img, index) => (
                        <CarouselItem key={index}>
                            <Image
                                src={img}
                                alt={`${project.title} screenshot ${index + 1}`}
                                width={1200}
                                height={800}
                                className="rounded-lg object-cover w-full aspect-video"
                                data-ai-hint={`${aiHint} screenshot`}
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>

        <article className="mt-12 space-y-6 text-lg text-muted-foreground leading-relaxed">
            {project.body.split('\n\n').map((paragraph, i) => {
                if(paragraph.startsWith('### ')){
                    return <h3 key={i} className="font-headline text-2xl font-bold text-accent !mt-8 !mb-4">{paragraph.replace('### ', '')}</h3>
                }
                return <p key={i}>{paragraph.split('\n').map((line, j) => <span key={j}>{line}<br/></span>)}</p>
            })}
        </article>
      </div>
    </div>
  );
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const project = await getProjectBySlug(params.slug);
  if (!project) return { title: 'Project Not Found' }
  return { title: `${project.title} | Talha Shams - Full Stack Developer`, description: project.description }
}
