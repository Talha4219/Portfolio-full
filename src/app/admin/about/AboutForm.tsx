
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
import { useState } from 'react';
import { Loader2, Save } from 'lucide-react';
import type { About } from '@/models/About';
import { updateAbout } from '@/lib/actions/about-actions';
import { useRouter } from 'next/navigation';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const ACCEPTED_RESUME_TYPES = ["application/pdf"];

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  bio: z.string().min(20, { message: 'Bio must be at least 20 characters.' }),
  headshot: z.any().optional(),
  heroImage: z.any().optional(),
  resumeUrl: z.any().optional(),
});

type AboutFormProps = {
  data?: About | null;
};

export default function AboutForm({ data }: AboutFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data?.name || '',
      bio: data?.bio || '',
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
      const updatedValues: any = { ...values };

      if (values.headshot && values.headshot[0] instanceof File) {
        updatedValues.headshot = await fileToDataUri(values.headshot[0]);
      } else {
        delete updatedValues.headshot;
      }
      if (values.heroImage && values.heroImage[0] instanceof File) {
        updatedValues.heroImage = await fileToDataUri(values.heroImage[0]);
      } else {
        delete updatedValues.heroImage;
      }
      if (values.resumeUrl && values.resumeUrl[0] instanceof File) {
        updatedValues.resumeUrl = await fileToDataUri(values.resumeUrl[0]);
      } else {
        delete updatedValues.resumeUrl;
      }

      await updateAbout(updatedValues);
      toast({ title: 'About Information Updated Successfully' });
      router.refresh();
    } catch (error) {
      console.error('Failed to update about info:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description:  'Failed to update information.',
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Your full name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Biography</FormLabel>
              <FormControl>
                <Textarea placeholder="Tell your professional story..." className="min-h-[200px]" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="headshot"
          render={({ field: { onChange, value, ...rest }}) => (
            <FormItem>
              <FormLabel>Headshot Image</FormLabel>
              <FormControl>
                <Input 
                  type="file" 
                  {...rest}
                  onChange={(e) => onChange(e.target.files)}
                  accept={ACCEPTED_IMAGE_TYPES.join(',')}
                />
              </FormControl>
              <FormDescription>Upload a new headshot. Leave blank to keep the current one.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="heroImage"
          render={({ field: { onChange, value, ...rest } }) => (
            <FormItem>
              <FormLabel>Hero Section Image</FormLabel>
              <FormControl>
                <Input 
                  type="file" 
                  {...rest}
                  onChange={(e) => onChange(e.target.files)}
                  accept={ACCEPTED_IMAGE_TYPES.join(',')}
                />
              </FormControl>
              <FormDescription>Upload a new hero image. Leave blank to keep the current one.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="resumeUrl"
          render={({ field: { onChange, value, ...rest } }) => (
            <FormItem>
              <FormLabel>Resume (PDF)</FormLabel>
              <FormControl>
                <Input 
                    type="file" 
                    {...rest}
                    onChange={(e) => onChange(e.target.files)}
                    accept={ACCEPTED_RESUME_TYPES.join(',')}
                />
              </FormControl>
              <FormDescription>Upload a new resume. Leave blank to keep the current one.</FormDescription>
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
          Save Changes
        </Button>
      </form>
    </Form>
  );
}
