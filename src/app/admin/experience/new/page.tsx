
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ExperienceForm from '../ExperienceForm';

export default function NewExperiencePage() {
  return (
    <div>
        <h1 className="text-3xl font-bold tracking-tight mb-6">Add New Experience Entry</h1>
        <Card>
            <CardHeader>
                <CardTitle>Experience Details</CardTitle>
            </CardHeader>
            <CardContent>
                <ExperienceForm />
            </CardContent>
        </Card>
    </div>
  );
}
