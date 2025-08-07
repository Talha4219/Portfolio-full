
'use server';

import { cache } from 'react';
import dbConnect from '@/lib/db';
import EducationModel, { type IEducation } from '@/models/Education';
import { revalidatePath } from 'next/cache';

export const getEducationEntries = cache(async () => {
    await dbConnect();
    const entries = await EducationModel.find({}).sort({ endDate: -1 });
    return JSON.parse(JSON.stringify(entries));
});

export const getEducationById = cache(async (id: string) => {
    await dbConnect();
    const entry = await EducationModel.findById(id);
    return JSON.parse(JSON.stringify(entry));
});

export async function createEducation(educationData: IEducation) {
    await dbConnect();
    const newEntry = new EducationModel(educationData);
    await newEntry.save();
    revalidatePath('/admin/education');
    revalidatePath('/');
}

export async function updateEducation(id: string, educationData: Partial<IEducation>) {
    await dbConnect();
    await EducationModel.findByIdAndUpdate(id, educationData, { new: true });
    revalidatePath('/admin/education');
    revalidatePath(`/admin/education/edit/${id}`);
    revalidatePath('/');
}

export async function deleteEducation(id: string) {
    await dbConnect();
    await EducationModel.findByIdAndDelete(id);
    revalidatePath('/admin/education');
    revalidatePath('/');
}
