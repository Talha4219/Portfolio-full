
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { getAbout } from '@/lib/actions/about-actions';
import AboutForm from './AboutForm';


export default async function AdminAboutPage() {
  const aboutInfo = await getAbout();

  // Ensure a plain, serializable object is passed to the client component
  const plainAboutInfo = aboutInfo 
    ? JSON.parse(JSON.stringify(aboutInfo)) 
    : null;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">About Me</h1>
        <p className="text-muted-foreground mt-1">Update your personal and professional information.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Information</CardTitle>
           <CardDescription>This information will be displayed on your public "About Me" page.</CardDescription>
        </CardHeader>
        <CardContent>
          <AboutForm data={plainAboutInfo} />
        </CardContent>
      </Card>
    </div>
  );
}
