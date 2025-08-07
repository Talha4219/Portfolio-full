
'use server';

import { cache } from 'react';
import dbConnect from '@/lib/db';
import AboutModel, { type IAbout } from '@/models/About';
import { revalidatePath } from 'next/cache';

export const getAbout = cache(async () => {
    await dbConnect();
    // There should only ever be one document in this collection
    const aboutInfo = await AboutModel.findOne();
    return JSON.parse(JSON.stringify(aboutInfo));
});

export async function updateAbout(aboutData: Partial<IAbout>) {
    await dbConnect();
    // Use findOneAndUpdate with upsert:true to either create the document if it doesn't exist,
    // or update it if it does.
    const updatedInfo = await AboutModel.findOneAndUpdate({}, aboutData, {
        new: true,
        upsert: true,
        runValidators: true,
    });
    
    // Revalidate paths to ensure the frontend shows the updated data
    revalidatePath('/admin/about');
    revalidatePath('/about');
    revalidatePath('/');
    
    return updatedInfo;
}
