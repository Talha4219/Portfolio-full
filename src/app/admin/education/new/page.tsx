
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import EducationForm from '../EducationForm';

export default function NewEducationPage() {
  return (
    <div>
        <h1 className="text-3xl font-bold tracking-tight mb-6">Add New Education Entry</h1>
        <Card>
            <CardHeader>
                <CardTitle>Education Details</CardTitle>
            </CardHeader>
            <CardContent>
                <EducationForm />
            </CardContent>
        </Card>
    </div>
  );
}
