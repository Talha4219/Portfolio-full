
import ProjectCard from '@/components/ProjectCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Mail, ArrowRight, Code, Database, CircleDot, Briefcase, GraduationCap, AlertTriangle } from 'lucide-react';
import Image from 'next/image';
import Typewriter from '@/components/Typewriter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getProjects } from '@/lib/actions/project-actions';
import { getEducationEntries } from '@/lib/actions/education-actions';
import { getExperienceEntries } from '@/lib/actions/experience-actions';
import { getSkills } from '@/lib/actions/skill-actions';
import { getAbout } from '@/lib/actions/about-actions';
import { FadeInUp, ScaleIn, StaggerContainer, StaggerItem, FadeIn } from '@/components/ui/animations';

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
                <Card className="border-destructive/50">
                    <CardHeader className="flex flex-row items-center gap-4">
                        <AlertTriangle className="h-8 w-8 text-destructive" />
                        <CardTitle className="text-2xl text-destructive">Database Connection Error</CardTitle>
                    </CardHeader>
                    <CardContent className="text-left space-y-4">
                        <p className="text-lg">The application could not connect to the database.</p>
                        <p className="text-muted-foreground">This is likely due to an incorrect connection string in your environment variables. Please check the `MONGODB_URI` in your <code className="bg-muted px-1 py-0.5 rounded text-sm">.env</code> file.</p>
                        <h4 className="font-semibold mt-4">Common Issues:</h4>
                        <ul className="list-disc list-inside text-muted-foreground space-y-1">
                            <li>Incorrect username or password.</li>
                            <li>IP address not whitelisted in MongoDB Atlas.</li>
                            <li>Special characters in the password are not URL-encoded.</li>
                        </ul>
                         <p className="text-muted-foreground mt-4">After correcting the `MONGODB_URI`, please restart the application.</p>
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
    <div className="container mx-auto px-4 py-12 md:py-20">
      {/* Hero Section */}
       <section className="flex flex-col-reverse md:flex-row gap-8 md:gap-12 items-center">
        <FadeInUp className="flex flex-col items-center md:items-start text-center md:text-left flex-1">
            <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              Hi, I am <span className="text-primary">{about?.name || 'Your Name'}</span>
            </h1>
            <div className="mt-4 text-lg md:text-2xl text-muted-foreground">
              I am a{' '}
              <Typewriter
                words={[
                  "Full Stack Developer",
                  "MERN Stack Specialist",
                  "Building modern web apps",
                  "Exploring the power of AI",
                  "Turning ideas into products"
                ]}
              />
            </div>
            <p className="mt-4 max-w-xl text-base text-muted-foreground md:text-lg">
              I am a motivated and versatile individual, always eager to take on new challenges. With a passion for learning I am dedicated to delivering high-quality results. With a positive attitude and a growth mindset, I am ready to make a meaningful contribution and achieve great things.
            </p>
            <div className="mt-10 flex flex-wrap gap-4 justify-center md:justify-start">
              <Button asChild size="lg">
                <Link href="#projects">
                  View Projects
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                <Link href="/contact">
                  <Mail className="mr-2 h-4 w-4" />
                  Contact Me
                </Link>
              </Button>
            </div>
        </FadeInUp>
        <ScaleIn className="flex-1 w-full max-w-sm md:max-w-none mb-8 md:mb-0" delay={0.2}>
            <div className="relative aspect-square md:aspect-auto">
                <Image
                    src="/Talha.png"
                    alt="Hero Image"
                    width={600}
                    height={600}
                    className="rounded-lg object-cover shadow-2xl mx-auto w-full h-auto"
                    data-ai-hint="abstract geometric"
                    priority
                />
            </div>
        </ScaleIn>
      </section>

      {/* Tech Stack Section */}
      <section id="skills" className="mt-16 md:mt-24 scroll-mt-20">
         <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-8">
            My <span className="text-accent">Tech Stack</span>
        </h2>
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StaggerItem>
            <Card className="h-full bg-card/50 hover:bg-card border-border/30 hover:border-primary/50 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-2xl font-headline">
                        <Code className="text-primary" />
                        Frontend
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-3">
                        {techStack.frontend.map(tech => (
                            <li key={tech.name} className="flex items-center gap-3 text-muted-foreground">
                                <Image src={tech.icon} alt={tech.name} width={24} height={24} className="h-6 w-6 object-contain" />
                                {tech.name}
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
            </StaggerItem>
             <StaggerItem>
             <Card className="h-full bg-card/50 hover:bg-card border-border/30 hover:border-primary/50 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-2xl font-headline">
                        <Database className="text-primary" />
                        Backend
                    </CardTitle>
                </CardHeader>
                <CardContent>
                     <ul className="space-y-3">
                        {techStack.backend.map(tech => (
                             <li key={tech.name} className="flex items-center gap-3 text-muted-foreground">
                                <Image src={tech.icon} alt={tech.name} width={24} height={24} className="h-6 w-6 object-contain" />
                                {tech.name}
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
            </StaggerItem>
             <StaggerItem>
             <Card className="h-full bg-card/50 hover:bg-card border-border/30 hover:border-primary/50 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-2xl font-headline">
                        <CircleDot className="text-primary" />
                        Others
                    </CardTitle>
                </CardHeader>
                <CardContent>
                     <ul className="space-y-3">
                        {techStack.others.map(tech => (
                            <li key={tech.name} className="flex items-center gap-3 text-muted-foreground">
                                <Image src={tech.icon} alt={tech.name} width={24} height={24} className="h-6 w-6 object-contain" />
                                {tech.name}
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
            </StaggerItem>
        </StaggerContainer>
      </section>

      {/* Experience Section */}
      <section id="experience" className="mt-16 md:mt-24 scroll-mt-20">
        <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-12">
            Work <span className="text-primary">Experience</span>
        </h2>
        <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-4 w-0.5 h-full bg-border/40" aria-hidden="true"></div>
            <StaggerContainer className="space-y-12">
                {experiences.map((exp, index) => (
                    <StaggerItem key={index} className="relative flex items-start group">
                        <div className="absolute left-4 -translate-x-1/2 mt-1.5 w-3 h-3 rounded-full bg-primary border-2 border-background group-hover:scale-110 transition-transform"></div>
                        <div className="w-full ml-10">
                            <p className="font-medium text-muted-foreground mb-1">{exp.startDate} - {exp.endDate}</p>
                            <Card className="bg-card/50 hover:bg-card border-border/30 hover:border-primary/50 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10">
                                <CardHeader>
                                    <CardTitle className="text-xl font-headline flex items-center gap-2">
                                        {exp.logo ? <Image src={exp.logo} alt={`${exp.company} logo`} width={20} height={20} className="h-5 w-5 object-contain" /> : <Briefcase className="inline-block h-5 w-5 text-primary" />}
                                        {exp.role}
                                    </CardTitle>
                                    <p className="text-sm text-muted-foreground">{exp.company}</p>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground">{exp.description}</p>
                                </CardContent>
                            </Card>
                        </div>
                    </StaggerItem>
                ))}
            </StaggerContainer>
        </div>
      </section>


      {/* Featured Projects Section */}
      <section id="projects" className="mt-16 md:mt-24 scroll-mt-20">
        <h2 className="font-headline text-3xl md:text-4xl font-bold text-center">
          All <span className="text-accent">Projects</span>
        </h2>
        <StaggerContainer className="mt-8 grid gap-8 md:grid-cols-1 lg:grid-cols-3">
          {projects.map((project) => (
            <StaggerItem key={project._id}>
              <ProjectCard project={project} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* Education Section */}
      <section id="education" className="mt-16 md:mt-24 scroll-mt-20">
        <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-12">
            My <span className="text-primary">Education</span>
        </h2>
        <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-4 w-0.5 h-full bg-border/40" aria-hidden="true"></div>
            <StaggerContainer className="space-y-12">
                {educations.map((edu, index) => (
                    <StaggerItem key={index} className="relative flex items-start group">
                        <div className="absolute left-4 -translate-x-1/2 mt-1.5 w-3 h-3 rounded-full bg-primary border-2 border-background group-hover:scale-110 transition-transform"></div>
                        <div className="w-full ml-10">
                            <p className="font-medium text-muted-foreground mb-1">{edu.startDate} - {edu.endDate}</p>
                            <Card className="bg-card/50 hover:bg-card border-border/30 hover:border-primary/50 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10">
                                <CardHeader>
                                    <CardTitle className="text-xl font-headline flex items-center gap-2">
                                        {edu.logo ? <Image src={edu.logo} alt={`${edu.school} logo`} width={20} height={20} className="h-5 w-5 object-contain" /> : <GraduationCap className="inline-block h-5 w-5 text-primary" />}
                                        {edu.degree}
                                    </CardTitle>
                                    <p className="text-sm text-muted-foreground">{edu.school}</p>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground">{edu.description}</p>
                                </CardContent>
                            </Card>
                        </div>
                    </StaggerItem>
                ))}
            </StaggerContainer>
        </div>
      </section>

      {/* About Me Preview Section */}
      <section id="about-preview" className="mt-16 md:mt-24 text-center">
         <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-4">
            A Little <span className="text-primary">About Me</span>
        </h2>
        {about && (
          <FadeIn className="max-w-3xl mx-auto">
              <Image
                  src={about.headshot || "https://placehold.co/150x150.png"}
                  alt={about.name}
                  width={150}
                  height={150}
                  className="rounded-full object-cover border-4 border-primary shadow-lg mx-auto mb-6"
                  data-ai-hint="professional headshot"
              />
              <p className="text-lg text-muted-foreground leading-relaxed">
                  {about.bio.split(' ').slice(0, 40).join(' ')}...
              </p>
              <Button asChild size="lg" variant="link" className="mt-6 text-lg text-accent">
                  <Link href="/about">
                      Read More <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
              </Button>
          </FadeIn>
        )}
      </section>

    </div>
  );
}
