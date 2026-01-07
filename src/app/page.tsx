
import ProjectCard from '@/components/ProjectCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Mail, ArrowRight, Code, Database, CircleDot, Briefcase, GraduationCap, AlertTriangle, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Typewriter from '@/components/Typewriter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getProjects } from '@/lib/actions/project-actions';
import { getEducationEntries } from '@/lib/actions/education-actions';
import { getExperienceEntries } from '@/lib/actions/experience-actions';
import { getSkills } from '@/lib/actions/skill-actions';
import { getAbout } from '@/lib/actions/about-actions';
import { FadeInUp, ScaleIn, StaggerContainer, StaggerItem, FadeIn } from '@/components/ui/animations';
import { motion } from 'framer-motion';

export const dynamic = 'force-dynamic';

export default async function Home() {
  let projects, educations, experiences, skills, about, dbError = null;

  try {
    projects = await getProjects();
    educations = await getEducationEntries();
    experiences = await getExperienceEntries();
    skills = await getSkills();
    about = await getAbout();
  } catch (error: any) {
    console.error("Database connection failed:", error.message);
    dbError = error;
  }

  if (dbError) {
    return (
      <div className="container mx-auto px-4 py-12 md:py-20 text-center">
        <div className="max-w-2xl mx-auto">
          <Card className="border-destructive/50 bg-destructive/5 backdrop-blur-md">
            <CardHeader className="flex flex-row items-center gap-4">
              <AlertTriangle className="h-8 w-8 text-destructive" />
              <CardTitle className="text-2xl text-destructive">Database Connection Error</CardTitle>
            </CardHeader>
            <CardContent className="text-left space-y-4">
              <p className="text-lg">The application could not connect to the database.</p>
              <p className="text-muted-foreground">This is likely due to an incorrect connection string in your environment variables. Please check the `MONGODB_URI` in your <code className="bg-muted px-1 py-0.5 rounded text-sm">.env</code> file.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  const techStack = {
    frontend: skills.filter(s => s.category === 'frontend' && isValidUrl(s.icon)),
    backend: skills.filter(s => s.category === 'backend' && isValidUrl(s.icon)),
    others: skills.filter(s => s.category === 'others' && isValidUrl(s.icon)),
  };

  return (
    <div className="container mx-auto px-4 py-12 md:py-24 relative overflow-hidden">
      {/* Decorative Orbs handled by DynamicBackground, additional local floating elements if needed */}

      {/* Hero Section */}
      <section className="min-h-[70vh] flex flex-col-reverse md:flex-row gap-12 md:gap-16 items-center justify-center">
        <FadeInUp className="flex flex-col items-center md:items-start text-center md:text-left flex-1 z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Available for new projects
          </div>
          <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1]">
            Hi, I am <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              {about?.name || 'Talha Shams'}
            </span>
          </h1>
          <div className="mt-6 text-xl md:text-3xl text-muted-foreground font-medium">
            I am a{' '}
            <Typewriter
              words={[
                "Full Stack Developer",
                "MERN Stack Specialist",
                "UI/UX Enthusiast",
                "AI Integrator",
                "Creative Coder"
              ]}
            />
          </div>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground leading-relaxed">
            Crafting high-performance, visually stunning web experiences with modern technologies. I turn complex problems into elegant, user-centric solutions.
          </p>
          <div className="mt-10 flex flex-wrap gap-5 justify-center md:justify-start">
            <Button asChild size="lg" className="h-12 px-8 text-base shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all">
              <Link href="#projects">
                Explore Work <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 px-8 text-base border-primary/20 hover:bg-primary/5 transition-all">
              <Link href="/contact">
                <Mail className="mr-2 h-4 w-4" />
                Get in Touch
              </Link>
            </Button>
          </div>
        </FadeInUp>

        <ScaleIn className="flex-1 w-full max-w-lg md:max-w-none relative" delay={0.2}>
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-[2rem] blur-2xl opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative aspect-square md:aspect-auto overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl">
              <Image
                src="/dp-bg (1).png"
                alt="Hero Image"
                width={600}
                height={600}
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
            </div>
            {/* Floating Tech Badges */}
            <div className="absolute -top-4 -right-4 bg-background/80 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-xl animate-bounce-slow">
              <Code className="h-6 w-6 text-primary" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-background/80 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-xl animate-bounce-slow delay-700">
              <Database className="h-6 w-6 text-accent" />
            </div>
          </div>
        </ScaleIn>
      </section>

      {/* Tech Stack Section */}
      <section id="skills" className="mt-32 md:mt-48 scroll-mt-20">
        <div className="text-center mb-16">
          <h2 className="font-headline text-4xl md:text-5xl font-bold mb-4">
            My <span className="text-primary">Skills Universe</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A collection of technologies I've mastered to build scalable and beautiful applications.
          </p>
        </div>
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <StaggerItem>
            <Card className="h-full bg-card/40 backdrop-blur-md border border-white/10 hover:border-primary/50 transition-all duration-500 group shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl font-headline group-hover:text-primary transition-colors">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Code className="text-primary h-6 w-6" />
                  </div>
                  Frontend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="grid grid-cols-2 gap-4">
                  {techStack.frontend.map(tech => (
                    <li key={tech.name} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors p-2 rounded-md hover:bg-white/5">
                      <Image src={tech.icon} alt={tech.name} width={20} height={20} className="h-5 w-5 object-contain" />
                      <span className="text-sm font-medium">{tech.name}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </StaggerItem>
          <StaggerItem>
            <Card className="h-full bg-card/40 backdrop-blur-md border border-white/10 hover:border-primary/50 transition-all duration-500 group shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl font-headline group-hover:text-primary transition-colors">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Database className="text-primary h-6 w-6" />
                  </div>
                  Backend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="grid grid-cols-2 gap-4">
                  {techStack.backend.map(tech => (
                    <li key={tech.name} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors p-2 rounded-md hover:bg-white/5">
                      <Image src={tech.icon} alt={tech.name} width={20} height={20} className="h-5 w-5 object-contain" />
                      <span className="text-sm font-medium">{tech.name}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </StaggerItem>
          <StaggerItem>
            <Card className="h-full bg-card/40 backdrop-blur-md border border-white/10 hover:border-primary/50 transition-all duration-500 group shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl font-headline group-hover:text-primary transition-colors">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <CircleDot className="text-primary h-6 w-6" />
                  </div>
                  Others
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="grid grid-cols-2 gap-4">
                  {techStack.others.map(tech => (
                    <li key={tech.name} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors p-2 rounded-md hover:bg-white/5">
                      <Image src={tech.icon} alt={tech.name} width={20} height={20} className="h-5 w-5 object-contain" />
                      <span className="text-sm font-medium">{tech.name}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </StaggerItem>
        </StaggerContainer>
      </section>

      {/* Experience Section */}
      <section id="experience" className="mt-32 md:mt-48 scroll-mt-20">
        <div className="text-center mb-16">
          <h2 className="font-headline text-4xl md:text-5xl font-bold mb-4">
            Professional <span className="text-primary">Journey</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My career path and the companies I've helped grow.
          </p>
        </div>
        <div className="relative max-w-4xl mx-auto">
          <div className="absolute left-4 md:left-1/2 w-px h-full bg-gradient-to-b from-primary/50 via-border to-transparent -translate-x-1/2" aria-hidden="true"></div>
          <StaggerContainer className="space-y-16">
            {experiences.map((exp, index) => (
              <StaggerItem key={index} className={`relative flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background shadow-lg shadow-primary/20 z-10"></div>
                <div className="w-full md:w-[calc(50%-2rem)]">
                  <Card className="bg-card/40 backdrop-blur-md border border-white/10 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 group">
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-bold text-primary uppercase tracking-wider">{exp.startDate} - {exp.endDate}</span>
                        {exp.logo && <Image src={exp.logo} alt={`${exp.company} logo`} width={32} height={32} className="h-8 w-8 object-contain" />}
                      </div>
                      <CardTitle className="text-2xl font-headline group-hover:text-primary transition-colors">
                        {exp.role}
                      </CardTitle>
                      <p className="text-lg font-medium text-muted-foreground">{exp.company}</p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">{exp.description}</p>
                    </CardContent>
                  </Card>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>


      {/* Featured Projects Section */}
      <section id="projects" className="mt-32 md:mt-48 scroll-mt-20">
        <div className="text-center mb-16">
          <h2 className="font-headline text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="text-accent">Creations</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Some of my favorite projects where I've pushed the boundaries of web development.
          </p>
        </div>
        <StaggerContainer className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <StaggerItem key={project._id}>
              <ProjectCard project={project} />
            </StaggerItem>
          ))}
        </StaggerContainer>
        <div className="mt-16 text-center">
          <Button asChild variant="ghost" size="lg" className="hover:text-primary">
            <Link href="/projects">
              View All Projects <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="mt-32 md:mt-48 scroll-mt-20">
        <div className="text-center mb-16">
          <h2 className="font-headline text-4xl md:text-5xl font-bold mb-4">
            Learning <span className="text-primary">Foundation</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My academic background that shaped my logical thinking.
          </p>
        </div>
        <div className="relative max-w-4xl mx-auto">
          <div className="absolute left-4 md:left-1/2 w-px h-full bg-gradient-to-b from-primary/50 via-border to-transparent -translate-x-1/2" aria-hidden="true"></div>
          <StaggerContainer className="space-y-16">
            {educations.map((edu, index) => (
              <StaggerItem key={index} className={`relative flex flex-col md:flex-row items-center gap-8 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background shadow-lg shadow-primary/20 z-10"></div>
                <div className="w-full md:w-[calc(50%-2rem)]">
                  <Card className="bg-card/40 backdrop-blur-md border border-white/10 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 group">
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-bold text-primary uppercase tracking-wider">{edu.startDate} - {edu.endDate}</span>
                        {edu.logo && <Image src={edu.logo} alt={`${edu.school} logo`} width={32} height={32} className="h-8 w-8 object-contain" />}
                      </div>
                      <CardTitle className="text-2xl font-headline group-hover:text-primary transition-colors">
                        {edu.degree}
                      </CardTitle>
                      <p className="text-lg font-medium text-muted-foreground">{edu.school}</p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">{edu.description}</p>
                    </CardContent>
                  </Card>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* About Me Preview Section */}
      <section id="about-preview" className="mt-32 md:mt-48 mb-20 text-center">
        <div className="max-w-4xl mx-auto bg-card/40 backdrop-blur-xl border border-white/10 rounded-[3rem] p-12 md:p-20 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-primary/10 transition-colors duration-700"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl group-hover:bg-accent/10 transition-colors duration-700"></div>

          <h2 className="font-headline text-4xl md:text-5xl font-bold mb-8 relative z-10">
            A Little <span className="text-primary">About Me</span>
          </h2>
          {about && (
            <FadeIn className="relative z-10">
              <div className="relative inline-block mb-10">
                <div className="absolute -inset-2 bg-gradient-to-r from-primary to-accent rounded-full blur-md opacity-50 group-hover:opacity-100 transition duration-1000"></div>
                <Image
                  src={about.headshot || "https://placehold.co/150x150.png"}
                  alt={about.name}
                  width={180}
                  height={180}
                  className="rounded-full object-cover border-4 border-background shadow-xl mx-auto transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-10">
                {about.bio.split(' ').slice(0, 45).join(' ')}...
              </p>
              <Button asChild size="lg" className="rounded-full px-10 h-14 text-lg">
                <Link href="/about">
                  Read Full Story <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </FadeIn>
          )}
        </div>
      </section>

    </div>
  );
}
