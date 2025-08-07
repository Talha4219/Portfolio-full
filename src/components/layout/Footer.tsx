
import { Github, Linkedin, Instagram } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  const name = 'Talha Shams';

  const footerLinks = [
    { href: '/about', label: 'About' },
    { href: '/#experience', label: 'Experience' },
    { href: '/#projects', label: 'Projects' },
    { href: '/#education', label: 'Education' },
  ];
  return (
    <footer className="border-t border-border/40 mt-16 md:mt-24">
      <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
              <div>
                  <h3 className="font-headline text-2xl font-bold text-primary">{name}</h3>
                  <p className="text-muted-foreground mt-2">Full Stack Developer & AI Enthusiast</p>
              </div>
               <div className="md:col-span-2 flex flex-col md:flex-row justify-between items-center">
                  <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-muted-foreground">
                       {footerLinks.map(link => (
                           <Link key={link.label} href={link.href} className="transition-colors hover:text-primary">
                               {link.label}
                           </Link>
                       ))}
                  </div>
                   <div className="flex items-center gap-4 mt-8 md:mt-0">
                        <Link href="https://instagram.com/talhashams_" target="_blank" rel="noreferrer" aria-label="Instagram">
                            <Instagram className="h-6 w-6 text-muted-foreground transition-colors hover:text-primary" />
                        </Link>
                        <Link href="https://github.com/talha4219" target="_blank" rel="noreferrer" aria-label="Github">
                            <Github className="h-6 w-6 text-muted-foreground transition-colors hover:text-primary" />
                        </Link>
                        <Link href="https://www.linkedin.com/in/talha-shams-357b4b284/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                            <Linkedin className="h-6 w-6 text-muted-foreground transition-colors hover:text-primary" />
                        </Link>
                    </div>
              </div>
          </div>
          <div className="mt-12 pt-8 border-t border-border/40 text-center text-muted-foreground text-sm">
               <p>© {new Date().getFullYear()} {name}. All rights reserved.</p>
          </div>
      </div>
    </footer>
  );
}
