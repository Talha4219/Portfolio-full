
'use server';

import { cache } from 'react';
import dbConnect from '@/lib/db';
import SkillModel, { type ISkill } from '@/models/Skill';
import { revalidatePath } from 'next/cache';

export const getSkills = cache(async () => {
    await dbConnect();
    const skills = await SkillModel.find({}).sort({ name: 1 });
    // Convert Mongoose documents to plain objects
    return JSON.parse(JSON.stringify(skills));
});

export async function createSkill(skillData: ISkill) {
    await dbConnect();
    const newSkill = new SkillModel(skillData);
    await newSkill.save();
    revalidatePath('/admin/skills');
    revalidatePath('/');
}

export async function deleteSkill(id: string) {
    await dbConnect();
    await SkillModel.findByIdAndDelete(id);
    revalidatePath('/admin/skills');
    revalidatePath('/');
}
