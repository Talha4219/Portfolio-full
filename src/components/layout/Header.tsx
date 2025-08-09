
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Github, Linkedin, Instagram } from 'lucide-react';
import { Separator } from '../ui/separator';

const navLinks = [
  { href: '/about', label: 'About' },
  { href: '/#skills', label: 'Skills' },
  { href: '/#experience', label: 'Experience' },
  { href: '/#projects', label: 'Projects' },
  { href: '/#education', label: 'Education' },
  { href: '/contact', label: 'Contact' },
];

const socialLinks = [
    { href: 'https://instagram.com/talhashams_', label: 'Instagram', icon: <Instagram /> },
    { href: 'https://github.com/talha4219', label: 'Github', icon: <Github /> },
    { href: 'https://www.linkedin.com/in/talha-shams-357b4b284/', label: 'LinkedIn', icon: <Linkedin /> },
];

export default function Header() {
  const pathname = usePathname();

  const Logo = () => (
     <Link href="/" className="flex items-center space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>
    </Link>
  )

  const socialButtons = (
    <div className="flex items-center gap-2">
        {socialLinks.map(link => (
            <Button key={link.label} variant="ghost" size="icon" asChild>
                <Link href={link.href} target="_blank" rel="noreferrer" aria-label={link.label}>
                    {link.icon}
                </Link>
            </Button>
        ))}
    </div>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        
        <div className="md:hidden">
           <Logo />
        </div>

        <div className="hidden md:flex flex-1 items-center justify-start">
             <Logo />
        </div>

        <div className="flex flex-1 items-center justify-center">
            <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
                {navLinks.map(({ href, label }) => (
                <Link
                    key={href}
                    href={href}
                    className={cn(
                    'transition-colors hover:text-primary',
                    pathname === href ? 'text-primary' : 'text-foreground/60'
                    )}
                >
                    {label}
                </Link>
                ))}
            </nav>
        </div>

        <div className="hidden md:flex flex-1 items-center justify-end">
            {socialButtons}
        </div>

        <div className="flex flex-1 justify-end md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
                <div className="p-4">
                    <Logo />
                </div>
                <Separator />
              <div className="flex flex-col space-y-4 pt-6 p-4">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    'text-lg font-medium transition-colors hover:text-primary',
                      pathname === href ? 'text-primary' : 'text-foreground'
                  )}
                >
                  {label}
                </Link>
              ))}
              </div>
              <Separator className="my-4"/>
              <div className="p-4 flex justify-center">
                {socialButtons}
              </div>
            </SheetContent>
          </Sheet>
        </div>


      </div>
    </header>
  );
}
