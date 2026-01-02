
'use server';

import { cache } from 'react';
import dbConnect from '@/lib/db';
import ExperienceModel, { type IExperience } from '@/models/Experience';
import { revalidatePath } from 'next/cache';

export const getExperienceEntries = cache(async () => {
    try {
        await dbConnect();
        const entries = await ExperienceModel.find({}).sort({ endDate: -1 }).lean();
        return JSON.parse(JSON.stringify(entries));
    } catch (error) {
        console.error('Failed to fetch experience entries:', error);
        return [];
    }
});

export const getExperienceById = cache(async (id: string) => {
    try {
        await dbConnect();
        const entry = await ExperienceModel.findById(id).lean();
        return JSON.parse(JSON.stringify(entry));
    } catch (error) {
        console.error(`Failed to fetch experience entry with id ${id}:`, error);
        throw new Error('Failed to fetch experience entry.');
    }
});

export async function createExperience(experienceData: IExperience) {
    try {
        await dbConnect();
        const newEntry = new ExperienceModel(experienceData);
        await newEntry.save();
        revalidatePath('/admin/experience');
        revalidatePath('/');
    } catch (error) {
        console.error('Failed to create experience entry:', error);
        throw new Error('Failed to create experience entry.');
    }
}

export async function updateExperience(id: string, experienceData: Partial<IExperience>) {
    try {
        await dbConnect();
        await ExperienceModel.findByIdAndUpdate(id, experienceData, { new: true });
        revalidatePath('/admin/experience');
        revalidatePath(`/admin/experience/edit/${id}`);
        revalidatePath('/');
    } catch (error) {
        console.error(`Failed to update experience entry with id ${id}:`, error);
        throw new Error('Failed to update experience entry.');
    }
}

export async function deleteExperience(id: string) {
    try {
        await dbConnect();
        await ExperienceModel.findByIdAndDelete(id);
        revalidatePath('/admin/experience');
        revalidatePath('/');
    } catch (error) {
        console.error(`Failed to delete experience entry with id ${id}:`, error);
        throw new Error('Failed to delete experience entry.');
    }
}
