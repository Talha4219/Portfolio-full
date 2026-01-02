
'use server';

import { cache } from 'react';
import dbConnect from '@/lib/db';
import SkillModel, { type ISkill } from '@/models/Skill';
import { revalidatePath } from 'next/cache';

export const getSkills = cache(async () => {
    try {
        await dbConnect();
        const skills = await SkillModel.find({}).sort({ name: 1 }).lean();
        // Convert Mongoose documents to plain objects
        return JSON.parse(JSON.stringify(skills));
    } catch (error) {
        console.error('Failed to fetch skills:', error);
        return [];
    }
});

export async function createSkill(skillData: ISkill) {
    try {
        await dbConnect();
        const newSkill = new SkillModel(skillData);
        await newSkill.save();
        revalidatePath('/admin/skills');
        revalidatePath('/');
    } catch (error) {
        console.error('Failed to create skill:', error);
        throw new Error('Failed to create skill.');
    }
}

export async function deleteSkill(id: string) {
    try {
        await dbConnect();
        await SkillModel.findByIdAndDelete(id);
        revalidatePath('/admin/skills');
        revalidatePath('/');
    } catch (error) {
        console.error(`Failed to delete skill with id ${id}:`, error);
        throw new Error('Failed to delete skill.');
    }
}
