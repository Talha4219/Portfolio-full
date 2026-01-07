'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { Project } from '@/models/Project';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const aiHint = project.slug.split('-').join(' ');
  const thumbnailSrc = project.thumbnail || 'https://placehold.co/600x400?text=No+Image';

  // 3D Tilt Effect logic
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="h-full perspective-1000"
    >
      <Link href={`/projects/${project.slug}`} className="group block h-full">
        <Card className="h-full flex flex-col overflow-hidden transition-all duration-500 ease-in-out hover:shadow-2xl hover:shadow-primary/20 hover:border-primary/50 transform-style-3d bg-card/40 backdrop-blur-md border border-white/10 group">
          <CardHeader className="p-0 translate-z-20 overflow-hidden">
            <div className="aspect-video overflow-hidden">
              <Image
                src={thumbnailSrc}
                alt={project.title}
                width={600}
                height={400}
                className="object-cover w-full h-full transition-transform duration-700 ease-in-out group-hover:scale-110"
                data-ai-hint={aiHint}
              />
            </div>
          </CardHeader>
          <CardContent className="flex-grow p-6 translate-z-10">
            <CardTitle className="font-headline text-2xl mb-2 group-hover:text-primary transition-colors duration-300">{project.title}</CardTitle>
            <p className="text-muted-foreground line-clamp-2 leading-relaxed">{project.description}</p>
          </CardContent>
          <CardFooter className="p-6 pt-0 flex justify-between items-center translate-z-10">
            <div className="flex flex-wrap gap-2">
              {project.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="secondary" className="bg-white/5 border-white/10 text-xs">{tag}</Badge>
              ))}
            </div>
            <div className="flex items-center text-sm font-semibold text-primary opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-[-10px] group-hover:translate-x-0">
              Explore <ArrowRight className="ml-2 h-4 w-4" />
            </div>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
}
