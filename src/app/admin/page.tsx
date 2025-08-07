import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Briefcase, GraduationCap, User, MessageSquare } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboardPage() {
    const managementSections = [
        { title: 'Projects', icon: <Briefcase />, href: '/admin/projects', description: 'Add, edit, or delete projects.' },
        { title: 'Experience', icon: <Briefcase />, href: '/admin/experience', description: 'Manage your work experience.' },
        { title: 'Education', icon: <GraduationCap />, href: '/admin/education', description: 'Update your education history.' },
        { title: 'Skills', icon: <User />, href: '/admin/skills', description: 'Manage your skills list.' },
        { title: 'About Me', icon: <User />, href: '/admin/about', description: 'Edit your bio and details.' },
        { title: 'Messages', icon: <MessageSquare />, href: '/admin/messages', description: 'View contact form submissions.' },
    ];
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
      <p className="text-muted-foreground mt-2">Welcome back! Manage your portfolio content from here.</p>

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {managementSections.map(section => (
            <Link key={section.title} href={section.href}>
                <Card className="hover:bg-muted/50 transition-colors h-full">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{section.title}</CardTitle>
                        <div className="text-muted-foreground">{section.icon}</div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-xs text-muted-foreground">{section.description}</p>
                    </CardContent>
                </Card>
            </Link>
          ))}
      </div>
    </div>
  );
}
