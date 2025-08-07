
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import EducationForm from '../../EducationForm';
import { getEducationById } from '@/lib/actions/education-actions';
import { notFound } from 'next/navigation';

export default async function EditEducationPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const entry = await getEducationById(id);

  if (!entry) {
    notFound();
  }
  
  const plainEntry = JSON.parse(JSON.stringify(entry));

  return (
    <div>
        <h1 className="text-3xl font-bold tracking-tight mb-6">Edit Education Entry</h1>
        <Card>
            <CardHeader>
                <CardTitle>Entry Details</CardTitle>
            </CardHeader>
            <CardContent>
                <EducationForm entry={plainEntry} />
            </CardContent>
        </Card>
    </div>
  );
}
