
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ProjectForm from '../../ProjectForm';
import { getProjectById } from '@/lib/actions/project-actions';
import { notFound } from 'next/navigation';

export default async function EditProjectPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const project = await getProjectById(id);

  if (!project) {
    notFound();
  }

  return (
    <div>
        <h1 className="text-3xl font-bold tracking-tight mb-6">Edit Project</h1>
        <Card>
            <CardHeader>
                <CardTitle>Project Details</CardTitle>
            </CardHeader>
            <CardContent>
                <ProjectForm project={project} />
            </CardContent>
        </Card>
    </div>
  );
}
