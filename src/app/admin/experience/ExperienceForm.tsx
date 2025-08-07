
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
import type { Experience } from '@/models/Experience';
import { createExperience, updateExperience } from '@/lib/actions/experience-actions';

const formSchema = z.object({
  company: z.string().min(2, { message: 'Company name must be at least 2 characters.' }),
  role: z.string().min(2, { message: 'Role must be at least 2 characters.' }),
  startDate: z.string().min(4, { message: 'Please enter a start date.' }),
  endDate: z.string().min(4, { message: 'Please enter an end date.' }),
  description: z.string().optional(),
  logo: z.any().optional(),
});

type ExperienceFormProps = {
  entry?: Experience;
};

export default function ExperienceForm({ entry }: ExperienceFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      company: entry?.company || '',
      role: entry?.role || '',
      startDate: entry?.startDate || '',
      endDate: entry?.endDate || '',
      description: entry?.description || '',
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
       if (values.logo && values.logo[0] instanceof File) {
        updatedValues.logo = await fileToDataUri(values.logo[0]);
      } else {
        delete updatedValues.logo;
      }

      if (entry) {
        await updateExperience(entry._id!, updatedValues);
        toast({ title: 'Experience Entry Updated Successfully' });
      } else {
        await createExperience(updatedValues);
        toast({ title: 'Experience Entry Created Successfully' });
      }
      router.push('/admin/experience');
      router.refresh();
    } catch (error) {
      console.error('Failed to save experience entry:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: entry ? 'Failed to update entry.' : 'Failed to create entry.',
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
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role / Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Senior Full Stack Developer" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Innovatech Solutions" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="logo"
          render={({ field: { onChange, value, ...rest } }) => (
            <FormItem>
              <FormLabel>Company Logo</FormLabel>
              <FormControl>
                <Input 
                  type="file" 
                  {...rest}
                  onChange={(e) => onChange(e.target.files)}
                  accept="image/*"
                />
              </FormControl>
              <FormDescription>Upload a company logo. Leave blank to keep the current one.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Start Date</FormLabel>
                <FormControl>
                    <Input placeholder="e.g., Jan 2022" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
                <FormItem>
                <FormLabel>End Date</FormLabel>
                <FormControl>
                    <Input placeholder="e.g., Present" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description (Optional)</FormLabel>
              <FormControl>
                <Textarea placeholder="Key responsibilities and achievements..." {...field} />
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
          {entry ? 'Save Changes' : 'Create Entry'}
        </Button>
      </form>
    </Form>
  );
}
