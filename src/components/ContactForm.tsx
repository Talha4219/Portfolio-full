
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { Send, Loader2 } from 'lucide-react';
import { createMessage } from '@/lib/actions/message-actions';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  message: z.string().min(10, {
    message: 'Message must be at least 10 characters.',
  }),
});

export default function ContactForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      // Save to database
      await createMessage(values);

      toast({
        title: 'Message Sent! 🚀',
        description: "Thanks for reaching out. I'll get back to you shortly.",
      });
      form.reset();
    } catch (error) {
      console.error('Failed to send message:', error);
      toast({
        variant: 'destructive',
        title: 'Oh no! Something went wrong.',
        description: 'There was a problem sending your message. Please try again later.',
      });
    }
    finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="bg-card/40 backdrop-blur-md border border-white/10 shadow-2xl">
      <CardContent className="p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your Name" className="bg-white/5 border-white/10 h-12 focus:border-primary/50 transition-all" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Email</FormLabel>
                  <FormControl>
                    <Input placeholder="your.email@example.com" className="bg-white/5 border-white/10 h-12 focus:border-primary/50 transition-all" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Message</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Tell me about your project or just say hi!" className="min-h-[150px] bg-white/5 border-white/10 focus:border-primary/50 transition-all resize-none" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" size="lg" className="w-full h-14 text-lg font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all" disabled={isSubmitting}>
              {isSubmitting ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <Send className="mr-2 h-5 w-5" />
              )}
              Send Message
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
