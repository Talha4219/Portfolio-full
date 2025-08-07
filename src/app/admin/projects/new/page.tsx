import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ProjectForm from '../ProjectForm';

export default function NewProjectPage() {
  return (
    <div>
        <h1 className="text-3xl font-bold tracking-tight mb-6">Add New Project</h1>
        <Card>
            <CardHeader>
                <CardTitle>Project Details</CardTitle>
            </CardHeader>
            <CardContent>
                <ProjectForm />
            </CardContent>
        </Card>
    </div>
  );
}
