
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getSkills } from '@/lib/actions/skill-actions';
import { useToast } from '@/hooks/use-toast';
import type { Skill } from '@/models/Skill';

export default function SkillsExplorer() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchSkills() {
      setIsLoading(true);
      try {
        const fetchedSkills = await getSkills();
        setSkills(fetchedSkills);
      } catch (error) {
        console.error("Failed to fetch skills:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Could not load skills.",
        });
      } finally {
        setIsLoading(false);
      }
    }
    fetchSkills();
  }, [toast]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-3xl text-accent">Skills</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center h-20">
            <p>Loading skills...</p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <Badge key={skill._id} variant="default" className="text-base py-1 px-3 bg-primary/20 text-primary-foreground border-primary/30 hover:bg-primary/30 cursor-default">
                {skill.name}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
