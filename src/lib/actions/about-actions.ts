
'use server';

import dbConnect from '@/lib/db';
import AboutModel, { type IAbout } from '@/models/About';
import { revalidatePath, unstable_cache, revalidateTag } from 'next/cache';

export const getAbout = unstable_cache(
    async () => {
        try {
            await dbConnect();
            const aboutInfo = await AboutModel.findOne({}, 'name headshot bio resumeUrl').lean();
            return JSON.parse(JSON.stringify(aboutInfo));
        } catch (error) {
            console.error('Failed to fetch about info:', error);
            throw new Error('Failed to fetch about info.');
        }
    },
    ['about'],
    { tags: ['about'], revalidate: 3600 }
);

export const getAboutFull = unstable_cache(
    async () => {
        try {
            await dbConnect();
            const aboutInfo = await AboutModel.findOne().lean();
            return JSON.parse(JSON.stringify(aboutInfo));
        } catch (error) {
            console.error('Failed to fetch full about info:', error);
            throw new Error('Failed to fetch full about info.');
        }
    },
    ['about-full'],
    { tags: ['about-full'], revalidate: 3600 }
);

export async function updateAbout(aboutData: Partial<IAbout>) {
    try {
        await dbConnect();
        const updatedInfo = await AboutModel.findOneAndUpdate({}, aboutData, {
            new: true,
            upsert: true,
            runValidators: true,
        });

        revalidateTag('about');
        revalidateTag('about-full');
        revalidatePath('/admin/about');
        revalidatePath('/about');
        revalidatePath('/');

        return JSON.parse(JSON.stringify(updatedInfo));
    } catch (error) {
        console.error('Failed to update about info:', error);
        throw new Error('Failed to update about info.');
    }
}
