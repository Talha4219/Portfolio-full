
'use server';

import { cache } from 'react';
import dbConnect from '@/lib/db';
import EducationModel, { type IEducation } from '@/models/Education';
import { revalidatePath } from 'next/cache';

export const getEducationEntries = cache(async () => {
    try {
        await dbConnect();
        const entries = await EducationModel.find({}).sort({ endDate: -1 }).lean();
        return JSON.parse(JSON.stringify(entries));
    } catch (error) {
        console.error('Failed to fetch education entries:', error);
        throw new Error('Failed to fetch education entries.');
    }
});

export const getEducationById = cache(async (id: string) => {
    try {
        await dbConnect();
        const entry = await EducationModel.findById(id).lean();
        return JSON.parse(JSON.stringify(entry));
    } catch (error) {
        console.error(`Failed to fetch education entry with id ${id}:`, error);
        throw new Error(`Failed to fetch education entry.`);
    }
});

export async function createEducation(educationData: IEducation) {
    try {
        await dbConnect();
        const newEntry = new EducationModel(educationData);
        await newEntry.save();
        revalidatePath('/admin/education');
        revalidatePath('/');
    } catch (error) {
        console.error('Failed to create education entry:', error);
        throw new Error('Failed to create education entry.');
    }
}

export async function updateEducation(id: string, educationData: Partial<IEducation>) {
    try {
        await dbConnect();
        await EducationModel.findByIdAndUpdate(id, educationData, { new: true });
        revalidatePath('/admin/education');
        revalidatePath(`/admin/education/edit/${id}`);
        revalidatePath('/');
    } catch (error) {
        console.error(`Failed to update education entry with id ${id}:`, error);
        throw new Error('Failed to update education entry.');
    }
}

export async function deleteEducation(id: string) {
    try {
        await dbConnect();
        await EducationModel.findByIdAndDelete(id);
        revalidatePath('/admin/education');
        revalidatePath('/');
    } catch (error) {
        console.error(`Failed to delete education entry with id ${id}:`, error);
        throw new Error('Failed to delete education entry.');
    }
}
