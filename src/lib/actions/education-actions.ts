
'use server';

import dbConnect from '@/lib/db';
import EducationModel, { type IEducation } from '@/models/Education';
import { revalidatePath } from 'next/cache';

export async function getEducationEntries() {
    await dbConnect();
    const entries = await EducationModel.find({}).sort({ endDate: -1 });
    return entries;
}

export async function getEducationById(id: string) {
    await dbConnect();
    const entry = await EducationModel.findById(id);
    return entry;
}

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
