import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FileQuestion } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex h-[70vh] w-full flex-col items-center justify-center gap-6 text-center px-4">
      <div className="rounded-full bg-muted p-6">
        <FileQuestion className="h-12 w-12 text-muted-foreground" />
      </div>
      <div className="space-y-2">
        <h2 className="font-headline text-4xl font-bold">Page Not Found</h2>
        <p className="text-muted-foreground text-lg max-w-md mx-auto">
          The page you are looking for does not exist or has been moved.
        </p>
      </div>
      <Button asChild size="lg">
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  );
}
