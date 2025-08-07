
'use server';

import { cache } from 'react';
import dbConnect from '@/lib/db';
import ExperienceModel, { type IExperience } from '@/models/Experience';
import { revalidatePath } from 'next/cache';

export const getExperienceEntries = cache(async () => {
    await dbConnect();
    const entries = await ExperienceModel.find({}).sort({ endDate: -1 });
    return JSON.parse(JSON.stringify(entries));
});

export const getExperienceById = cache(async (id: string) => {
    await dbConnect();
    const entry = await ExperienceModel.findById(id);
    return JSON.parse(JSON.stringify(entry));
});

export async function createExperience(experienceData: IExperience) {
    await dbConnect();
    const newEntry = new ExperienceModel(experienceData);
    await newEntry.save();
    revalidatePath('/admin/experience');
    revalidatePath('/');
}

export async function updateExperience(id: string, experienceData: Partial<IExperience>) {
    await dbConnect();
    await ExperienceModel.findByIdAndUpdate(id, experienceData, { new: true });
    revalidatePath('/admin/experience');
    revalidatePath(`/admin/experience/edit/${id}`);
    revalidatePath('/');
}

export async function deleteExperience(id: string) {
    await dbConnect();
    await ExperienceModel.findByIdAndDelete(id);
    revalidatePath('/admin/experience');
    revalidatePath('/');
}
