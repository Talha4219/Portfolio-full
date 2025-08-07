
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
import type { Education } from '@/models/Education';
import { createEducation, updateEducation } from '@/lib/actions/education-actions';

const formSchema = z.object({
  school: z.string().min(2, { message: 'School name must be at least 2 characters.' }),
  degree: z.string().min(2, { message: 'Degree must be at least 2 characters.' }),
  startDate: z.string().min(4, { message: 'Please enter a start date.' }),
  endDate: z.string().min(4, { message: 'Please enter an end date.' }),
  description: z.string().optional(),
  logo: z.any().optional(),
});

type EducationFormProps = {
  entry?: Education;
};

export default function EducationForm({ entry }: EducationFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      school: entry?.school || '',
      degree: entry?.degree || '',
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
        await updateEducation(entry._id!, updatedValues);
        toast({ title: 'Education Entry Updated Successfully' });
      } else {
        await createEducation(updatedValues);
        toast({ title: 'Education Entry Created Successfully' });
      }
      router.push('/admin/education');
      router.refresh();
    } catch (error) {
      console.error('Failed to save education entry:', error);
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
          name="degree"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Degree / Program</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Bachelor of Science in Computer Science" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="school"
          render={({ field }) => (
            <FormItem>
              <FormLabel>School / University Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., State University" {...field} />
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
              <FormLabel>School Logo</FormLabel>
              <FormControl>
                <Input 
                  type="file" 
                  {...rest}
                  onChange={(e) => onChange(e.target.files)}
                  accept="image/*"
                />
              </FormControl>
              <FormDescription>Upload a school logo. Leave blank to keep the current one.</FormDescription>
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
                    <Input placeholder="e.g., Sep 2016" {...field} />
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
                    <Input placeholder="e.g., Jun 2020" {...field} />
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
                <Textarea placeholder="Any additional details..." {...field} />
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
