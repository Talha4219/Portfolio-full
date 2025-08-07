
'use server';

import dbConnect from '@/lib/db';
import ExperienceModel, { type IExperience } from '@/models/Experience';
import { revalidatePath } from 'next/cache';

export async function getExperienceEntries() {
    await dbConnect();
    const entries = await ExperienceModel.find({}).sort({ endDate: -1 });
    return entries;
}

export async function getExperienceById(id: string) {
    await dbConnect();
    const entry = await ExperienceModel.findById(id);
    return entry;
}

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
