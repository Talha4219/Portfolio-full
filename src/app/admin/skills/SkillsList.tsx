
'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { Trash2 } from 'lucide-react';
import type { Skill } from '@/models/Skill';
import { deleteSkill } from '@/lib/actions/skill-actions';

type SkillsListProps = {
  skills: Skill[];
};

export default function SkillsList({ skills }: SkillsListProps) {
  const { toast } = useToast();
  const router = useRouter();

  const handleDelete = async (id: string) => {
    try {
      await deleteSkill(id);
      toast({
        title: 'Skill Deleted',
        description: 'The skill has been successfully deleted.',
      });
      router.refresh(); 
    } catch (error) {
      console.error('Failed to delete skill:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to delete the skill.',
      });
    }
  };

  if (skills.length === 0) {
    return <p className="text-muted-foreground text-sm">No skills in this category yet.</p>
  }

  return (
    <div className="flex flex-wrap gap-2">
      {skills.map((skill) => (
        <Badge key={skill._id} variant="secondary" className="text-base py-1 px-3 flex items-center gap-2">
          {skill.name}
           <AlertDialog>
              <AlertDialogTrigger asChild>
                <button className="rounded-full text-muted-foreground hover:text-destructive transition-colors">
                    <Trash2 className="h-3 w-3" />
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the skill '{skill.name}'.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => handleDelete(skill._id!)} className="bg-destructive hover:bg-destructive/90">
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
        </Badge>
      ))}
    </div>
  );
}
