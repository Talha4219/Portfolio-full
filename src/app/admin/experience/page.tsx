
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';
import ExperienceDataTable from './ExperienceDataTable';
import { getExperienceEntries } from '@/lib/actions/experience-actions';


export default async function AdminExperiencePage() {
  const entries = await getExperienceEntries();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Work Experience</h1>
        <Button asChild>
          <Link href="/admin/experience/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Entry
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Work History</CardTitle>
        </CardHeader>
        <CardContent>
          <ExperienceDataTable data={entries} />
        </CardContent>
      </Card>
    </div>
  );
}
