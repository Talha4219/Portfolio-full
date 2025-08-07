
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Loader2, Save } from 'lucide-react';
import type { Project } from '@/models/Project';
import { createProject, updateProject } from '@/lib/actions/project-actions';
import { Switch } from '@/components/ui/switch';

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const formSchema = z.object({
  title: z.string().min(2, { message: 'Title must be at least 2 characters.' }),
  slug: z.string().min(2, { message: 'Slug must be at least 2 characters.' }).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, { message: 'Slug must be lowercase with words separated by dashes (e.g., my-cool-project).' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters.' }),
  body: z.string().min(20, { message: 'Body must be at least 20 characters.' }),
  tags: z.string().min(1, { message: 'Please add at least one tag.' }),
  'links.github': z.string().url({ message: 'Please enter a valid URL.' }).optional().or(z.literal('')),
  'links.live': z.string().url({ message: 'Please enter a valid URL.' }).optional().or(z.literal('')),
  thumbnail: z.any().optional(),
  images: z.any().optional(),
  featured: z.boolean().default(false),
});

type ProjectFormProps = {
  project?: Project;
};

export default function ProjectForm({ project }: ProjectFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: project?.title || '',
      slug: project?.slug || '',
      description: project?.description || '',
      body: project?.body || '',
      tags: project?.tags.join(', ') || '',
      'links.github': project?.links?.github || '',
      'links.live': project?.links?.live || '',
      featured: project?.featured || false,
    },
  });
  
  const fileToDataUri = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    try {
        const projectData: any = {
            title: values.title,
            slug: values.slug,
            description: values.description,
            body: values.body,
            tags: values.tags.split(',').map(tag => tag.trim()),
            links: {
                github: values['links.github'],
                live: values['links.live'],
            },
            featured: values.featured,
        };

        if (values.thumbnail && values.thumbnail[0] instanceof File) {
            projectData.thumbnail = await fileToDataUri(values.thumbnail[0]);
        }

        if (values.images && values.images.length > 0) {
            const imagePromises = Array.from(values.images as FileList).map(file => fileToDataUri(file));
            projectData.images = await Promise.all(imagePromises);
        }

      if (project) {
        // Update project
        await updateProject(project._id!, projectData);
        toast({ title: 'Project Updated Successfully' });
      } else {
        // Create project
        await createProject(projectData);
        toast({ title: 'Project Created Successfully' });
      }
      router.push('/admin/projects');
      router.refresh(); // Important to see the changes in the data table
    } catch (error) {
      console.error('Failed to save project:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: project ? 'Failed to update project.' : 'Failed to create project.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
            control={form.control}
            name="featured"
            render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                    <FormLabel className="text-base">Featured Project</FormLabel>
                    <FormDescription>
                    Featured projects will be displayed first on the homepage.
                    </FormDescription>
                </div>
                <FormControl>
                    <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    />
                </FormControl>
                </FormItem>
            )}
            />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Project Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input placeholder="my-cool-project" {...field} />
              </FormControl>
               <FormDescription>The URL-friendly version of the title.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Short Description</FormLabel>
              <FormControl>
                <Textarea placeholder="A brief summary of the project" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="body"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Description / Body</FormLabel>
              <FormControl>
                <Textarea placeholder="The main content for the project page. You can use markdown." className="min-h-[250px]" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
            control={form.control}
            name="thumbnail"
            render={({ field: { onChange, value, ...rest }}) => (
                <FormItem>
                <FormLabel>Thumbnail Image</FormLabel>
                <FormControl>
                    <Input 
                    type="file" 
                    {...rest}
                    onChange={(e) => onChange(e.target.files)}
                    accept={ACCEPTED_IMAGE_TYPES.join(',')}
                    />
                </FormControl>
                <FormDescription>The main image shown on the homepage project grid.</FormDescription>
                <FormMessage />
                </FormItem>
            )}
        />
        <FormField
            control={form.control}
            name="images"
            render={({ field: { onChange, value, ...rest }}) => (
                <FormItem>
                <FormLabel>Project Gallery Images</FormLabel>
                <FormControl>
                    <Input 
                    type="file" 
                    {...rest}
                    onChange={(e) => onChange(e.target.files)}
                    accept={ACCEPTED_IMAGE_TYPES.join(',')}
                    multiple
                    />
                </FormControl>
                <FormDescription>Images for the carousel on the project details page.</FormDescription>
                <FormMessage />
                </FormItem>
            )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <Input placeholder="React, Next.js, Tailwind CSS" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="links.github"
          render={({ field }) => (
            <FormItem>
              <FormLabel>GitHub URL</FormLabel>
              <FormControl>
                <Input placeholder="https://github.com/..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="links.live"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Live Demo URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Save className="mr-2 h-4 w-4" />
          )}
          {project ? 'Save Changes' : 'Create Project'}
        </Button>
      </form>
    </Form>
  );
}
