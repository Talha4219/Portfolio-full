
'use server';

import { cache } from 'react';
import dbConnect from '@/lib/db';
import MessageModel, { type IMessage } from '@/models/Message';
import { revalidatePath } from 'next/cache';

export async function createMessage(messageData: Partial<IMessage>) {
    await dbConnect();
    const newMessage = new MessageModel(messageData);
    await newMessage.save();

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
    if (accessKey && accessKey !== 'YOUR_ACCESS_KEY_HERE') {
      try {
        await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({
                access_key: accessKey,
                name: messageData.name,
                email: messageData.email,
                message: messageData.message,
                from_name: "LuminaFolio Contact Form",
                subject: "New Contact Form Submission"
            }),
        });
      } catch (error) {
          console.error("Failed to send message via Web3Forms", error);
          // Do not rethrow, as we still want to save the message to our DB
      }
    }
}

export const getMessages = cache(async () => {
    await dbConnect();
    const messages = await MessageModel.find({}).sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(messages));
});

export async function updateMessageStatus(id: string, read: boolean) {
    await dbConnect();
    await MessageModel.findByIdAndUpdate(id, { read });
    revalidatePath('/admin/messages');
}

export async function deleteMessage(id: string) {
    await dbConnect();
    await MessageModel.findByIdAndDelete(id);
    revalidatePath('/admin/messages');
}
