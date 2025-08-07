import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { Project } from '@/models/Project';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const aiHint = project.slug.split('-').join(' ');
  return (
    <Link href={`/projects/${project.slug}`} className="group block h-full">
      <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-primary/20 hover:border-primary/50">
        <CardHeader className="p-0">
          <div className="aspect-video overflow-hidden">
            <Image
              src={project.thumbnail}
              alt={project.title}
              width={600}
              height={400}
              className="object-cover w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-105"
              data-ai-hint={aiHint}
            />
          </div>
        </CardHeader>
        <CardContent className="flex-grow p-6">
          <CardTitle className="font-headline text-2xl mb-2 group-hover:text-primary transition-colors">{project.title}</CardTitle>
          <p className="text-muted-foreground line-clamp-2">{project.description}</p>
        </CardContent>
        <CardFooter className="p-6 pt-0 flex justify-between items-center">
            <div className="flex flex-wrap gap-2">
                {project.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
            </div>
            <div className="flex items-center text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                View Project <ArrowRight className="ml-2 h-4 w-4" />
            </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
