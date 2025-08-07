
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getSkills } from '@/lib/actions/skill-actions';
import AddSkillForm from './AddSkillForm';
import SkillsList from './SkillsList';


export default async function AdminSkillsPage() {
    const skills = await getSkills();
    
    const frontendSkills = skills.filter(s => s.category === 'frontend');
    const backendSkills = skills.filter(s => s.category === 'backend');
    const otherSkills = skills.filter(s => s.category === 'others');

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Skills</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Frontend Skills</CardTitle>
                </CardHeader>
                <CardContent>
                    <SkillsList skills={frontendSkills} />
                </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle>Backend Skills</CardTitle>
                </CardHeader>
                <CardContent>
                    <SkillsList skills={backendSkills} />
                </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle>Other Skills</CardTitle>
                </CardHeader>
                <CardContent>
                    <SkillsList skills={otherSkills} />
                </CardContent>
            </Card>
        </div>

        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Add New Skill</CardTitle>
                </CardHeader>
                <CardContent>
                    <AddSkillForm />
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
