
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';
import EducationDataTable from './EducationDataTable';
import { getEducationEntries } from '@/lib/actions/education-actions';


export default async function AdminEducationPage() {
  const entries = await getEducationEntries();
  const plainEntries = JSON.parse(JSON.stringify(entries));

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Education</h1>
        <Button asChild>
          <Link href="/admin/education/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Entry
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Education History</CardTitle>
        </CardHeader>
        <CardContent>
          <EducationDataTable data={plainEntries} />
        </CardContent>
      </Card>
    </div>
  );
}
