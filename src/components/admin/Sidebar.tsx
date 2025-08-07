'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, LayoutDashboard, Briefcase, GraduationCap, User, MessageSquare, LogOut, Home } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useRouter } from 'next/navigation';

const navLinks = [
  { href: '/admin', label: 'Dashboard', icon: <LayoutDashboard /> },
  { href: '/admin/projects', label: 'Projects', icon: <Briefcase /> },
  { href: '/admin/experience', label: 'Experience', icon: <Briefcase /> },
  { href: '/admin/education', label: 'Education', icon: <GraduationCap /> },
  { href: '/admin/skills', label: 'Skills', icon: <User /> },
  { href: '/admin/about', label: 'About', icon: <User /> },
  { href: '/admin/messages', label: 'Messages', icon: <MessageSquare /> },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };
  
  const Logo = () => (
     <Link href="/admin" className="flex items-center space-x-2 px-4">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>
        <span className="font-bold font-headline text-lg">Admin Panel</span>
    </Link>
  );

  const navContent = (
      <div className="flex flex-col h-full">
        <div className="flex-1 space-y-2 p-4">
        {navLinks.map(({ href, label, icon }) => (
            <Link
            key={href}
            href={href}
            className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                pathname === href && 'bg-muted text-primary'
            )}
            >
            {icon}
            {label}
            </Link>
        ))}
        </div>
        <div className="mt-auto space-y-2 p-4">
            <Separator />
            <Link
                href="/"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
                <Home />
                View Site
            </Link>
            <Button variant="ghost" className="w-full justify-start px-3" onClick={handleLogout}>
                <LogOut className="mr-3"/>
                Logout
            </Button>
        </div>
      </div>
  )

  return (
    <>
    <div className="hidden border-r bg-muted/40 md:block w-64">
      <div className="py-4 mb-2 border-b">
        <Logo />
      </div>
      {navContent}
    </div>
    <div className="md:hidden p-2 border-b sticky top-0 bg-background/95 z-40">
         <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0">
              <div className="py-4 mb-2 border-b">
                <Logo />
              </div>
              <Separator />
              {navContent}
            </SheetContent>
          </Sheet>
    </div>
    </>
  );
}
