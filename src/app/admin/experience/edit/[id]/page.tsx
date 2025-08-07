
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ExperienceForm from '../../ExperienceForm';
import { getExperienceById } from '@/lib/actions/experience-actions';
import { notFound } from 'next/navigation';

export default async function EditExperiencePage({ params }: { params: { id: string } }) {
  const { id } = params;
  const entry = await getExperienceById(id);

  if (!entry) {
    notFound();
  }

  const plainEntry = JSON.parse(JSON.stringify(entry));

  return (
    <div>
        <h1 className="text-3xl font-bold tracking-tight mb-6">Edit Experience Entry</h1>
        <Card>
            <CardHeader>
                <CardTitle>Entry Details</CardTitle>
            </CardHeader>
            <CardContent>
                <ExperienceForm entry={plainEntry} />
            </CardContent>
        </Card>
    </div>
  );
}
